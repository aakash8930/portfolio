import { Code2, Palette, Zap } from "lucide-react";
import { Card } from "./ui/card";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code"
    },
    {
      icon: Palette,
      title: "Design Focus",
      description: "Creating beautiful, user-centered interfaces"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and best practices"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="gradient-text">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate developer with expertise in building modern web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean code and thoughtful design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in development has equipped me with the skills to tackle complex challenges 
              and deliver solutions that make a real impact. I'm constantly learning and staying up-to-date 
              with the latest technologies and best practices.
            </p>
          </div>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
