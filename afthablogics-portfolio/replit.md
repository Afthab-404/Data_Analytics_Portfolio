# Afthab Logics Analytics Portfolio

Single-page personal portfolio for Afthab Logics, focused on practical data analytics work and direct contact/social links.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/afthablogics-portfolio/src/App.tsx` — page content, project cards, contact destinations, and navigation.
- `artifacts/afthablogics-portfolio/src/index.css` — visual system, responsive layout, motion, and hover states.
- `artifacts/afthablogics-portfolio/index.html` — public metadata and structured data.

## Architecture decisions

- The portfolio is frontend-only; example project content is local so the page loads instantly and can be edited without a backend.
- Social/contact destinations are centralized in one `CONTACTS` constant in `src/App.tsx`.
- Motion uses CSS keyframes and IntersectionObserver-based reveal behavior, with reduced-motion support in the stylesheet.

## Product

- Presents Afthab as an independent data analyst working with Python, Excel, SQL, and Power BI.
- Includes responsive navigation, selected work, toolkit, working method, contact actions, and external GitHub/LinkedIn links.

## User preferences

- User requested a polished analytics portfolio with a live data-inspired background and hover animations.

## Gotchas

- Update the `CONTACTS` constant before publishing if the preferred Gmail address or social profile slugs change.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
