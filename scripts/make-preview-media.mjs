#!/usr/bin/env node
/**
 * Generates clearly-labelled stand-in clips so `npm run dev` still shows a
 * playing video when the real demos have not been downloaded from Git LFS.
 *
 * Output goes to `.preview-media/` (gitignored) and is served by the
 * dev-only `lfs-preview-media` plugin in vite.config.ts — but only for a file
 * whose real counterpart in `public/project-videos/` is still an LFS pointer.
 * Nothing here ever writes to `public/project-videos/`, so your LFS pointers
 * and the real media they reference are untouched. Run `git lfs pull` and the
 * stand-ins are ignored automatically.
 *
 *   npm run media:preview            generate any missing stand-ins
 *   npm run media:preview -- --force regenerate all of them
 *   npm run media:preview -- --clean delete them
 *
 * Requires ffmpeg on PATH (or @ffmpeg-installer/ffmpeg in node_modules).
 */

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO_DIR = path.join(ROOT, "public", "project-videos");
const OUT_DIR = path.join(ROOT, ".preview-media");
const FONT = path.join(ROOT, "public", "fonts", "SpaceGrotesk.ttf");

const LFS_MARKER = "version https://git-lfs";
const force = process.argv.includes("--force");
const clean = process.argv.includes("--clean");

function resolveFfmpeg() {
  try {
    // Optional dependency: only present if someone installed it deliberately.
    const require = createRequire(import.meta.url);
    return require("@ffmpeg-installer/ffmpeg").path;
  } catch {
    return "ffmpeg";
  }
}

function isPointer(file) {
  try {
    // Pointers are ~130 bytes, so reading the whole file is fine here.
    const buf = readFileSync(file);
    return buf.subarray(0, 48).toString("utf8").startsWith(LFS_MARKER);
  } catch {
    return false;
  }
}

/** Escapes text for ffmpeg's drawtext filter. */
function drawtext(value) {
  return value.replace(/([\\:'%])/g, "\\$1");
}

function textLayer(text, { size, color, y }) {
  const font = existsSync(FONT) ? `fontfile=${drawtext(FONT)}:` : "";
  return `drawtext=${font}text='${drawtext(text)}':fontsize=${size}:fontcolor=${color}:x=(w-text_w)/2:y=${y}`;
}

async function makeClip(ffmpeg, title, out) {
  const vf = [
    // Darken and desaturate the test pattern so the burned-in copy reads.
    "eq=brightness=-0.3:saturation=0.3",
    textLayer(title.toUpperCase(), { size: 84, color: "white", y: "(h/2)-120" }),
    textLayer("PREVIEW STAND-IN", { size: 34, color: "0xffd166", y: "(h/2)+10" }),
    textLayer("the real demo lives in Git LFS", { size: 26, color: "white@0.8", y: "(h/2)+70" }),
    textLayer("run  git lfs pull  to fetch it", { size: 26, color: "white@0.6", y: "(h/2)+110" }),
  ].join(",");

  const args = [
    "-y",
    "-hide_banner",
    "-loglevel", "error",
    "-f", "lavfi",
    "-i", "testsrc2=size=1280x720:rate=30:duration=10",
    "-vf", vf,
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "28",
    "-pix_fmt", "yuv420p",
    // faststart puts moov up front so playback begins before the file ends.
    "-movflags", "+faststart",
    "-an",
    out,
  ];

  await new Promise((resolve, reject) => {
    const proc = spawn(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    proc.stderr.on("data", (d) => (err += d));
    proc.on("error", reject);
    proc.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}: ${err.trim()}`))
    );
  });
}

async function main() {
  if (clean) {
    await rm(OUT_DIR, { recursive: true, force: true });
    console.log("[media:preview] removed .preview-media");
    return;
  }

  if (!existsSync(VIDEO_DIR)) {
    console.warn("[media:preview] public/project-videos does not exist — nothing to do.");
    return;
  }

  const names = (await readdir(VIDEO_DIR))
    .filter((f) => /\.(mp4|webm|mov|m4v)$/i.test(f))
    .sort();

  const wanted = names.filter((n) => force || isPointer(path.join(VIDEO_DIR, n)));
  if (wanted.length === 0) {
    console.log("[media:preview] every clip is real media — no stand-ins needed.");
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const ffmpeg = resolveFfmpeg();
  let made = 0;

  for (const name of wanted) {
    const out = path.join(OUT_DIR, name);
    if (existsSync(out) && !force) {
      made++;
      continue;
    }
    const title = path.basename(name, path.extname(name));
    process.stdout.write(`[media:preview] ${name} ... `);
    try {
      await makeClip(ffmpeg, title, out);
      console.log("ok");
      made++;
    } catch (err) {
      console.log("FAILED");
      console.error(
        `[media:preview] could not encode ${name}: ${err.message}\n` +
          "  Install ffmpeg (macOS `brew install ffmpeg`, Debian/Ubuntu " +
          "`apt-get install ffmpeg`) and re-run."
      );
    }
  }

  console.log(
    `[media:preview] ${made}/${wanted.length} stand-in clip(s) ready in .preview-media ` +
      `(gitignored, dev server only).`
  );
}

main().catch((err) => {
  console.error("[media:preview]", err);
  process.exit(1);
});
