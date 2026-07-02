import { Reveal } from "./Reveal";
import { skillCategories } from "@/lib/site-config";

const Skills = () => {
  return (
    <section id="stack" className="relative px-6 py-28 md:py-40" aria-labelledby="stack-heading">
      <div className="mx-auto max-w-6xl">
        <div className="hairline pt-10">
          <Reveal>
            <p className="label mb-4">
              <span className="text-primary">03</span> — Stack
            </p>
            <h2 id="stack-heading" className="display text-4xl md:text-5xl lg:text-6xl">
              Tools I reach for.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="group border-t border-border pt-5 transition-colors duration-500 hover:border-primary/60">
                <h3 className="label mb-4 transition-colors duration-300 group-hover:text-primary">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-foreground/80">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
