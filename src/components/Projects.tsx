import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/site-config";
import { CoverArt } from "./CoverArt";
import { CaseStudyModal } from "./CaseStudyModal";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "web-app": "Web App",
  ecommerce: "E-commerce",
  client: "Client Work",
  integration: "Integration",
};

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-28 md:py-36 px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header — left-aligned editorial style, not centered. */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            Selected work · {projects.length} projects
          </p>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Real things I've <span className="gradient-text">shipped</span>.
          </h2>
        </div>

        {/* Editorial list — vertical stack of project rows. Each row is image
            + minimal text. Larger image, more whitespace, no card chrome. */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              reverse={i % 2 === 1}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-20">
          Click any project for the full case study.
        </p>
      </div>

      <CaseStudyModal project={active} onOpenChange={(o) => !o && setActive(null)} />
    </section>
  );
};

function ProjectRow({
  project,
  index,
  reverse,
  onOpen,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${project.title} case study`}
        className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
      >
        <div
          className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center ${
            reverse ? "md:[&>*:first-child]:order-last" : ""
          }`}
        >
          {/* Cover art — large, the dominant element. */}
          <div className="md:col-span-7 relative overflow-hidden rounded-lg border border-border bg-card">
            <CoverArt
              variant={project.cover}
              className="rounded-none border-0 w-full aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Hover arrow badge. */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Meta column — minimal, single column, big title. */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-primary font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-border" />
              <span>{CATEGORY_LABEL[project.category]}</span>
              <span className="h-px w-6 bg-border" />
              <span>{project.year}</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {project.oneLiner}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                View case study
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

export default Projects;