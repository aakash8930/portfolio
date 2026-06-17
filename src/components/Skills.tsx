import { skillCategories } from "@/lib/site-config";

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30" aria-labelledby="skills-heading">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">Stack</p>
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="rounded-lg border border-border bg-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary border border-border hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
