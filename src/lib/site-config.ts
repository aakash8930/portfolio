// Centralized site content. Edit copy here, not in components.

export const siteConfig = {
  name: "Aakash Singh",
  role: "Full Stack Developer",
  location: "India",
  shortBio:
    "I build real-time web apps, e-commerce systems, and payment integrations. Currently shipping mail + tracking automation for a logistics client and shipping Resonate, a real-time synced music platform.",
  longBio: [
    "I'm a full-stack developer who likes hard problems — real-time sync, payments, ERP integrations, the unglamorous plumbing that makes products work. My favorite projects are the ones where the data model has to be right and the architecture has to bend without breaking.",
    "I've built for paying clients (a furniture brand storefront, a logistics automation that talks to SAP HANA and Shipsgo, a PhonePe autopay integration) and for myself (Resonate, a real-time synced music platform; Aura, a full-stack e-commerce reference implementation).",
  ],
  social: {
    github: "https://github.com/aakash8930", 
    freelancer: "https://www.freelancer.in/u/iamfreelancer79",
  },
  currently: [
    { label: "Resonate", detail: "real-time synced music rooms — adding mobile & daily stats" },
    { label: "HANA ↔ Shipsgo", detail: "mail automation + tracking sync for a logistics client" },
  ],
  openTo: [
    "Freelance full-stack work (Next.js, Node, integrations)",
    "Backend / real-time systems consulting",
    "Interesting collaborations, not cold pitches",
  ],
  roles: [
    "Full Stack Developer",
    "Real-time Systems",
    "Payment Integrations",
    "Backend & Integrations",
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  category: "web-app" | "ecommerce" | "client" | "integration";
  year: string;
  role: string;
  oneLiner: string;
  description: string;
  tech: string[];
  problem?: string;
  approach?: string;
  outcome?: string;
  github?: string;
  live?: string;
  cover: "resonate" | "aura" | "ultracore" | "hana" | "phonepe" | "makhana";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "resonate",
    title: "Resonate",
    category: "web-app",
    year: "2025",
    role: "Solo build",
    oneLiner: "Real-time synced music rooms — everyone hears the same beat.",
    description:
      "A music platform where hosts run rooms and every listener stays in lockstep within 250 ms. Multilingual search across JioSaavn, Jamendo, and user uploads; drag-to-reorder playlists; keyboard shortcuts; mobile-first.",
    tech: ["Next.js 15", "React 19", "Fastify", "Socket.IO", "Prisma", "Turborepo", "Cloudflare R2"],
    github: "https://github.com/aakash8930/resonate",
    live: "https://spotify-lime-pi.vercel.app",
    cover: "resonate",
    featured: true,
  },
  {
    id: "aura",
    title: "Aura E-Commerce",
    category: "ecommerce",
    year: "2025",
    role: "Solo build",
    oneLiner: "Full-stack reference e-commerce — storefront, admin, payments.",
    description:
      "Monorepo with three apps: a Next.js 16 storefront with server components, a Vite + React admin SPA with revenue dashboard and CRUD, and an Express API handling JWT + Google OAuth + Stripe webhooks. Prisma over SQLite/Postgres.",
    tech: ["Next.js 16", "Express", "Prisma", "Stripe", "JWT", "Google OAuth", "Vite"],
    github: "https://github.com/aakash8930/Aura-Ecommerce",
    cover: "aura",
    featured: true,
  },
  {
    id: "ultracore",
    title: "Ultracore Wood",
    category: "client",
    year: "2025",
    role: "Freelance — paid",
    oneLiner: "Production storefront for a wood-products brand.",
    description:
      "Designed and shipped a hosted marketing + product site for a wood-products client. Handled end-to-end: layout, copy, deployment, and ongoing iteration based on customer feedback.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    live: "https://ultracorewood.com/", // fill in once user shares the URL
    cover: "ultracore",
  },
  {
    id: "makhana",
    title: "Makhana Health King",
    category: "ecommerce",
    year: "2025",
    role: "Freelance — paid",
    oneLiner: "D2C storefront for a healthy-snack brand, hosted on Hostinger VPS.",
    description:
      "Designed and shipped a hosted marketing + product site for a healthy-snack (makhana / fox nuts) client. Handled end-to-end: layout, copy, deployment on Hostinger VPS, and ongoing iteration based on customer feedback.",
    tech: ["Next.js", "React", "Tailwind CSS", "Hostinger VPS"],
    live: "https://makhanahealthking.com/",
    cover: "makhana",
  },
  {
    id: "hana-shipsgo",
    title: "HANA ↔ Shipsgo Automation",
    category: "integration",
    year: "2026",
    role: "Freelance — paid",
    oneLiner: "Order updates flow from SAP HANA to Shipsgo and back, with mail.",
    description:
      "Backend automation that keeps customer order state in sync between an SAP HANA database and the Shipsgo tracking platform, and sends transactional mail at the right moments.",
    problem:
      "The client was hand-entering tracking numbers and copy-pasting shipment status into customer emails. Updates lagged by hours, and HANA and Shipsgo would drift out of sync.",
    approach:
      "Built a worker that watches HANA for order state changes, pushes tracking IDs into Shipsgo, polls Shipsgo for status events, writes them back to HANA, and triggers templated mail on each meaningful transition. Idempotent on retries, with a dead-letter log for the few cases that need human review.",
    outcome:
      "Order updates now propagate within minutes instead of hours, and the operations team stopped doing data entry.",
    tech: ["Python", "SAP HANA", "Shipsgo API", "SMTP", "Cron"],
    cover: "hana",
  },
  {
    id: "phonepe-autopay",
    title: "PhonePe Autopay Integration",
    category: "integration",
    year: "2026",
    role: "Freelance — paid",
    oneLiner: "Recurring payments via PhonePe's autopay / mandate flow.",
    description:
      "End-to-end PhonePe autopay integration: mandate creation, recurring debit, webhook handling, and reconciliation against the merchant's order ledger.",
    problem:
      "Client needed a recurring-billing flow but their stack didn't have a UPI autopay story. Existing recurring-card solutions were failing at the Indian customer base.",
    approach:
      "Implemented PhonePe's mandate-based autopay: initiate a one-time auth, persist the mandate token, charge against the mandate on the billing schedule, and reconcile webhook events against expected debits. Surfaced failure modes (declined, expired, paused) into the merchant's existing notification system.",
    outcome:
      "Recurring revenue collection went manual-to-automated, with clear visibility into which mandates were active, paused, or had failed.",
    tech: ["PhP", "PhonePe API", "Webhooks", "JWT", "PostgreSQL"],
    cover: "phonepe",
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["Next.js 15/16", "React 18/19", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Mobile Development",
    skills: ["Flutter", "React Native"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Fastify", "Socket.IO", "REST APIs", "GraphQL"],
  },
  {
    title: "Data & Storage",
    skills: ["PostgreSQL", "Prisma", "MongoDB", "SAP HANA", "Cloudflare R2"],
  },
  {
    title: "Payments",
    skills: ["Stripe", "PhonePe Autopay", "Razorpay"],
  },
  {
    title: "Tooling & DevOps",
    skills: ["Git", "Docker", "Turborepo", "Vercel", "Supabase", "Figma"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "Scikit-learn", "Ollama", "LLMs", "Prompt Engineering"],
  },
] as const;

export const stats = [
  { value: "5+", label: "Projects shipped" },
  { value: "3+", label: "Paid clients" },
  { value: "1", label: "Open-source repo (Resonate)" },
];
