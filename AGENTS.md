<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NestCRM Developer Agent Guidelines

## Project Context
- **Name:** NestCRM
- **Repository:** https://github.com/SyedZayan/real-estate-crm
- **Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Base UI, Supabase.

## Coding Conventions & Design System
- **Colors:** Use the established Executive Palette defined in `src/app/globals.css`:
  - Deep Navy: `#091a2b`
  - Core Teal: `#005163`
  - Slate Indigo: `#3b4876`
  - Neutral Slate: `#52606d`
  - Canvas Background: `#f4f6f8`
- **Tone:** Professional, direct, and outcome-oriented. Avoid AI buzzwords, generic placeholder phrases, and internal technical jargon in user-facing components.
- **Authentication & Permissions:**
  - Route guards live in `DashboardShell.tsx`.
  - Roles: `admin` (Sales Director) and `sales_rep` (Sales Representative).
  - Enforce explicit sign-out; avoid in-app role hopping.
