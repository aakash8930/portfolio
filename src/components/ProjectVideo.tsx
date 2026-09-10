import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Loader2, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { inspectMedia } from "@/lib/media-probe";

/**
 * A project demo clip that is expected to start on its own.
 *
 * Two things make "just add autoPlay" unreliable, and this component handles
 * both:
 *
 * 1. A 200 response is not proof of a playable video. These files live in Git
 *    LFS, so a checkout that never ran `git lfs pull` serves a ~130 byte text
 *    pointer with `Content-Type: video/mp4`. The browser accepts the response,
 *    fails to decode it, and — because the error lands on a `<source>` child,
 *    whose error events do not bubble — React never hears about it. The result
 *    is a silent black box. We therefore sniff the first bytes for a real
 *    container signature before trusting the element, and fall back to cover
 *    art with an accurate reason when they are missing.
 *
 * 2. The `autoPlay` attribute is a hint, not a guarantee. It is skipped when
 *    the element mounts hidden or clipped (this player mounts inside an
 *    accordion animating from `height: 0`), when the browser blocks the
 *    gesture, or when the media finishes loading after the initial attempt.
 *    So we also drive `play()` ourselves on mount, on every readiness event,
 *    on scroll-into-view, and on tab focus — and surface a tap-to-play
 *    affordance in the one case we genuinely cannot force.
 */

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

type ProjectVideoProps = {
  src: string;
  /** Accessible name, e.g. "QuantX project demo". */
  label: string;
  /** Still shown while the clip buffers. */
  poster?: string;
  /** Rendered instead of the player when the media cannot be used. */
  fallback: ReactNode;
  className?: string;
};

export function ProjectVideo({ src, label, poster, fallback, className }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [failure, setFailure] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [visible, setVisible] = useState(true);

  // Direct DOM sync for muted state — some browsers ignore the prop on mount.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  // Reset when a different clip is handed to the same mounted element.
  useEffect(() => {
    setFailure(null);
    setReady(false);
    setPlaying(false);
    setNeedsGesture(false);
    setMuted(true);
  }, [src]);

  // Sniff the bytes in parallel with the element's own load, so a bad file is
  // caught even when the browser reports nothing useful.
  useEffect(() => {
    let cancelled = false;
    inspectMedia(src).then((result) => {
      if (cancelled) return;
      if (result.ok === false) setFailure(result.reason);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  const shouldAutoPlay = !reducedMotion && !needsGesture;

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el || failure || reducedMotion || needsGesture) return;

    // Ensure muted is true before calling play to maximize autoplay success.
    if (!el.muted) el.muted = true;

    const attempt = el.play();

    // Older browsers return undefined rather than a promise.
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch((err: DOMException) => {
        // NotAllowedError is the only permanent refusal: the browser wants a
        // real user gesture. Everything else (AbortError from a concurrent
        // load/pause) resolves itself via the readiness events below.
        if (err?.name === "NotAllowedError") setNeedsGesture(true);
      });
    }
  }, [failure, reducedMotion, needsGesture]);

  // Called from a real click, so it deliberately bypasses the guards in
  // tryPlay: `needsGesture` is still true in this render's closure, and the
  // whole point is that a user gesture has now arrived.
  const playFromGesture = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setNeedsGesture(false);
    el.play().catch(() => undefined);
  }, []);

  // Autoplay is attempted as soon as the element exists, then retried on every
  // readiness transition — a single attempt on mount loses the race when the
  // metadata arrives later.
  useEffect(() => {
    tryPlay();
  }, [tryPlay, ready]);

  // Pause anything scrolled off-screen: these are looping clips, and burning
  // decode time on invisible video is what makes the visible one stutter.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setVisible(inView);
        if (inView) tryPlay();
        else if (!el.paused) el.pause();
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [tryPlay, failure]);

  // Same idea for a backgrounded tab.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onVisibility = () => {
      if (document.hidden) {
        if (!el.paused) el.pause();
      } else if (visible) {
        tryPlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [tryPlay, visible]);

  if (failure) {
    return (
      <div className={cn("relative", className)}>
        {fallback}
        <div className="pointer-events-none absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-start gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
          <VolumeX className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate normal-case tracking-normal">
            Demo video unavailable
            {import.meta.env.DEV && (
              <span className="ml-1.5 text-white/50">
                ({failure} — run <code className="font-mono">git lfs pull</code>)
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group/video relative aspect-video overflow-hidden rounded-sm bg-black", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        // A direct `src` (rather than `<source>` children) is deliberate: it
        // keeps error events on the element React is listening to, and lets a
        // src change reload the media without a remount.
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        autoPlay={shouldAutoPlay}
        preload="metadata"
        controls
        aria-label={label}
        onLoadedData={() => {
          setReady(true);
          tryPlay();
        }}
        onCanPlay={() => {
          setReady(true);
          tryPlay();
        }}
        onPlaying={() => setNeedsGesture(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        // Keep the custom unmute button in step with the native controls,
        // which can also toggle mute.
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onError={() =>
          setFailure("The browser could not play this file (unsupported codec or corrupt media)")
        }
      />

      {/* Buffering veil — only until the first frame is decodable. */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45">
          <Loader2 className="h-6 w-6 animate-spin text-white/70" aria-hidden="true" />
          <span className="sr-only">Loading demo video</span>
        </div>
      )}

      {/* Two cases where we must not force it: the browser refused autoplay
          outright, or the visitor asked for reduced motion. Both get the
          poster plus one obvious play affordance. Driven off the real
          play/pause state so it disappears the moment playback starts. */}
      {ready && !playing && (needsGesture || reducedMotion) && (
        <button
          type="button"
          onClick={playFromGesture}
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/30"
          aria-label={`Play ${label}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur">
            <Play className="h-5 w-5 translate-x-px fill-current" />
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
        <Play className="h-3 w-3 fill-current" aria-hidden="true" />
        Project demo
      </div>

      {/* Muted is mandatory for autoplay, so offer sound as an opt-in. Kept
          above the native controls bar to avoid overlapping it. */}
      {ready && (
        <button
          type="button"
          onClick={() => {
            const next = !muted;
            setMuted(next);
            const el = videoRef.current;
            if (el) el.muted = next;
          }}
          className="absolute bottom-14 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur transition-colors hover:text-white"
          aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}

export default ProjectVideo;
