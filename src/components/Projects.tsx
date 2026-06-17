import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "./ui/card";
import { projects, type Project } from "@/lib/site-config";
import { CoverArt } from "./CoverArt";
import { CaseStudyModal } from "./CaseStudyModal";

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">Selected work</p>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Card
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title} case study`}
              className="p-0 bg-card border-border card-hover overflow-hidden flex flex-col cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setActive(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(project);
                }
              }}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CoverArt variant={project.cover} className="rounded-none border-0 border-b" />
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {project.oneLiner}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Click any project for the full case study.
        </p>
      </div>

      <CaseStudyModal project={active} onOpenChange={(o) => !o && setActive(null)} />
    </section>
  );
};

export default Projects;
