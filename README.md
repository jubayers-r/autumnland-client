# Next.js Frontend Starter Template

A modern, high-performance **Next.js 16 + TypeScript 6 + Bun + Tailwind CSS v4 + shadcn/ui** starter template designed for zero-friction frontend engineering and seamless AI agent pair programming.

---

## ⚡ Features & Architecture

- **Next.js 16 (App Router)**: Powered by Turbopack, React 19, cache components, and partial prerendering.
- **TypeScript 6**: Modern, high-performance compiler standard fully compatible with ESLint AST parsing and Next.js Turbopack.
- **Bun Runtime**: Blazing-fast dependency resolution, native test runner, and script execution (`bun run dev`, `bun run build`).
- **Tailwind CSS v4**: CSS-first configuration using `@theme inline` with OKLCH design tokens.
- **shadcn/ui Suite**: 22 accessible primitives built on unified `radix-ui` (`radix-nova` style), including `ConfirmDialog` and `PasswordInput`.
- **Hybrid State Management**:
  - **Server State**: TanStack Query v5 (`@tanstack/react-query`) with automatic error toast handling.
  - **Client State**: Zustand 5 (`lib/store.ts`) for transient global UI state (modals, sidebars, toggles).
- **Native Data Fetching**: Lightweight, type-safe `fetcher` in [`lib/api.ts`](./lib/api.ts) with `ApiError` handling (zero client bundle overhead, fully compatible with Next.js caching).
- **Type-Safe Environment Variables**: Runtime Zod validation in [`lib/env.ts`](./lib/env.ts) that fails fast during build/startup if variables are invalid.
- **Two-Tier Testing Infrastructure**:
  - **Unit & Logic Tests**: Native Bun Test (`bun test`) running in <50ms with zero extra runtime dependencies.
  - **End-to-End Tests**: Playwright (`bun run test:e2e`) running headless Chromium against local Next.js servers.
- **Resilient Error Boundaries**: Route-level isolation via [`app/error.tsx`](./app/error.tsx) and component-level subtree isolation via [`components/ErrorBoundary.tsx`](./components/ErrorBoundary.tsx).
- **Git Hooks Protection (Husky)**: Two-tier validation pipeline:
  - **Pre-commit**: Ultra-fast lint, typecheck, style formatting, and Bun unit tests (~1.5s).
  - **Pre-push**: Full Playwright E2E browser tests and Next.js production build (~3s).
- **Production Security Headers**: Defense-in-depth HTTP headers (CSP, HSTS, X-Frame-Options, Sniff protection) in [`next.config.ts`](./next.config.ts).
- **Dynamic SEO & Metadata**: Programmatic [`app/robots.ts`](./app/robots.ts) and [`app/sitemap.ts`](./app/sitemap.ts) with OpenGraph and Twitter card metadata in [`app/layout.tsx`](./app/layout.tsx).
- **Dark Mode Built-in**: Full light/dark/system theme switching powered by `next-themes` and a ready-to-use `ModeToggle`.
- **Type-Safe Forms**: Pre-configured React Hook Form with Zod validation schemas.
- **Toasts**: Beautiful, theme-aware toast notifications with Sonner and Lucide icons.
- **Code Style & Formatting**: Pre-configured Prettier (`.prettierrc`) with full codebase formatting scripts.
- **Design System & UI/UX Constitution**: Canonical [`DESIGN.md`](./DESIGN.md) enforcing OKLCH tokens, typography scales, 4px grid rhythm, accessible touch targets, and component patterns.
- **AI-Agent Ready**: Full [`AGENTS.md`](./AGENTS.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), and [`DESIGN.md`](./DESIGN.md) guidance for LLMs (Claude, GPT, Gemini, Cursor).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Run Development Server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Script           | Command                  | Purpose                                                            |
| :--------------- | :----------------------- | :----------------------------------------------------------------- |
| `dev`            | `bun run dev`            | Start development server on port 5173 with Turbopack               |
| `build`          | `bun run build`          | Build optimized production bundle                                  |
| `start`          | `bun run start`          | Start production server on port 5173                               |
| `lint`           | `bun run lint`           | Run ESLint checks                                                  |
| `typecheck`      | `bun run typecheck`      | Run fast TypeScript 6 typecheck (`tsc --noEmit`)                   |
| `test`           | `bun test`               | Run fast unit & state tests (<50ms) via Bun Test                   |
| `test:e2e`       | `bun run test:e2e`       | Run headless browser E2E tests via Playwright                      |
| `test:e2e:ui`    | `bun run test:e2e:ui`    | Run Playwright tests with interactive UI debugger                  |
| `validate:quick` | `bun run validate:quick` | Fast quality gate for pre-commit (types, lint, format, unit tests) |
| `validate:full`  | `bun run validate:full`  | Heavy quality gate for pre-push (browser E2E and Next.js build)    |
| `validate`       | `bun run validate`       | Run all checks combined                                            |
| `format`         | `bun run format`         | Format all files across the project with Prettier                  |
| `format:check`   | `bun run format:check`   | Check formatting without modifying files                           |
| `prepare`        | `bun run prepare`        | Initialize Husky git hooks                                         |

---

## 🧩 Usage Guide

### Type-Safe Environment Variables

Import `env` from [`lib/env.ts`](./lib/env.ts) to guarantee verified runtime variables:

```tsx
import { env } from "@/lib/env";

console.log(env.NEXT_PUBLIC_API_URL);
```

### Component Error Boundary

Wrap unstable or third-party component trees with [`ErrorBoundary`](./components/ErrorBoundary.tsx) to prevent full-screen crashes:

```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function WidgetSection() {
  return (
    <ErrorBoundary onReset={() => console.log("Retrying widget...")}>
      <ExternalWidget />
    </ErrorBoundary>
  );
}
```

### Making API Requests (Native `fetcher`)

Use the lightweight typed `fetcher` in [`lib/api.ts`](./lib/api.ts), which pairs with TanStack Query:

```tsx
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";

interface UserProfile {
  id: string;
  name: string;
}

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetcher<UserProfile>(`/api/users/${userId}`),
  });
}
```

### Global Client State (Zustand)

Use the pre-configured store in [`lib/store.ts`](./lib/store.ts) for transient client state:

```tsx
"use client";

import { useAppStore } from "@/lib/store";

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  return <button onClick={toggleSidebar}>{sidebarOpen ? "Close" : "Open"}</button>;
}
```

### Adding New shadcn Components

Add any shadcn component using the official CLI:

```bash
bun x --bun shadcn@latest add <component-name>
```

> **Zero-Friction Import Mapping**: `tsconfig.json` contains a path alias mapping `"cn": ["./lib/utils"]`, so newly generated components work out of the box with zero manual import changes.

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css         # Tailwind v4 configuration, theme tokens (light/dark)
│   ├── layout.tsx          # RootLayout with Inter, ThemeProvider, QueryProvider, Toaster
│   ├── page.tsx            # Starter home page & component showcase
│   ├── error.tsx           # Global error boundary (client component)
│   ├── not-found.tsx       # 404 handler (server component)
│   ├── robots.ts           # Dynamic SEO robots.txt generator
│   ├── sitemap.ts          # Dynamic SEO sitemap.xml generator
│   └── icon.svg            # Favicon SVG
├── components/
│   ├── providers/          # ThemeProvider, QueryProvider
│   ├── ui/                 # 22 shadcn primitives (Button, Dialog, Card, Input, etc.)
│   └── ErrorBoundary.tsx   # Sub-tree component error boundary with retry UI
├── lib/
│   ├── api.ts              # Native fetcher with typed ApiError handling
│   ├── env.ts              # Runtime environment validation with Zod
│   ├── store.ts            # Global client UI store (Zustand)
│   └── utils.ts            # Core cn() class merger (clsx + tailwind-merge)
├── tests/
│   ├── unit/               # Native Bun tests (<50ms unit/state tests)
│   └── e2e/                # Playwright browser end-to-end test specs
├── types/
│   └── index.ts            # Shared application types
├── .husky/                 # Pre-commit hook triggers full verification before commit
└── public/                 # Static assets
```

---

## 🛠️ Tech Stack Reference

| Tool                                                                      | Purpose                                                        |
| :------------------------------------------------------------------------ | :------------------------------------------------------------- |
| [Next.js 16.4.3](https://nextjs.org/)                                     | React Framework (App Router, Turbopack, React 19)              |
| [TypeScript 6](https://www.typescriptlang.org/)                           | Type-safe development with full ESLint & tooling compatibility |
| [Bun](https://bun.sh/)                                                    | Package Manager, Runtime & Native Test Runner                  |
| [Playwright](https://playwright.dev/)                                     | Real Browser End-to-End Testing (Chromium)                     |
| [Tailwind CSS v4](https://tailwindcss.com/)                               | CSS-first Utility Styling                                      |
| [shadcn/ui](https://ui.shadcn.com/)                                       | Headless UI Components (Radix UI)                              |
| [TanStack Query v5](https://tanstack.com/query)                           | Async Server State Management                                  |
| [Zustand 5](https://zustand.docs.pmnd.rs/)                                | Global Client UI State                                         |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form Handling & Schema Validation                              |
| [Sonner](https://sonner.emilkowal.ski/)                                   | Toast Notifications                                            |
| [next-themes](https://github.com/pacocoursey/next-themes)                 | Theme Provider                                                 |
| [Prettier](https://prettier.io/)                                          | Code Formatter                                                 |
| [Husky](https://typicode.github.io/husky/)                                | Git Hooks Automation & Pre-commit Quality Gate                 |
