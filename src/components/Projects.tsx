import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { CoverArt } from "./CoverArt";
import { projects, type Project } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "web-app": "Web App",
  ecommerce: "E-commerce",
  client: "Client Work",
  integration: "Integration",
  platform: "Platform",
  ml: "Machine Learning",
};

const Projects = () => {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="work" className="relative px-6 py-28 md:py-40" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <div className="hairline flex flex-wrap items-end justify-between gap-4 pt-10">
          <Reveal>
            <p className="label mb-4">
              <span className="text-primary">02</span> — Selected work
            </p>
            <h2 id="work-heading" className="display text-4xl md:text-5xl lg:text-6xl">
              Things I've shipped.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="label pb-2">{projects.length} projects · 2025–26</p>
          </Reveal>
        </div>

        <div className="mt-16">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              open={openId === project.id}
              onToggle={() =>
                setOpenId(openId === project.id ? null : project.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function ProjectRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const caseStudy = [
    { title: "Problem", body: project.problem },
    { title: "Approach", body: project.approach },
    { title: "Outcome", body: project.outcome },
  ].filter((s): s is { title: string; body: string } => Boolean(s.body));

  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)} y={20}>
      <article className="hairline">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-7 text-left md:grid-cols-[3rem_1fr_auto_auto] md:gap-8 md:py-9"
        >
          <span className="label text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0">
            <span
              className={`display block text-2xl transition-colors duration-300 md:text-4xl ${
                open ? "text-primary" : "group-hover:text-primary"
              }`}
            >
              {project.title}
            </span>
            <span className="mt-1.5 block truncate text-sm text-muted-foreground">
              {project.oneLiner}
            </span>
          </span>

          <span className="label hidden text-right md:block">
            {CATEGORY_LABEL[project.category]}
            <span className="mt-1 block text-muted-foreground/60">{project.year}</span>
          </span>

          <span
            className={`flex h-9 w-9 items-center justify-center self-center rounded-full border border-border transition-all duration-300 ${
              open
                ? "rotate-45 border-primary text-primary"
                : "group-hover:border-primary group-hover:text-primary"
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pb-12 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-6">
                  <CoverArt variant={project.cover} className="rounded-sm" />
                </div>

                <div className="md:col-span-6">
                  <p className="label mb-3">{project.role}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>

                  {caseStudy.length > 0 && (
                    <dl className="mt-6 space-y-4">
                      {caseStudy.map((s) => (
                        <div key={s.title}>
                          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                            {s.title}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {s.body}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                    {project.tech.map((t) => (
                      <li key={t} className="text-xs tracking-wide text-muted-foreground">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {(project.live || project.github) && (
                    <div className="mt-7 flex flex-wrap gap-5">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                        >
                          Visit live site
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw inline-flex items-center gap-1.5 text-sm font-medium"
                        >
                          <Github className="h-4 w-4" />
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export default Projects;
