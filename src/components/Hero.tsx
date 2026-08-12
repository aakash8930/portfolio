import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealLines } from "./Reveal";
import { scrollToId } from "@/lib/lenis";
import { siteConfig, stats } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-10"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary text-primary" />
          <span className="label">
            {siteConfig.role} · {siteConfig.location} · Available for freelance
          </span>
        </motion.div>

        <h1 id="hero-heading" className="display text-[13vw] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[7rem]">
          <RevealLines
            delay={0.15}
            lines={[
              <>Building</>,
              <>
                <em className="font-light italic text-primary">real-time</em>{" "}
                web
              </>,
              <>products.</>,
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {siteConfig.shortBio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <button
            onClick={() => scrollToId("work")}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            Selected work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <a
            href={siteConfig.social.email}
            className="link-draw inline-flex items-center gap-1.5 text-sm font-medium"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom rail — stats on the left, scroll cue on the right. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="hairline flex items-end justify-between pt-6">
          <div className="flex gap-10 md:gap-16">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="display text-2xl text-foreground md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToId("about")}
            className="label hidden items-center gap-2 pb-1 transition-colors hover:text-foreground md:flex"
            aria-label="Scroll to about section"
          >
            Scroll
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
