import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "@/lib/lenis";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Stack", id: "stack" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled && !open
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => go("top")}
          className="font-display text-sm font-semibold tracking-tight"
          aria-label="Back to top"
        >
          Aakash Singh
          <span className="text-primary">.</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="link-draw text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
          <a
            href={siteConfig.social.freelancer}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            Hire me
          </a>
        </div>

        {/* Mobile toggle — two lines that form an X. */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`absolute h-px w-5 bg-foreground transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute h-px w-5 bg-foreground transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </nav>

      {/* Full-screen mobile menu. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 px-8 backdrop-blur-lg md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                onClick={() => go(item.id)}
                className="display py-4 text-left text-4xl text-foreground/90 transition-colors hover:text-primary"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              href={siteConfig.social.freelancer}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-10 text-primary"
            >
              Hire me on Freelancer
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
