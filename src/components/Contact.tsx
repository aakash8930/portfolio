import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const Contact = () => {
  return (
    <section id="contact" className="relative px-6 py-28 md:py-44" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <div className="hairline pt-10">
          <Reveal>
            <p className="label mb-6">
              <span className="text-primary">04</span> — Contact
            </p>
          </Reveal>

          <h2 id="contact-heading" className="display text-[11vw] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">
            <RevealLines
              lines={[
                <>Let's build</>,
                <>
                  something{" "}
                  <em className="font-light italic text-primary">good.</em>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Open to freelance full-stack work, integrations, and interesting
              collaborations. The fastest way to reach me is GitHub or
              Freelancer — I usually reply within a day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              href={siteConfig.social.freelancer}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 text-lg font-medium md:text-2xl"
            >
              <span className="link-draw">Hire me on Freelancer</span>
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" />
            </a>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-16 flex flex-wrap gap-8">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw label transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.freelancer}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw label transition-colors hover:text-foreground"
              >
                Freelancer
              </a>
              <span className="label text-muted-foreground/60">
                Based in {siteConfig.location}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
