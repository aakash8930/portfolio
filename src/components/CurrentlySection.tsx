import { Sparkles, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const CurrentlySection = () => {
  return (
    <section className="py-16 px-6 border-y border-border bg-secondary/30" aria-labelledby="currently-heading">
      <h2 id="currently-heading" className="sr-only">Currently building and open to</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm uppercase tracking-widest text-primary">Currently building</p>
          </div>
          <ul className="space-y-3">
            {siteConfig.currently.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-muted-foreground"> — {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-primary" />
            <p className="text-sm uppercase tracking-widest text-primary">Open to</p>
          </div>
          <ul className="space-y-2">
            {siteConfig.openTo.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CurrentlySection;
