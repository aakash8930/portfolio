export const profile = {
  name: "Aakash Singh",
  title: "Full-Stack Developer",
  location: "India",
  email: "aakashtanwar8930@gmail.com",
  github: "https://github.com/aakash8930",
  bio: "I build full-stack products end to end — storefronts, admin dashboards, and the APIs behind them. Most of my recent work lives in the Next.js / TypeScript / Node ecosystem, shipping e-commerce platforms, internal tools, and the occasional weekend experiment.",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Path under /public. Projects without a video show a "coming soon" frame. */
  video?: string;
  github?: string;
  live?: string;
  year?: string;
};

/**
 * Featured projects. Projects with a `video` auto-play their demo reel;
 * the rest are shown with a "recording coming soon" frame until the clip is added.
 */
export const featuredProjects: Project[] = [
  {
    slug: "apex",
    name: "Apex",
    tagline: "Cinematic agency site",
    description:
      "A high-polish agency experience — preloader, custom cursor, magnetic buttons, GSAP-timed sections and a full-screen hero reel, all gliding over a Lenis smooth scroll.",
    stack: ["TypeScript", "Next.js", "GSAP", "Framer Motion", "Tailwind CSS"],
    video: "/project-videos/Apex.mp4",
    github: "https://github.com/aakash8930/apex",
    year: "2026",
  },
  {
    slug: "cadence",
    name: "Cadence",
    tagline: "Scroll-driven studio portfolio",
    description:
      "A studio portfolio with a scroll-scrubbed hero sequence, a pinned horizontal work gallery and manifesto-style typography built for smooth, long-form scrolling.",
    stack: ["TypeScript", "Next.js", "GSAP", "Lenis", "Anime.js"],
    video: "/project-videos/Cadence.mp4",
    github: "https://github.com/aakash8930/cadence",
    year: "2026",
  },
  {
    slug: "ember",
    name: "Ember",
    tagline: "Sci-fi HUD / terminal interface",
    description:
      "A dark, ambient sci-fi interface — status, modules, deploy log, transmission and network views rendered as a living terminal.",
    stack: ["TypeScript", "Next.js", "Framer Motion", "Tailwind CSS"],
    video: "/project-videos/Ember.mp4",
    github: "https://github.com/aakash8930/ember",
    year: "2026",
  },
  {
    slug: "genko",
    name: "Genko",
    tagline: "Brand & interaction demo",
    description:
      "Demo reel of the Genko experience — motion, layout and the key interactions captured end to end.",
    stack: [],
    video: "/project-videos/Genko.mp4",
  },
  {
    slug: "h71-web",
    name: "H71 Web",
    tagline: "Web experience demo",
    description:
      "Demo reel of the H71 Web experience — a walkthrough of the main flows and screens.",
    stack: [],
    video: "/project-videos/H71-web.mp4",
  },
  {
    slug: "quantx",
    name: "Quantx",
    tagline: "Product demo",
    description:
      "Demo reel of the Quantx product experience — core flows and interactions on screen.",
    stack: [],
    video: "/project-videos/Quantx.mp4",
  },
  {
    slug: "verion",
    name: "Verion",
    tagline: "Landing experience demo",
    description:
      "Demo reel of the Verion landing experience — strong motion and a clear narrative.",
    stack: [],
    video: "/project-videos/Verion.mp4",
  },
  {
    slug: "makhanav2",
    name: "MakhanaV2",
    tagline: "Full-stack e-commerce platform",
    description:
      "A commerce platform split across three services — a customer-facing storefront, an admin dashboard, and a backend API — built to run as independent deployables.",
    stack: ["TypeScript", "Next.js", "Node.js", "REST API"],
    github: "https://github.com/aakash8930/MakhanaV2-Customer",
  },
  {
    slug: "vanam",
    name: "Vanam",
    tagline: "E-commerce platform, customer + admin + backend",
    description:
      "Another three-service commerce build — storefront, admin panel, and backend — this one in a JavaScript stack, covering the same customer-to-fulfillment flow end to end.",
    stack: ["JavaScript", "Node.js", "REST API"],
    github: "https://github.com/aakash8930/vanam-customer",
  },
  {
    slug: "resonate",
    name: "Resonate",
    tagline: "Spotify-inspired music streaming app",
    description:
      "A music streaming client built to explore playback UI and state management patterns — queueing, now-playing, and library browsing.",
    stack: ["TypeScript", "Next.js"],
    github: "https://github.com/aakash8930/resonate",
    live: "https://spotify-lime-pi.vercel.app",
  },
];

export const otherProjects: Project[] = [
  {
    slug: "school-admin",
    name: "School Admin",
    tagline: "Administration system",
    description: "Administration system for managing school records and operations.",
    stack: ["TypeScript"],
    github: "https://github.com/aakash8930/school-admin",
  },
  {
    slug: "aura-ecommerce",
    name: "Aura Ecommerce",
    tagline: "Storefront",
    description: "Storefront for an e-commerce brand.",
    stack: ["TypeScript"],
    github: "https://github.com/aakash8930/Aura-Ecommerce",
  },
  {
    slug: "ultracorewood",
    name: "UltraCoreWood",
    tagline: "Customer site",
    description: "Customer-facing site for a wood products business.",
    stack: ["JavaScript"],
    github: "https://github.com/aakash8930/UltraCoreWood-Customer",
  },
  {
    slug: "seo-ai-saas",
    name: "SEO AI SaaS",
    tagline: "AI SEO tooling",
    description: "AI-assisted SEO tooling for content and site optimization.",
    stack: ["TypeScript"],
    github: "https://github.com/aakash8930/seo-ai-saas",
  },
  {
    slug: "ai-job-board",
    name: "AI Job Board",
    tagline: "Job board",
    description: "Job board platform with AI-driven matching.",
    stack: ["Next.js"],
    github: "https://github.com/aakash8930/ai-job-board",
  },
  {
    slug: "langapp",
    name: "LangApp",
    tagline: "Language learning",
    description: "Language learning application.",
    stack: ["TypeScript"],
    github: "https://github.com/aakash8930/langapp",
  },
  {
    slug: "future-trader",
    name: "Future Trader",
    tagline: "Algorithmic trading",
    description: "Algorithmic trading tool.",
    stack: ["Python"],
    github: "https://github.com/aakash8930/future_trader",
  },
  {
    slug: "bgmi-team",
    name: "BGMI Team",
    tagline: "Esports team site",
    description: "Site for an esports team.",
    stack: ["HTML"],
    github: "https://github.com/aakash8930/BGMI-team",
    live: "https://bgmi-team-eight.vercel.app",
  },
];

export const skills = {
  Languages: ["TypeScript", "JavaScript", "Python"],
  "Frameworks & Libraries": ["Next.js", "React", "Node.js", "Tailwind CSS"],
  Tools: ["Git", "REST APIs", "Vercel"],
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "Email", href: `mailto:${profile.email}` },
];
