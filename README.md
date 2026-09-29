# Solemate — SU Innovation Challenge

A static React web app. There is no server: everything builds to plain HTML/CSS/JS files that any static host can serve.

```
.
├── frontend/              The app
│   ├── public/            Copied as-is (favicon, SPA redirect rules)
│   └── src/
│       ├── pages/         Home, About, Dashboard (one file per route)
│       ├── sections/      Home-page sections — see "Home page sections" below
│       ├── components/    Layout, section cards/nav, scroll handling
│       │   └── ui/        shadcn/ui components (generated, safe to edit)
│       ├── data/          Mock data (JSON)
│       ├── hooks/         Reusable React hooks
│       └── lib/api.ts     Data layer — the only file pages use to get data
└── backend/               Parked: Node/Hono API, unused for now (see below)
```

## Getting started

Prerequisite: **Node.js 22+** (`winget install OpenJS.NodeJS.LTS`).

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → frontend/dist/
npm run preview    # serve the production build locally
```

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite |
| UI | React + TypeScript |
| Routing | React Router |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts (via shadcn `ChartContainer`) |
| Data | TanStack Query over a mock data layer |

## Home page sections

The home page is a scrolling set of sections (Why → Solution → Technology → Market → Business model → Advantages). The cards at the top and the sticky section nav jump to each section. The URL updates to e.g. `/#market`, so you can share links to a specific section.

- **Order, labels, icons, blurbs:** set in `frontend/src/sections/registry.ts`. To reorder or hide a section, edit that list; the cards, nav and page all follow it.
- **Content:** one file per section, e.g. `sections/Market.tsx`. Placeholders are marked `—` or `TODO`.
- **Add a section:** create `sections/NewThing.tsx` and add an entry to `registry.ts`.
- **Move a section to its own page:** add a route in `App.tsx` that renders `<Section meta={...} index={0}><NewThing /></Section>`.

## Data

Pages get data only through `src/lib/api.ts`, which currently returns mock JSON from `src/data/`. To use a real data source later (an API or a database service like Supabase), change only `api.ts`; the pages stay the same.

## Design system

The UI uses **[shadcn/ui](https://ui.shadcn.com)** (Radix + Tailwind, preset "Nova") with a "clean scientific" theme: cool slate neutrals, one deep-cerulean accent, the Geist font, and Geist Mono for numbers.

- **Tokens** are in `frontend/src/index.css`, under `:root` for light mode and `.dark` for dark mode. To restyle, generate a theme on [tweakcn.com](https://tweakcn.com) and paste over those two blocks.
- **Components** are in `frontend/src/components/ui/`. To add more: `npx shadcn@latest add dialog tabs ...`
- **Charts:** use `ChartContainer` and color series with `var(--chart-1)` … `var(--chart-5)`. That palette is chosen so colorblind viewers can tell the series apart.
- **Figma:** use the shadcn/ui kit on Figma Community so mockups match the code.
- **Rules:**
  - Use token classes (`bg-primary`, `text-muted-foreground`), never raw hex values.
  - Use `font-mono tabular-nums` for data values.
  - Keep the primary color for CTAs and the main data series.

## Deployment

**Live site:** https://solemate-gules.vercel.app. It's hosted on Vercel as project `solemate`, under the team `hung-vos-projects-014789f1`.

### Current: Vercel CLI (manual deploys)

Run from `frontend/`. Log in once with `npx vercel login`; the folder is already linked to the project (`.vercel/`, git-ignored).

| Command | What it does |
|---|---|
| `npx vercel` | Deploy a **preview** (test URL, live site untouched) |
| `npx vercel --prod` | Deploy to **production** (the live URL) |
| `npx vercel promote <preview-url>` | Make a checked preview the production version |
| `npx vercel rollback` | Revert production to the previous deployment |
| `npx vercel ls` | List deployments |

Suggested routine:
1. Run `npm run build` locally (catches type errors early).
2. Run `npx vercel` and check the preview URL.
3. Run `npx vercel --prod`.

A teammate who wants to deploy needs to be added to the Vercel team, then runs `npx vercel login` and `npx vercel link --project solemate` in `frontend/`.

### Next: GitHub + Vercel (automatic deploys)

**Goal:** every push to `main` updates the live site automatically, and every branch or pull request gets its own preview URL for teammates to review.

1. **First commit:** `git add . && git commit -m "Initial commit"` at the repo root. `.gitignore` already excludes `node_modules`, `dist`, `.env*` and `.vercel`.
2. **Create a GitHub repo:** create an empty repo on github.com (private is fine), then run:
   `git branch -M main && git remote add origin https://github.com/<you>/<repo>.git && git push -u origin main`
3. **Connect Vercel:** Vercel dashboard → project `solemate` → Settings → Git → Connect Git Repository → pick the repo.
   - Set **Root Directory = `frontend`** (Settings → Build and Deployment), because the app isn't at the repo root.
   - Keep the rest of the Vite defaults; `frontend/vercel.json` is picked up automatically.
4. **Add teammates:** give them access to the GitHub repo. They don't need Vercel accounts to get preview URLs on their pull requests.
5. **Protect `main` (optional):** GitHub → Settings → Branches → require a pull request before merging, so the live site only changes through reviewed PRs.

After this, the CLI routine above is only needed for one-off manual deploys.

### Other hosts

Any static host works. Point it at the `frontend` folder:

| Setting | Value |
|---|---|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Output directory | `dist` |

- **Vercel:** works out of the box. `frontend/vercel.json` sends every route to `index.html`, so refreshing `/dashboard` doesn't give a 404.
- **Netlify:** works out of the box via `frontend/public/_redirects`.
- **Self-hosted VM:** serve `frontend/dist` with Nginx or Caddy, and add a fallback to `index.html` (Nginx: `try_files $uri /index.html;`).
- **GitHub Pages:** has no rewrite rules, so refreshing a deep link fails. Prefer Vercel or Netlify.

## The parked backend

`backend/` is a working Node + Hono + SQLite CRUD API from the initial setup. Nothing uses it right now. If you later need data shared between visitors (submissions, sign-ups):
1. Run it: `cd backend && npm install && npm run db:push && npm run dev`.
2. Point `frontend/src/lib/api.ts` at it.
3. Re-add the Vite dev proxy: `server: { proxy: { "/api": "http://localhost:3000" } }` in `vite.config.ts`.

For deployment you would then also need an API host (e.g. Render) and a persistent database.
