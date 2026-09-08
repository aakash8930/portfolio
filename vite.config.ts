import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import { componentTagger } from "lovable-tagger";

const LFS_MARKER = "version https://git-lfs";

/** True when `file` is a Git LFS pointer rather than the media it stands for. */
function isLfsPointer(file: string): boolean {
  let fd: number | undefined;
  try {
    fd = fs.openSync(file, "r");
    const buf = Buffer.alloc(48);
    const bytes = fs.readSync(fd, buf, 0, 48, 0);
    return buf.subarray(0, bytes).toString("utf8").startsWith(LFS_MARKER);
  } catch {
    return false;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

/**
 * Static file responder with byte-range support. Media elements probe the head
 * of a file and seek by range, so a plain 200 body is not enough.
 */
function sendMedia(req: IncomingMessage, res: ServerResponse, file: string) {
  const size = fs.statSync(file).size;
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Accept-Ranges", "bytes");
  // Stand-ins are regenerated locally; never let a stale one be cached.
  res.setHeader("Cache-Control", "no-store");

  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? "");
  if (range) {
    const [, rawStart, rawEnd] = range;
    // `bytes=-N` is a suffix range: the last N bytes.
    const start = rawStart ? parseInt(rawStart, 10) : Math.max(0, size - parseInt(rawEnd, 10));
    const end = rawStart ? (rawEnd ? parseInt(rawEnd, 10) : size - 1) : size - 1;

    if (start >= size || start > end) {
      res.statusCode = 416;
      res.setHeader("Content-Range", `bytes */${size}`);
      res.end();
      return;
    }

    const clampedEnd = Math.min(end, size - 1);
    res.statusCode = 206;
    res.setHeader("Content-Range", `bytes ${start}-${clampedEnd}/${size}`);
    res.setHeader("Content-Length", String(clampedEnd - start + 1));
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    fs.createReadStream(file, { start, end: clampedEnd }).pipe(res);
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Length", String(size));
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  fs.createReadStream(file).pipe(res);
}

/**
 * Dev-only convenience for the Git LFS demo clips.
 *
 * `*.mp4` is LFS-tracked, so a checkout without git-lfs leaves 133-byte text
 * pointers in public/project-videos. Vite serves those with HTTP 200 and
 * `Content-Type: video/mp4`, which decodes to nothing and looks like a broken
 * player rather than a missing file.
 *
 * When a requested clip is still a pointer, and a stand-in has been generated
 * by `npm run media:preview`, serve the stand-in instead so playback can still
 * be exercised. Completely inert otherwise, and excluded from builds — the real
 * clips always win the moment `git lfs pull` has run.
 */
function lfsPreviewMedia(): Plugin {
  const videoDir = path.resolve(__dirname, "public/project-videos");
  const previewDir = path.resolve(__dirname, ".preview-media");

  return {
    name: "lfs-preview-media",
    apply: "serve",
    configureServer(server) {
      if (!fs.existsSync(previewDir)) return;

      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];
        if (!url.startsWith("/project-videos/")) return next();

        const name = path.posix.basename(url);
        // Only plain media filenames may be substituted; this also blocks `..`
        // from escaping the preview directory.
        if (!/^[\w.-]+\.(mp4|webm|mov|m4v)$/i.test(name)) return next();

        const standIn = path.join(previewDir, name);
        if (!isLfsPointer(path.join(videoDir, name)) || !fs.existsSync(standIn)) return next();

        sendMedia(req, res, standIn);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    lfsPreviewMedia(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
