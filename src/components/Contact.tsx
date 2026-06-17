import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { siteConfig } from "@/lib/site-config";

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "aakash-singh-web-app-developer",
      href: siteConfig.social.linkedin,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@aakash8930",
      href: siteConfig.social.github,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-primary mb-3">Contact</p>
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">
          Let's <span className="gradient-text">work together.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Open to freelance full-stack work, integrations, and interesting collaborations.
          The fastest way to reach me is email.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-5 bg-card border border-border rounded-lg hover:border-primary/50 card-hover transition-all group"
            >
              <link.icon className="w-5 h-5 text-primary mx-auto mb-2.5 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold mb-0.5">{link.label}</p>
              <p className="text-xs text-muted-foreground truncate">{link.value}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            asChild
          >
            <a href={`mailto:${siteConfig.email}`}>
              <Mail className="w-4 h-4 mr-2" />
              {siteConfig.email}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {siteConfig.location}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
