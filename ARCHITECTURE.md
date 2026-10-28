# Application Architecture

## Purpose

This document provides the canonical architectural blueprint for this Next.js frontend starter repository. AI agents and developers must consult this document to understand system boundaries, technology decisions, and conventions.

## Technology Stack

- **Runtime & Package Manager**: Bun (`bun@1.3.9` / `1.3.14`). Fast package resolution, zero npm/yarn/pnpm mixing.
- **Framework**: Next.js 16.4.3 (App Router, Turbopack, React 19.3.0, Cache Components, Partial Prerendering).
- **Language**: TypeScript 6 (`typescript@^6.0.3`, Strict Mode enabled for full ESLint AST & compiler compatibility).
- **Styling**: Tailwind CSS v4 (`@theme inline`), `tw-animate-css`, OKLCH CSS design variables.
- **UI Components**: shadcn/ui (`radix-nova` style with unified `radix-ui` headless primitives, Lucide React icons, Motion).
- **Theme**: `next-themes` (`ThemeProvider` wired in root layout with `attribute="class"`).
- **State Management**:
  - **Server State**: TanStack Query v5 (`@tanstack/react-query`) with global Sonner toast error handling.
  - **Client State**: Zustand 5 (`zustand`) for global transient UI state without provider nesting.
- **Forms & Validation**: React Hook Form (`react-hook-form`) + Zod (`zod`, `@hookform/resolvers/zod`).
- **HTTP Client**: Native `fetch` with type-safe `fetcher` and `ApiError` wrapper in `lib/api.ts`.

## Application Structure

The repository follows a clean Next.js App Router structure:

```
├── app/
│   ├── globals.css         # Tailwind v4 configuration, theme tokens (light/dark)
│   ├── layout.tsx          # RootLayout with Inter font, ThemeProvider, QueryProvider, Toaster
│   ├── page.tsx            # Starter home page & component showcase
│   ├── error.tsx           # Global error boundary (client component)
│   ├── not-found.tsx       # 404 handler (server component)
│   ├── robots.ts           # Dynamic SEO robots.txt generator
│   ├── sitemap.ts          # Dynamic SEO sitemap.xml generator
│   └── icon.svg            # Favicon SVG
├── components/
│   ├── providers/          # Application providers (QueryProvider, ThemeProvider)
│   ├── ui/                 # Atomic shadcn/ui primitives (Button, Dialog, Card, Input, etc.)
│   └── ErrorBoundary.tsx   # Isolated component error boundary with retry fallback
├── lib/
│   ├── api.ts              # Native fetcher with typed ApiError handling
│   ├── env.ts              # Runtime environment validation with Zod
│   ├── store.ts            # Global client UI store (Zustand)
│   └── utils.ts            # Core cn() class merger (clsx + tailwind-merge)
├── tests/
│   ├── unit/               # Instant Bun test specs (state, api, env validation)
│   └── e2e/                # Playwright end-to-end browser test specs
├── types/
│   └── index.ts            # Shared application types
└── public/                 # Static public assets (SVGs, favicon)
```

## Import Conventions & Aliases

Configured in `tsconfig.json` and `components.json`:

- `@/*` -> `./*` (e.g. `@/components/ui/button`, `@/lib/utils`)
- `cn` -> `./lib/utils` (Path alias ensuring both `import { cn } from "cn"` and `import { cn } from "@/lib/utils"` resolve seamlessly without manual edits when adding shadcn components)

## Rendering Boundaries

- **Server Components by Default**: All route segments (`layout.tsx`, `page.tsx`) default to Server Components.
- **Client Boundaries**: Apply `'use client'` strictly at the smallest practical interactive boundary (e.g. interactive forms, dialog state controllers, theme toggles, TanStack Query hooks).
- **Error & Loading Boundaries**: Use Next.js native `error.tsx` and `not-found.tsx` for resilient error isolation.

## Data Flow & State Management

1. **Server State**: Managed via TanStack Query (`useQuery`, `useMutation`) using the native `fetcher` in `lib/api.ts`. Global error toasts are pre-configured in `QueryProvider`.
2. **Client State**: Managed via Zustand (`lib/store.ts`) for global UI state (sidebar, modals, client filters) without `<Provider>` wrapping.
3. **Form State**: Managed via React Hook Form with Zod schemas for client-side type-safe validation before triggering mutations.
4. **Local UI State**: Managed via React hooks (`useState`, `useReducer`) or Radix primitive state machines.

## Related Documentation

For specialized domain standards and operational guardrails, consult the maintained engineering guides:

- **AI Agent Directives & Guardrails**: [`AGENTS.md`](./AGENTS.md)
- **Design System & UI/UX Guidelines**: [`DESIGN.md`](./DESIGN.md)
- **Frontend & UI Standards**: [`docs/engineering/frontend.md`](./docs/engineering/frontend.md)
- **Security & Authorization**: [`docs/engineering/security.md`](./docs/engineering/security.md)
- **Testing & Verification**: [`docs/engineering/testing.md`](./docs/engineering/testing.md)
- **Documentation Index**: [`docs/engineering/index.md`](./docs/engineering/index.md)
