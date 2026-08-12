import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const About = () => {
  return (
    <section id="about" className="relative px-6 py-28 md:py-40" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl">
        <div className="hairline grid gap-10 pt-10 md:grid-cols-12 md:gap-8">
          {/* Sticky section marker. */}
          <div className="md:col-span-4">
            <Reveal>
              <p className="label md:sticky md:top-28">
                <span className="text-primary">01</span> — About
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal>
              <h2 id="about-heading" className="display text-3xl leading-snug md:text-4xl lg:text-[2.75rem]">
                I build products that have to work.
              </h2>
            </Reveal>

            <div className="mt-8 max-w-2xl space-y-5">
              {siteConfig.longBio.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2" aria-label="What I do">
                {siteConfig.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-primary/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <a
                href={siteConfig.studio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 block border-l border-primary/50 bg-primary/[0.035] px-5 py-4 transition-colors hover:bg-primary/[0.07]"
              >
                <span className="label">Building with</span>
                <span className="mt-2 flex items-center gap-2 font-display text-lg font-medium">
                  {siteConfig.studio.name}
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.studio.detail}
                </span>
              </a>
            </Reveal>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <h3 className="label mb-5">Currently</h3>
                <ul className="space-y-4">
                  {siteConfig.currently.map((item) => (
                    <li key={item.label} className="border-l border-primary/40 pl-4">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.25}>
                <h3 className="label mb-5">Open to</h3>
                <ul className="space-y-3">
                  {siteConfig.openTo.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
