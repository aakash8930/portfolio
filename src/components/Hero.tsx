import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import TypingAnimation from "./TypingAnimation";
import { siteConfig, stats } from "@/lib/site-config";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12"
      aria-labelledby="hero-heading"
    >
      {/* Background: grid + mesh gradient. Subtle, modern. */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-3 mb-8 animate-fade-in">
          <SocialLink href={siteConfig.social.github} label="GitHub">
            <Github className="w-4 h-4" />
          </SocialLink>
          <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </SocialLink>
          <SocialLink href={`mailto:${siteConfig.social.email}`} label="Email">
            <Mail className="w-4 h-4" />
          </SocialLink>
        </div>

        <div className="space-y-6">
          <p className="text-sm md:text-base font-medium text-primary tracking-wide animate-fade-in-up">
            {siteConfig.role} · {siteConfig.location}
          </p>

          <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in-up">
            Building <span className="gradient-text">real-time</span>
            <br />
            web products.
          </h1>

          <div className="h-8 md:h-10 flex items-center justify-center text-lg md:text-2xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <TypingAnimation texts={[...siteConfig.roles]} className="font-medium" />
          </div>

          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            {siteConfig.shortBio}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-3 justify-center mt-10 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
            onClick={() => scrollToSection("projects")}
          >
            View my work
            <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 hover:bg-secondary/50"
            onClick={() => scrollToSection("contact")}
          >
            Get in touch
          </Button>
        </div>

        <div
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none p-2 text-primary"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="p-2.5 rounded-full bg-card/60 backdrop-blur-sm border border-border hover:border-primary hover:bg-card transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

export default Hero;
