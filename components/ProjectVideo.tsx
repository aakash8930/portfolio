"use client";

import { useEffect, useRef, useState } from "react";

type ProjectVideoProps = {
  src: string;
  name: string;
  className?: string;
  /** Show a small "auto-playing" badge. */
  showBadge?: boolean;
};

/**
 * Muted, looping project demo that auto-plays while on screen.
 * Falls back to a branded frame if the video can't load (e.g. LFS not
 * checked out locally) and exposes play/pause + mute controls on hover.
 */
export default function ProjectVideo({
  src,
  name,
  className,
  showBadge = true,
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);

  // Track visibility.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Auto-play/pause based on visibility + user pause toggle.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused && !failed) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, paused, failed]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const togglePause = () => {
    setPaused((v) => !v);
  };

  const toggleMute = () => {
    setMuted((v) => {
      const next = !v;
      const video = videoRef.current;
      if (video) {
        video.muted = next;
        if (!next && video.paused && inView) {
          video.play().catch(() => {});
        }
      }
      return next;
    });
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${className ?? ""}`}
    >
      {/* Branded fallback / loading backdrop — shows through if the video
          hasn't loaded yet or fails to load. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(215,255,63,0.12),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_40%)]"
      >
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <span className="font-mono text-5xl font-semibold tracking-tight text-foreground/20 sm:text-7xl">
            {name.charAt(0)}
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            {name}
          </span>
        </div>
      </div>

      {!failed && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="relative aspect-video w-full object-cover"
          onPlaying={() => setStarted(true)}
          onError={() => setFailed(true)}
        />
      )}

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 sm:p-4">
        <span
          className={`rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur transition-opacity duration-300 ${
            started ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {showBadge && !failed ? (paused ? "Paused" : "Auto-playing") : name}
        </span>

        <div
          className={`pointer-events-auto flex items-center gap-1.5 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100`}
        >
          {!failed && (
            <>
              <button
                type="button"
                onClick={togglePause}
                aria-label={paused ? "Play video" : "Pause video"}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/60 text-xs text-foreground backdrop-blur transition-colors hover:border-foreground/40"
              >
                {paused ? "▶" : "❚❚"}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/60 text-xs text-foreground backdrop-blur transition-colors hover:border-foreground/40"
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
