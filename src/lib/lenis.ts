import type Lenis from "lenis";

// Singleton handle to the active Lenis instance so any component
// (navbar, buttons) can trigger smooth anchor scrolling.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
