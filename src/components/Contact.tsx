import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:aakash.singh0953@gmail.com",
      text: "aakash.singh0953@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aakash-singh-web-app-developer",
      text: "linkedin.com/in/aakash-singh-web-app-developer"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/aakash8930",
      text: "github.com/aakash8930"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities, creative ideas, or partnerships. 
          Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 card-hover transition-all group"
            >
              <link.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold mb-1">{link.label}</p>
              <p className="text-sm text-muted-foreground">{link.text}</p>
            </a>
          ))}
        </div>

        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
          asChild
        >
          <a href="mailto:your.email@example.com">
            <Mail className="w-5 h-5 mr-2" />
            Send Me an Email
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Contact;
