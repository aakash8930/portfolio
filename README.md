# Aakash Singh — Portfolio

Personal portfolio for **Aakash Singh**, a full-stack developer shipping real-time marketplaces, e-commerce, payment integrations, and ML systems.

Live site: [portfolio](https://lovable.dev/projects/5094cf0f-dd21-4da1-b781-ccfb1f259ff6)

## What's in it

A single-page, dark-themed site with scroll-driven reveals:

- **Hero** — intro over a fixed 3D particle-field background (Three.js)
- **About** — bio and background
- **Projects** — selected work
- **Skills** — tech stack
- **Contact** — email + social links

Notable details:

- The 3D scene (`src/components/three/Scene.tsx`) is lazy-loaded and wrapped in an `ErrorBoundary`, so a blocked/crashing WebGL context degrades gracefully instead of blanking the page.
- Smooth scrolling via [Lenis](https://github.com/darkroomengineering/lenis); scroll-triggered reveals via Framer Motion (`reducedMotion="user"` respected).
- Theming through `next-themes` (dark by default).
- Supabase client wired up in `src/integrations/supabase` (used for data/form backends as needed).

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Three.js](https://threejs.org/) via `@react-three/fiber` / `@react-three/drei`
- [Framer Motion](https://www.framer.com/motion/) for animation
- [TanStack Query](https://tanstack.com/query/latest) for data fetching
- [Supabase](https://supabase.com/) for the backend
- React Router, `react-helmet-async` (SEO/OG tags), Zod

## Getting started

Requires Node.js (npm included) — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you don't have it.

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd portfolio

# 2. Install dependencies
npm i

# 3. Set up environment variables (see below)
cp .env .env.local   # if you don't have .env values locally

# 4. Start the dev server
npm run dev
```

### Environment variables

The app reads these from the environment (Vite `VITE_` prefix):

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (public) key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project id |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Production build (output in `dist/`) |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── App.tsx              # Providers: themes, router, query, motion, toasts
├── pages/
│   ├── Index.tsx        # The single-page portfolio layout
│   └── NotFound.tsx
├── components/
│   ├── Hero.tsx / About.tsx / Projects.tsx / Skills.tsx / Contact.tsx
│   ├── Navbar.tsx / Footer.tsx
│   ├── SmoothScroll.tsx # Lenis smooth scroll wrapper
│   ├── Reveal.tsx       # Framer Motion scroll-reveal helpers
│   ├── ThemeProvider.tsx
│   ├── ErrorBoundary.tsx
│   ├── three/           # R3F particle scene (lazy-loaded)
│   └── ui/              # shadcn/ui primitives
├── integrations/supabase/
├── lib/                 # site config, utils
└── assets/
```

## Editing the site

Most copy lives in `src/lib/site-config.ts`; sections are self-contained components in `src/components/`. Edit a file locally, or edit it directly in GitHub (pencil icon on any file).

This project is also maintained via [Lovable](https://lovable.dev/projects/5094cf0f-dd21-4da1-b781-ccfb1f259ff6) — changes made there commit automatically, and pushes from this repo reflect back there.
