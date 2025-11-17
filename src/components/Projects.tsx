import { ExternalLink, Github } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Razorpay"],
      github: "#",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration features, and analytics.",
      tech: ["TypeScript", "Next.js", "Prisma", "WebSocket"],
      github: "#",
      live: ""
    },
    {
      title: "Portfolio CMS",
      description: "Content management system specifically designed for creative professionals to showcase their work.",
      tech: ["React", "GraphQL", "MongoDB", "AWS"],
      github: "#",
      live: "https://furniture-git-main-aakash8930s-projects.vercel.app/"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-border card-hover flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
