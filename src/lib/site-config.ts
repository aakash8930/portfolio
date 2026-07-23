// Centralized site content. Edit copy here, not in components.

export const siteConfig = {
  name: "Aakash Singh",
  role: "Full Stack Developer",
  location: "India",
  shortBio:
    "I build real-time web apps, e-commerce platforms, payment integrations and ML systems — and I run what I build. Five of my projects are live right now on self-hosted stacks, including DapiGO, a multi-vendor delivery platform spanning seven apps, and QuantX, a trading system that publishes its own performance.",
  longBio: [
    "I'm a full-stack developer who likes hard problems — real-time sync, payments, ERP integrations, the unglamorous plumbing that makes products work. My favorite projects are the ones where the data model has to be right and the architecture has to bend without breaking.",
    "I've built for paying clients (a furniture storefront, a logistics automation that talks to SAP HANA and Shipsgo, a PhonePe autopay integration) and I ship platforms end to end: DapiGO, a multi-vendor delivery marketplace with three mobile apps; Vanam, a furniture store built around real 3D; AVAASchool, a multi-tenant preschool system with a Flutter parent app.",
  ],
  social: {
    github: "https://github.com/aakash8930", 
    freelancer: "https://www.freelancer.in/u/iamfreelancer79",
  },
  currently: [
    { label: "QuantX", detail: "ML trading system — improving the models now the scoreboard is honest" },
    { label: "DapiGO", detail: "multi-vendor delivery platform — shipping the Expo apps to testers" },
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
  category: "web-app" | "ecommerce" | "client" | "integration" | "platform" | "ml";
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
  cover:
    | "resonate"
    | "aura"
    | "ultracore"
    | "hana"
    | "phonepe"
    | "makhana"
    | "vanam"
    | "school"
    | "dapigo"
    | "quantx";
  featured?: boolean;
};

// Self-hosted stacks share one Tailscale Funnel host.
const FUNNEL = "https://aakash-ideapad-3-15iml05-u-1.tail7a4203.ts.net";

export const projects: Project[] = [
  {
    id: "quantx",
    title: "QuantX",
    category: "ml",
    year: "2026",
    role: "Research + engineering",
    oneLiner: "An autonomous crypto trading system, and an honest scoreboard for it.",
    description:
      "Per-symbol XGBoost + LightGBM ensembles trained on triple-barrier labels, a regime detector, a dynamic coin universe and ATR-based risk sizing — running live on Binance testnet as a systemd service. The public dashboard reports its own performance, including the losses.",
    problem:
      "Every retail trading bot can show you a P&L curve. Almost none can answer the question that actually matters: is the model any good? The risk gates reject most signals before they ever become trades, so realised P&L measures the gates, not the model.",
    approach:
      "Score every entry signal against its own projected barriers — whether or not it was executed — and resolve each to hit-target / stopped-out / undecided. That turns model quality into a confidence-calibration chart: if the model knows anything, its hit rate should climb with its confidence. Doing this properly surfaced a bug that had been silently poisoning the system: the outcome tracker was fetching the newest price bars instead of the bars after each signal, so signals were being graded against price action that predated them. One signal that had reached its take-profit was recorded as a stop-out — and those outcomes were feeding the strategy weights, so the learning loop was training on noise.",
    outcome:
      "The scoreboard now measures the right thing, the corrupted history has been re-scored, and a regression test fails if the tracker ever looks at a pre-signal bar again. The dashboard states its own conclusions — and refuses to claim an edge from a sample too small to support one.",
    tech: ["Python", "XGBoost", "LightGBM", "scikit-learn", "pandas", "SQLite", "three.js", "Vite"],
    live: `${FUNNEL}/quantx/`,
    cover: "quantx",
    featured: true,
  },
  {
    id: "dapigo",
    title: "DapiGO",
    category: "platform",
    year: "2026",
    role: "End-to-end, 7 apps",
    oneLiner: "Multi-vendor delivery platform — web, consoles, and three mobile apps.",
    description:
      "A full delivery marketplace: a Next.js 16 storefront, three role-scoped consoles (admin, partner, rider), an Express + MongoDB API, and three Expo apps for customers, partners and riders. Live order tracking over Socket.IO with a Leaflet map, four payment gateways, wallets, referrals and Hindi/English i18n.",
    problem:
      "The original DapiGO was a CodeIgniter + Flutter build that had become expensive to change — every new feature meant touching PHP, a Flutter app, and a schema nobody trusted.",
    approach:
      "Rebuilt it as one JavaScript stack with a server-authoritative core: cart pricing, the order status machine and settlement all live behind the API, so the seven clients can't disagree about money or state. Payment webhooks are idempotent and signature-verified; the whole thing ships as a Docker Compose stack behind nginx.",
    outcome:
      "Reached feature parity with v1 and shipped, with 79 backend tests covering the flows a migration silently breaks — the OTP gate, cart pricing, the status machine, and webhook fulfilment.",
    tech: ["Next.js 16", "React", "Express", "MongoDB", "Socket.IO", "Expo", "Razorpay", "Stripe", "Docker"],
    live: `${FUNNEL}/dapigo/`,
    cover: "dapigo",
    featured: true,
  },
  {
    id: "vanam",
    title: "Vanam",
    category: "ecommerce",
    year: "2026",
    role: "Full-stack build",
    oneLiner: "A furniture storefront where you turn the product in your hand before you buy.",
    description:
      "A 3D-forward commerce platform for solid-wood furniture — real-time WebGL product viewing built with React Three Fiber, over an Express + MongoDB API with Socket.IO and Razorpay. Rebuilt from the ground up out of the earlier Ultracore Wood client site.",
    problem:
      "Furniture is the worst category for flat product photos: customers can't judge grain, proportion or finish from a fixed angle, and that uncertainty is what stops the checkout.",
    approach:
      "Put a real 3D viewer at the center of the storefront instead of a carousel — true grain, honest lighting, and a model you can rotate — and kept the commerce plumbing (catalog, cart, orders, payments) conventional and server-authoritative behind it.",
    tech: ["React 19", "three.js", "React Three Fiber", "Express", "MongoDB", "Socket.IO", "Razorpay", "Docker"],
    live: `${FUNNEL}:8443/`,
    github: "https://github.com/aakash8930/vanam-customer",
    cover: "vanam",
    featured: true,
  },
  {
    id: "school",
    title: "AVAASchool",
    category: "platform",
    year: "2026",
    role: "Full-stack build",
    oneLiner: "Multi-tenant preschool management — admin web app plus a Flutter parent app.",
    description:
      "A platform that onboards multiple schools onto one system: a NestJS + MongoDB backend, a React admin console for the platform operator, and a Flutter app that schools and parents use day to day. Parents sign in with a phone OTP rather than yet another password.",
    problem:
      "Preschools run on WhatsApp groups and paper registers. The people who need the data — parents — are the ones least likely to install and maintain a login.",
    approach:
      "Made the tenant the first-class object so a new school is an onboarding step, not a deployment, and made parent auth passwordless via phone OTP with anti-enumeration on the request endpoint. The backend continuously deploys itself from GitHub main via a systemd timer.",
    tech: ["NestJS", "MongoDB", "React", "Flutter", "Socket.IO", "JWT"],
    live: `${FUNNEL}:10000/`,
    cover: "school",
    featured: true,
  },
  {
    id: "resonate",
    title: "Resonate",
    category: "web-app",
    year: "2025",
    role: "Full-stack build",
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
    role: "Full-stack build",
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
      "Designed and shipped a hosted marketing + product site for a wood-products client. Handled end-to-end: layout, copy, deployment, and ongoing iteration based on customer feedback. Still live and serving the client — and the project I later rebuilt from scratch as Vanam, this time with real 3D at the center.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    live: "https://ultracorewood.com/",
    cover: "ultracore",
  },
  {
    id: "makhana",
    title: "Makhana Health King",
    category: "ecommerce",
    year: "2025",
    role: "Freelance — paid",
    oneLiner: "D2C storefront for a healthy-snack brand — catalog, cart, payments, admin.",
    description:
      "A full commerce stack for a makhana (fox nut) brand, not just a marketing page: a Next.js storefront with search, gift boxes and a build-your-own-box flow, an Express + MongoDB API with Razorpay checkout, and an admin console for catalog and orders. Ships as a Docker Compose stack behind nginx.",
    tech: ["Next.js", "React", "Express", "MongoDB", "Razorpay", "Tailwind CSS", "Docker", "nginx"],
    live: `${FUNNEL}/`,
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
  { value: "10", label: "Projects shipped" },
  { value: "3+", label: "Paid clients" },
  { value: "5", label: "Live self-hosted stacks" },
];
