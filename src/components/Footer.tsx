import { ArrowUp } from "lucide-react";
import { scrollToId } from "@/lib/lenis";
import { siteConfig } from "@/lib/site-config";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 pb-8">
      <div className="hairline mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {year} {siteConfig.name} · Built with React, Three.js & a lot of coffee.
        </p>
        <button
          onClick={() => scrollToId("top")}
          className="label inline-flex items-center gap-2 transition-colors hover:text-foreground"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
