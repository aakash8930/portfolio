"use client";

import { useEffect, useRef, useState } from "react";
import { profile, featuredProjects } from "@/lib/data";

const DURATION = 7000;

/**
 * Auto-playing hero reel: crossfades through every recorded project demo
 * (muted + looping, so autoplay works everywhere), with the identity
 * overlaid and a caption + progress dots for the active clip.
 */
export default function HeroReel() {
  const reel = featuredProjects.filter((p) => p.video);
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [failed, setFailed] = useState<boolean[]>(() => reel.map(() => false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance.
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reel.length);
    }, DURATION);
    return () => clearInterval(id);
  }, [reel.length, tick]);

  // Only the active clip plays.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  const goTo = (i: number) => {
    setIndex(i);
    setTick((t) => t + 1);
  };

  const active = reel[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Stacked clips */}
      {reel.map((project, i) => (
        <div
          key={project.slug}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {/* Branded backdrop, visible while the clip loads or if it fails. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_25%_25%,rgba(215,255,63,0.14),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.07),transparent_45%)]">
            <span className="font-mono text-8xl font-semibold tracking-tight text-foreground/15 sm:text-9xl">
              {project.name.charAt(0)}
            </span>
            <span className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
              {project.name}
            </span>
          </div>

          {!failed[i] && (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() =>
                setFailed((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                })
              }
            />
          )}

          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/25 to-background/90" />
        </div>
      ))}

      {/* Identity overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">
          {profile.title} — {profile.location}
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
      </div>

      {/* Active clip caption */}
      <div className="absolute bottom-12 left-6 max-w-sm sm:left-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-accent">●</span>
          <span>Auto-playing reel</span>
          <span className="text-foreground/40">
            {String(index + 1).padStart(2, "0")} / {String(reel.length).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {active.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{active.tagline}</p>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-12 right-6 flex items-center gap-1.5 sm:right-10">
        {reel.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${project.name}`}
            className={`h-1 overflow-hidden rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-white/30" : "w-4 bg-white/20 hover:bg-white/40"
            }`}
          >
            {i === index && (
              <span
                key={tick}
                className="block h-full bg-accent"
                style={{ animation: `reelProgress ${DURATION}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
      </div>
    </section>
  );
}
