#!/usr/bin/env node
/**
 * Verifies the project demo clips are real video files rather than Git LFS
 * pointers.
 *
 * `*.mp4` is LFS-tracked (see .gitattributes), so a checkout made without
 * git-lfs installed — or a deploy that skipped `git lfs pull` — leaves a
 * ~130 byte text stub on disk. The dev server still answers 200 with
 * `Content-Type: video/mp4`, so the browser fails silently instead of showing
 * an obvious error. This makes the situation visible at the right moment.
 *
 *   npm run check:media            report only (exit 0)
 *   npm run check:media -- --strict  fail the run if anything is missing
 */

import { open, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO_DIR = path.join(ROOT, "public", "project-videos");
const LFS_MARKER = "version https://git-lfs";

// ISO-BMFF boxes that can legally open a file, plus EBML magic for webm/mkv.
const ISO_BRANDS = new Set(["ftyp", "moov", "mdat", "free", "wide", "skip", "pnot"]);
const EBML_MAGIC = [0x1a, 0x45, 0xdf, 0xa3];

const strict = process.argv.includes("--strict");

function formatBytes(n) {
  if (!Number.isFinite(n)) return "?";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/** Reads only the first `length` bytes of a file. */
async function readHead(file, length) {
  const handle = await open(file, "r");
  try {
    const buf = Buffer.alloc(length);
    const { bytesRead } = await handle.read(buf, 0, length, 0);
    return buf.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

function inspect(bytes) {
  if (bytes.length === 0) return { kind: "empty" };

  const head = new TextDecoder().decode(bytes.slice(0, 48));
  if (head.startsWith(LFS_MARKER)) {
    // The `size` line sits after the 75-char oid line, so scan a wider window.
    const size = /size (\d+)/.exec(new TextDecoder().decode(bytes.slice(0, 256)))?.[1];
    return { kind: "pointer", expected: size ? Number(size) : undefined };
  }

  if (EBML_MAGIC.every((b, i) => bytes[i] === b)) return { kind: "video" };
  const brand = String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]);
  if (bytes.length >= 8 && ISO_BRANDS.has(brand)) return { kind: "video" };

  return { kind: "unknown" };
}

async function main() {
  if (!existsSync(VIDEO_DIR)) {
    console.warn(`[media] no directory at ${path.relative(ROOT, VIDEO_DIR)} — nothing to check.`);
    return 0;
  }

  const names = (await readdir(VIDEO_DIR)).filter((f) => /\.(mp4|webm|mov|m4v)$/i.test(f)).sort();
  if (names.length === 0) {
    console.warn("[media] no video files found in public/project-videos.");
    return 0;
  }

  const problems = [];
  const rows = [];

  for (const name of names) {
    const full = path.join(VIDEO_DIR, name);
    const { size } = await stat(full);
    // Only the leading bytes matter: enough for the LFS header (including its
    // `size` line) and the first ISO-BMFF box type. A real clip can be tens of
    // MB, so never read the whole thing.
    const buf = await readHead(full, 512);
    const result = inspect(buf);

    if (result.kind === "video") {
      rows.push(`  ok       ${name.padEnd(16)} ${formatBytes(size)}`);
      continue;
    }

    if (result.kind === "pointer") {
      rows.push(
        `  POINTER  ${name.padEnd(16)} ${formatBytes(size)} on disk, should be ${formatBytes(result.expected)}`
      );
      problems.push(name);
    } else {
      rows.push(`  INVALID  ${name.padEnd(16)} ${formatBytes(size)} — not a recognisable video container`);
      problems.push(name);
    }
  }

  if (problems.length === 0) {
    console.log(`[media] ${names.length} demo clip(s) present and valid.`);
    return 0;
  }

  console.warn(`[media] ${problems.length} of ${names.length} demo clip(s) are not real video files:\n`);
  console.warn(rows.join("\n"));
  console.warn(
    [
      "",
      "These are Git LFS pointers. The browser gets HTTP 200 with",
      "Content-Type: video/mp4 and 133 bytes of text, so it cannot decode",
      "them — the project rows fall back to their cover art instead.",
      "",
      "To download the real clips:",
      "",
      "    git lfs install",
      "    git lfs pull",
      "",
      "If `git lfs` is not installed, see https://git-lfs.com (macOS:",
      "`brew install git-lfs`; Debian/Ubuntu: `apt-get install git-lfs`).",
      "",
    ].join("\n")
  );

  return strict ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error("[media] check failed:", err);
    process.exit(1);
  });
