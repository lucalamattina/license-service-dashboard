# License Service Dashboard

**Live demo:** https://license-service-dashboard.vercel.app

> Replace the URL above with the real Vercel deploy URL once `vercel deploy` produces it. Vercel usually auto-generates `https://<repo-name>.vercel.app`; if it picks something else, paste the actual one here.

A React + TypeScript admin dashboard for the [license-service](https://github.com/lucalamattina/license-service) backend. List and detail views for licenses, users, and products, with status filtering, drill-down navigation, and a confirmation flow for revoking active licenses.

This is a portfolio companion to the substantive [license-service](https://github.com/lucalamattina/license-service) backend — that's the main project; this dashboard exists to make it inspectable without curl or a database client.

## Screenshots

> Add 2–3 screenshots here before the application goes out:
>
> - `/licenses` list view with the status filter visible
> - `/licenses/:id` detail with the linked user/product
> - The revoke confirmation modal open
>
> A short screencast (GIF or MP4) of the revoke flow end-to-end would be even better.

## Run locally

Requires the [license-service](https://github.com/lucalamattina/license-service) backend running locally (default `http://localhost:3000`).

```bash
git clone https://github.com/lucalamattina/license-service-dashboard
cd license-service-dashboard
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Adjust `VITE_API_URL` in `.env` if your backend runs elsewhere.

## Stack

React 19 · TypeScript 6 (strict) · Vite 8 · Tailwind CSS 3 · React Router 7 · TanStack Query 5 · Radix Dialog · Sonner · Vitest 4 · MSW

## Scope and deliberate trade-offs

This is a weekend-scope artifact. Where the PlanetScale Surfaces JD lists nice-to-haves that didn't make v1:

- **No Next.js** — Vite + React Router SPA. PlanetScale's app is Next.js; the port is the natural next step if this work progresses far enough to justify the time. The component code is framework-agnostic (no Router-specific logic in route components beyond the standard `useParams` / `useNavigate`), so the port would be largely mechanical.
- **No data visualisation** — the dataset is small and the dashboard's job is status visibility + drill-down, not aggregation. Adding charts is straightforward when there's data worth aggregating.
- **No feature flags** — the dashboard doesn't have a real use case that would meaningfully demo the pattern. The backend's MCP server is a better surface for that demonstration.

Full design rationale and the "What I'd do differently in production" notes: [CONTEXT.md](CONTEXT.md). Milestone-by-milestone plan: [PLAN.md](PLAN.md).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (strict) + Vite production build to `dist/` |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:ui` | Vitest with the `@vitest/ui` browser inspector |
| `npm run lint` | ESLint |
| `npm run preview` | Serve the production build locally |
