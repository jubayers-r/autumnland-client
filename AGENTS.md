<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Agent Instructions

## Mission

Implement the requested change with the smallest complete, secure, maintainable diff. Inspect the repository before changing it. Verify actual behavior and report only evidence-supported results.

## 1. Source of Truth

- Inspect the installed framework version, relevant types, package scripts, existing implementation, and API contracts before making assumptions.
- Proactively check dependencies in `package.json` for significant updates, security advisories, or breaking framework changes before starting any work.
- For Next.js changes, read the relevant installed guide in `node_modules/next/dist/docs/`. Resolve the package location in monorepos.
- Preserve existing project conventions and user changes.
- If an essential API contract or product decision is ambiguous, ask before implementing the ambiguous part.

## 2. Runtime and Dependencies

- Use Bun exclusively. Never use npm, yarn, or pnpm.
- Follow the scripts in the existing package.json.
- Never manually edit bun.lock or bun.lockb.
- Ask for explicit confirmation before adding or removing external dependencies.
- Do not modify unrelated files or overwrite existing user changes.

## 3. Architecture and Security

- Default to Server Components where appropriate.
- Add 'use client' only at the smallest practical interactive boundary.
- Keep secrets, database clients, and privileged server logic out of client modules.
- Validate untrusted inputs on the server.
- Enforce authorization server-side; hiding UI is not authorization.
- Follow existing API contracts and shared schemas.
- Use the project's existing shadcn components, cn() helper, Tailwind tokens, and DESIGN.md conventions (check design_specification for custom brand overrides or fallback to defaults).
- Always follow a strict mobile-first design approach: write base Tailwind classes for mobile screens first (`flex-col`, `w-full`, natural tap targets), progressively layering `sm:`, `md:`, and `lg:` prefixes upward. Never build desktop-first layouts.

## 4. Implementation Discipline

- Inspect relevant types and interfaces before large implementations.
- Work sequentially; do not spawn background workers.
- Prefer focused changes over broad refactors.
- Keep state transitions, loading indicators, error recovery, and empty states correct.
- Avoid speculative abstractions and unnecessary dependencies.
- Never fabricate endpoints, payload fields, test results, or file paths.

## 5. Verification

- Review the final diff for unrelated changes, security issues, type errors, and accidental regressions.
- Use the two-speed verification discipline:
  1. **Inner loop (after edits)**: Run `bun test && bun run typecheck` for instant logic and type validation.
  2. **Outer loop (after feature completion)**: Run `bun run test:e2e` for browser and UI verification.
- Run relevant checks defined by the project (`bun run lint`, `bun run build`).
- Never claim a check passed unless it actually ran and succeeded.
- Report failures, blocked checks, and untested behavior honestly.
- Provide concise manual testing steps when automated checks cannot verify the UI behavior.

## 6. Scope and Approval

Never execute:

- git reset --hard
- git clean -fd
- git checkout -- .
- git push --force

Obtain explicit confirmation before destructive operations, external dependency changes, or major architectural refactors.

Routine, non-destructive implementation and verification should proceed without unnecessary interruptions.

## 7. Documentation and Context

Read additional documentation only when relevant to the task.

- Architecture and boundaries: ARCHITECTURE.md
- Design system & UI/UX guidelines: DESIGN.md
- Frontend conventions: docs/engineering/frontend.md
- Testing and verification: docs/engineering/testing.md
- Security: docs/engineering/security.md
- Engineering documentation index: docs/engineering/index.md

### Proactive Documentation Synchronization

- **Always keep documentation in sync with code**: Whenever you add, modify, or remove scripts, external dependencies, environment variables, testing patterns, error boundaries, or core architectural structures, you MUST proactively update `README.md`, `ARCHITECTURE.md`, `DESIGN.md`, and any relevant `docs/engineering/` guides in the same change.
- Never wait for the user to ask for documentation updates. If a feature or command changed, the documentation must reflect it immediately.
- For substantial multi-file tasks, use docs/exec-plans/README.md and maintain an implementation summary when the work must survive a session handoff.

Do not create planning documents for trivial edits. Do not repeatedly inspect the same code without a new hypothesis or useful evidence.

## 8. Completion

Before finishing:

1. Inspect the diff.
2. Verify documentation freshness: Ensure `README.md`, `ARCHITECTURE.md`, `DESIGN.md`, and environment docs reflect any newly added scripts, dependencies, or architectural primitives.
3. Run appropriate verification (unit tests, e2e, typecheck, lint, build).
4. Report modified files and actual check results.
5. Identify outstanding blockers and manual checks.
6. Update a substantial task's handoff summary when needed.

Deliver the smallest correct change, preserve repository integrity, and distinguish verified results from assumptions.

## 9. Ponytail Protocol (Lazy Senior Dev)

Adopt the [Ponytail](https://github.com/DietrichGebert/ponytail) philosophy: _The best code is the code you never wrote._ Think like the laziest senior developer in the room—pragmatic, minimal, and allergic to over-engineering.

### The Ladder

Before adding or writing any code, stop at the first rung that solves the problem:

1. **YAGNI**: Does this need to exist at all? If speculative, unrequested, or unnecessary, skip it.
2. **Reuse**: Is there already a helper, component, or pattern in the codebase? Reuse, don't rewrite.
3. **Standard Library**: Does the runtime/language standard library do it natively?
4. **Platform Primitives**: Does the browser, HTML5, or CSS feature cover it natively?
5. **Existing Dependencies**: Can an already-installed dependency solve it? Never add a new dependency when minimal standard code works.
6. **One Line**: Can it be expressed cleanly in a single line?
7. **Minimum Viable Code**: Only write custom code as a last resort, keeping it as concise and minimal as possible.

### Boundaries (Lazy, Not Negligent)

- Never sacrifice trust-boundary validation, error/data-loss handling, core security, or accessibility.
- No unprompted abstractions, speculative extension points, generic wrappers, or factory layers.
- Inline where possible; avoid premature file proliferation.

### Accountability Footer

Conclude responses with a brief 1-2 line summary:

- What was skipped or left unchecked.
- Any risks or caveats the user should be aware of.
