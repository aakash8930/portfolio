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
- Project demo clips (`src/components/ProjectVideo.tsx`) start on their own: muted + `playsInline` for the autoplay policy, then an explicit `play()` retried on every readiness event, on scroll-into-view and on tab focus. Off-screen and backgrounded clips are paused so the visible one gets the decode budget. A blocked autoplay or `prefers-reduced-motion` swaps in a tap-to-play button, and unusable media falls back to the project's cover art.
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

# 2. Download the project demo videos (Git LFS — see below)
git lfs install
git lfs pull

# 3. Install dependencies
npm i

# 4. Set up environment variables (see below)
cp .env .env.local   # if you don't have .env values locally

# 5. Start the dev server
npm run dev
```

### Project videos (Git LFS)

The demo clips in `public/project-videos/` are tracked with [Git LFS](https://git-lfs.com) —
they total ~147 MB, so they are stored outside the normal object database (see
`.gitattributes`). **A plain `git clone` on a machine without git-lfs leaves
133-byte text pointers instead of the videos.**

That failure is quiet, which is what makes it confusing: the dev server answers
`200` with `Content-Type: video/mp4` and hands the browser 133 bytes of text, so
the video decodes to nothing and the row shows an empty black box rather than an
error.

`npm run dev` and `npm run build` both run `scripts/check-media.mjs` first and
print a table of any clip that is still a pointer, so this is caught before you
start debugging the player:

```
[media] 7 of 7 demo clip(s) are not real video files:

  POINTER  Apex.mp4         133 B on disk, should be 14.5 MB
  ...
```

To fetch the real clips:

```sh
git lfs install   # once per machine (macOS: brew install git-lfs)
git lfs pull
npm run check:media   # confirm every clip is now valid
```

At runtime the player is defensive too: it reads the first bytes of each clip
and checks for a real container signature, so a pointer, a 404 that returns the
SPA's `index.html`, or an unsupported codec all fall back to the project's cover
art with a note instead of a silent black rectangle. See
`src/lib/media-probe.ts` and `src/components/ProjectVideo.tsx`.

If you want to work on the player without downloading 147 MB, `npm run media:preview`
generates clearly-labelled stand-in clips into `.preview-media/` (gitignored).
A dev-only Vite plugin serves them **only** for a file whose real counterpart is
still an LFS pointer — real media always wins, and nothing is added to a
production build. Requires `ffmpeg` on PATH.

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
| `npm run check:media` | Verify the demo clips are real video, not LFS pointers |
| `npm run media:preview` | Generate stand-in clips for un-downloaded LFS media (dev only) |

`check:media` also runs automatically before `dev` and `build`. Add `-- --strict`
to make it fail instead of warn — useful in CI: `npm run check:media -- --strict`.

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
│   ├── ProjectVideo.tsx # Autoplaying demo clip with cover-art fallback
│   ├── CoverArt.tsx     # Per-project cover (screenshot, 3D scene, or SVG)
│   ├── ThemeProvider.tsx
│   ├── ErrorBoundary.tsx
│   ├── three/           # R3F particle scene (lazy-loaded)
│   └── ui/              # shadcn/ui primitives
├── integrations/supabase/
├── lib/                 # site config, utils
│   ├── media-probe.ts   # Byte-level check that a URL really serves video
│   └── covers.ts        # Cover stills, reused as video poster frames
└── assets/
```

## Editing the site

Most copy lives in `src/lib/site-config.ts`; sections are self-contained components in `src/components/`. Edit a file locally, or edit it directly in GitHub (pencil icon on any file).

This project is also maintained via [Lovable](https://lovable.dev/projects/5094cf0f-dd21-4da1-b781-ccfb1f259ff6) — changes made there commit automatically, and pushes from this repo reflect back there.
