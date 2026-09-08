import { featuredProjects, type Project } from "@/lib/data";
import Reveal from "./Reveal";
import ProjectVideo from "./ProjectVideo";

function ComingSoonFrame({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-border bg-surface">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="font-mono text-5xl font-semibold tracking-tight text-foreground/20 sm:text-7xl">
          {project.name.charAt(0)}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted">
          Recording coming soon
        </span>
      </div>
    </div>
  );
}

function ShowcaseRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <div
      id={project.slug}
      className={`flex flex-col gap-10 py-20 md:flex-row md:items-center md:gap-16 ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <Reveal className="md:w-3/5">
        {project.video ? (
          <ProjectVideo src={project.video} name={project.name} />
        ) : (
          <ComingSoonFrame project={project} />
        )}
      </Reveal>

      <Reveal className="md:w-2/5" delay={100}>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")} — Featured
          {project.year ? ` · ${project.year}` : ""}
        </span>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-1 text-muted">{project.tagline}</p>
        <p className="mt-5 text-foreground/80 leading-relaxed">
          {project.description}
        </p>

        {project.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex gap-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
            >
              Code →
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
            >
              Live →
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}

export default function ProjectShowcase() {
  const recorded = featuredProjects.filter((p) => p.video).length;

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-10">
      <Reveal>
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Work</h2>
        <p className="mt-3 max-w-xl text-2xl font-medium text-foreground sm:text-3xl">
          Demo reels that auto-play as you scroll — {recorded} recorded, the
          rest on the way.
        </p>
      </Reveal>

      <div className="divide-y divide-border">
        {featuredProjects.map((project, i) => (
          <ShowcaseRow key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
