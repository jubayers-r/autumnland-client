# Testing and Verification

## Standard Verification Commands

- `bun test`: Fast unit and state tests via native Bun Test (<50ms). Use for stores, utilities, API clients, and schemas in `tests/unit/`.
- `bun run test:e2e`: Real browser end-to-end tests via Playwright Chromium in `tests/e2e/`. Automatically manages the Next.js dev server.
- `bun run typecheck`: TypeScript verification via `tsc --noEmit` (~1.5s).
- `bun run lint`: ESLint code style and Next.js rule verification.
- `bun run format:check`: Prettier code style validation.
- `bun run build`: Full Next.js production build and static page generation.
- `bun run validate:quick`: Fast checks for local commits (typecheck, lint, format check, bun test).
- `bun run validate:full`: Heavy checks for pushing (Playwright E2E tests and production build).
- `bun run validate`: Complete quality gate running both quick and full checks combined.

## Automated Git Hooks (Husky)

- **Pre-commit Hook (`.husky/pre-commit`)**: Automatically executes `bun run validate:quick` (~1.5s) on every `git commit`. Checks types, linting, code style, and unit tests without browser or build lag.
- **Pre-push Hook (`.husky/pre-push`)**: Automatically executes `bun run validate:full` (~3s) on every `git push`. Runs Playwright browser E2E tests and Next.js production build before anything leaves your machine.
- If any check fails, the commit or push is halted immediately.

## Two-Speed AI Verification Discipline

1. **Inner Loop (After Every Edit)**:
   Run `bun test && bun run typecheck` (~1.5s total). This guarantees logic, state transitions, and types are valid without browser overhead.
2. **Outer Loop (After Completing Features & UI)**:
   Run `bun run test:e2e` (~1-3s). Validates rendered headings, accessible roles, theme toggles, and user interactions in headless Chromium.

## Testing Strategy

Prefer focused tests that cover the behavior changed:

- **Unit tests (`tests/unit/`)**: Pure functions, Zustand stores, API error handlers, schema validators.
- **Browser tests (`tests/e2e/`)**: Semantic user interactions, form submissions, modal flows, toasts.

## Regression Checklist

Forms:

- Clean create state.
- Existing-data edit state.
- Invalid input validation errors.
- Submission success and failure toasts.

Data-driven UI:

- Loading skeleton states.
- Empty states.
- Error states and retry recovery.

Theme & Layout:

- Light and dark mode persistence.
- Semantic HTML tags (`<h1>` for primary headings, accessible `<button>` labels).
