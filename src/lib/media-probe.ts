/**
 * Byte-level check that a URL actually serves video.
 *
 * The demo clips are tracked with Git LFS, so a checkout that never ran
 * `git lfs pull` leaves ~130 byte text pointers on disk. The dev server (and
 * any static host) still answers `200` with `Content-Type: video/mp4`, so
 * status codes and MIME types are both lies here. The only reliable signal is
 * the container signature in the first bytes, which is what this reads.
 */

export type ProbeResult = { ok: true } | { ok: false; reason: string };

// ISO-BMFF (mp4/mov) box types that can legally open a file.
const ISO_BRANDS = new Set(["ftyp", "moov", "mdat", "free", "wide", "skip", "pnot"]);
// EBML magic: webm / mkv.
const EBML_MAGIC = [0x1a, 0x45, 0xdf, 0xa3];
const LFS_MARKER = "version https://git-lfs";

/** A probe is answered from the first 64 bytes, so it costs almost nothing. */
const PROBE_BYTES = 64;

/**
 * Results cannot change during a session, so memoise per URL. Without this,
 * reopening an accordion row re-probes the same file every time.
 */
const cache = new Map<string, ProbeResult>();

export function clearProbeCache(): void {
  cache.clear();
}

/** Classifies the leading bytes of a media response. Exported for testing. */
export function classifyBytes(bytes: Uint8Array): ProbeResult {
  if (bytes.length === 0) return { ok: false, reason: "Empty response" };

  if (EBML_MAGIC.every((b, i) => bytes[i] === b)) return { ok: true };

  if (bytes.length >= 8) {
    const brand = String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]);
    if (ISO_BRANDS.has(brand)) return { ok: true };
  }

  return { ok: false, reason: describe(bytes) };
}

function describe(bytes: Uint8Array): string {
  const head = new TextDecoder().decode(bytes.slice(0, Math.min(bytes.length, 200)));

  if (head.startsWith(LFS_MARKER)) {
    return "Git LFS pointer — the real file was never downloaded";
  }
  // `!-~` is printable ASCII; with \s this matches text and nothing else.
  if (/^[\s!-~]+$/.test(head)) {
    return "Server returned text, not video";
  }
  return "Unrecognised video container";
}

/**
 * Fetches just enough of `url` to identify the container.
 *
 * Never reports failure for a probe that could not be performed (offline,
 * CORS, opaque redirect): that says nothing about the media, and a false
 * negative would hide a perfectly good video. Only a definitive bad signature
 * is treated as unavailable — the `<video>` element remains the final judge.
 */
export async function inspectMedia(url: string): Promise<ProbeResult> {
  const cached = cache.get(url);
  if (cached) return cached;

  let result: ProbeResult;
  try {
    const res = await fetch(url, { headers: { Range: `bytes=0-${PROBE_BYTES - 1}` } });

    if (!res.ok && res.status !== 206) {
      result = { ok: false, reason: `Server responded ${res.status}` };
    } else {
      const reader = res.body?.getReader();
      if (!reader) {
        result = { ok: false, reason: "Response body unavailable" };
      } else {
        const { value } = await reader.read();
        reader.releaseLock();
        if (!value) {
          result = { ok: false, reason: "Empty response" };
        } else {
          result = classifyBytes(value.subarray(0, PROBE_BYTES));
        }
      }
    }
  } catch {
    result = { ok: true };
  }

  cache.set(url, result);
  return result;
}
