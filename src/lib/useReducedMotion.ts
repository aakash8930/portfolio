import { useEffect, useState } from "react";

/**
 * Reads `(prefers-reduced-motion: reduce)`. Returns `true` while the user
 * has asked the OS for less motion — callers should bail their rAF loops,
 * skip parallax, and freeze the first rendered frame of any 3D scene.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
