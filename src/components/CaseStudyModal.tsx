import { ExternalLink, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CoverArt } from "./CoverArt";
import type { Project } from "@/lib/site-config";

type CaseStudyProps = {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
};

const categoryLabel: Record<Project["category"], string> = {
  "web-app": "Web App",
  ecommerce: "E-Commerce",
  client: "Client Work",
  integration: "Integration",
};

export function CaseStudyModal({ project, onOpenChange }: CaseStudyProps) {
  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {project && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.oneLiner}</DialogDescription>
            </DialogHeader>

            <div className="relative">
              <CoverArt variant={project.cover} className="rounded-none border-0 border-b" />
              <button
                onClick={() => onOpenChange(false)}
                className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm border border-border hover:bg-background"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {categoryLabel[project.category]}
                </span>
                <span className="text-muted-foreground">{project.year}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{project.role}</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              {project.problem && (
                <Section title="Problem" body={project.problem} />
              )}
              {project.approach && (
                <Section title="Approach" body={project.approach} />
              )}
              {project.outcome && (
                <Section title="Outcome" body={project.outcome} />
              )}

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Tech
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {(project.github || project.live) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.github && (
                    <Button variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View code
                      </a>
                    </Button>
                  )}
                  {project.live && (
                    <Button asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </h3>
      <p className="text-foreground/90 leading-relaxed">{body}</p>
    </div>
  );
}
