import { Code2, GitBranch, Layers, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  {
    icon: Code2,
    title: "End-to-end builds",
    description: "From data model to deploy — backend plumbing, real-time systems, payments, the parts that actually decide whether a product works.",
  },
  {
    icon: Layers,
    title: "Architecture that bends",
    description: "Monorepos, type-safe boundaries, pluggable providers. Designs that survive the next requirement change without a rewrite.",
  },
  {
    icon: GitBranch,
    title: "Integrations & APIs",
    description: "SAP HANA, Stripe, PhonePe, Shipsgo, OAuth, webhooks. Glue work that connects products to the rest of the world.",
  },
  {
    icon: Zap,
    title: "Shipped, not demoed",
    description: "Every project in this portfolio is live, in production, or in the hands of a paying client.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6" aria-labelledby="about-heading">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">About</p>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Aakash</span>, briefly.
          </h2>
        </div>

        <div className="space-y-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-14">
          {siteConfig.longBio.map((p, i) => (
            <p key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              {p}
            </p>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <Card
              key={h.title}
              className="p-5 bg-card border-border card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1.5">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
