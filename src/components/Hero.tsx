import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import TypingAnimation from "./TypingAnimation";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const roles = [
    "Full Stack Developer",
    "Freelancer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Innovator",
    "Creative Coder"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-subtle" />
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Social Links - Top */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="animate-fade-in">
          <p className="text-primary font-medium mb-4 text-lg">Welcome to my portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">Aakash Singh</span>
          </h1>
          <div className="text-xl md:text-3xl text-muted-foreground mb-8 h-20 flex items-center justify-center">
            <TypingAnimation texts={roles} className="gradient-text font-semibold" />
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crafting exceptional digital experiences with modern technologies and creative solutions
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
            <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 backdrop-blur-sm"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">01+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center animate-fade-in delay-200">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">05+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center animate-fade-in delay-300">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">03+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </button>
    </section>
  );
};

export default Hero;
