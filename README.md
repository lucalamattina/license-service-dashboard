# License Service Dashboard

**Live demo:** https://license-service-dashboard.vercel.app/licenses

A React + TypeScript admin dashboard for the [license-service](https://github.com/lucalamattina/license-service) backend. List and detail views for licenses, users, and products, with status filtering, drill-down navigation, and a confirmation flow for revoking active licenses.

This is a portfolio companion to the substantive [license-service](https://github.com/lucalamattina/license-service) backend; this dashboard exists to make it inspectable without curl or a database client.

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
