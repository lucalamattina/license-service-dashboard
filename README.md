# License Service Dashboard

> **Status:** in active development. The live demo link will be the first line of this README once Milestone 5 ships.

A React + TypeScript admin dashboard for the [license-service](https://github.com/lucalamattina/license-service) backend. This is a portfolio companion to that backend — see [CONTEXT.md](CONTEXT.md) for design rationale and [PLAN.md](PLAN.md) for the milestone roadmap.

## Run locally

Requires the `license-service` backend running locally (default http://localhost:8080).

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173.

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

## Stack

React 19 · TypeScript 6 (strict) · Vite 8 · Tailwind CSS 3 · React Router 7 · TanStack Query 5 · Vitest 4
