# Design System & UI/UX Guidelines

## Purpose

This document is the canonical design blueprint for this frontend application. AI agents and developers must strictly consult this document when designing, building, or modifying user interfaces to preserve visual consistency, accessible contrast, and layout harmony.

---

## 🎯 Project Design Specification & Brand Overrides (Filler Slot)

> **AGENT INSTRUCTION**:
> Check this section before writing any UI or styling code:
>
> - **If customized below**: Adopt the specified brand colors, aesthetic archetype, typography, and corner radius. Update `app/globals.css` tokens to reflect the custom brand colors across light and dark modes.
> - **If left blank, untouched, or set to `DEFAULT`**: Operate strictly using the built-in design system (monochrome OKLCH tokens, Inter typography, 4px grid rhythm, and clean minimal shadcn/ui aesthetic detailed in the sections below).

```yaml
# ==============================================================================
# PROJECT BRAND & DESIGN OVERRIDES (OPTIONAL)
# Fill in your project's custom visual parameters below.
# Leave values as DEFAULT or blank to use the built-in system.
# ==============================================================================

design_specification:
  status: "DEFAULT" # Set to "CUSTOM" when values are provided, or leave as "DEFAULT"

  # Aesthetic Archetype (e.g., Clean Minimalist SaaS, High-Density FinTech Dashboard, Playful Consumer, Bold Brutalist, Elegant Luxury)
  aesthetic_archetype: DEFAULT

  # Brand Color Palette (Hex, OKLCH, or descriptive color name)
  primary_color: DEFAULT # e.g., "#3b82f6" (Blue) or "oklch(0.55 0.22 260)"
  secondary_color: DEFAULT # e.g., "#64748b" (Slate)
  accent_color: DEFAULT # e.g., "#10b981" (Emerald) or "#f59e0b" (Amber)
  destructive_color: DEFAULT # e.g., "#ef4444" (Rose/Red) or DEFAULT

  # Typography
  font_family: DEFAULT # e.g., "Inter", "Geist Sans", "Plus Jakarta Sans", or DEFAULT
  heading_style: DEFAULT # e.g., "Bold & Tracking-tight", "Uppercase Monospace", or DEFAULT

  # Surface & Geometry
  corner_radius: DEFAULT # Options: "none" (0px), "subtle" (6px), "modern" (10px - default), "pill" (9999px)
  card_elevation: DEFAULT # Options: "flat-bordered" (default), "subtle-shadow", "glassmorphic"

  # Tone & Atmosphere
  visual_tone: DEFAULT # e.g., "High-contrast technical, crisp borders, subtle transitions"
  default_theme: DEFAULT # Options: "system" (default), "dark", "light"
```

---

## 🎨 Core Design Philosophy (Default Baseline)

1. **Content-First & Uncluttered**: Prioritize readability and task completion. Avoid decorative noise, unnecessary borders, and arbitrary nested containers.
2. **Strictly Mobile-First**: Every layout, component, and page must be styled for mobile screens first (stacked `flex-col`, `w-full`, natural touch targets). Progressively enhance for larger screens using min-width breakpoint prefixes (`sm:`, `md:`, `lg:`). Never build desktop-first layouts with `max-*` overrides or fixed pixel widths that break mobile viewports.
3. **Token-Driven (Never Hardcode Colors)**: Every color, spacing, radius, and elevation must map to Tailwind CSS v4 design tokens and CSS variables. **Never write raw hex codes (`#1e293b`), arbitrary pixels (`p-[13px]`), or rogue RGB strings.**
4. **Radix & shadcn Primitive Reuse**: Always check and reuse primitives in `components/ui/` (Button, Card, Dialog, Sheet, Badge, Input, etc.) before writing custom UI components.
5. **Dark Mode First-Class Citizen**: Light and dark modes must look equally polished with verified contrast ratios.

---

## 🌈 Semantic Color Palette (OKLCH Tokens)

All colors are configured in `app/globals.css` using perceptual OKLCH color spaces:

| Token              | Class Utility                                | Intended Usage                                                               |
| :----------------- | :------------------------------------------- | :--------------------------------------------------------------------------- |
| **Background**     | `bg-background`                              | Base canvas color for whole page segments.                                   |
| **Foreground**     | `text-foreground`                            | High-contrast body text and primary labels.                                  |
| **Card / Surface** | `bg-card` / `text-card-foreground`           | Elevated containers, dialogs, dropdowns, and widgets.                        |
| **Primary**        | `bg-primary` / `text-primary-foreground`     | Main call-to-action (CTA), active state indicator, primary buttons.          |
| **Secondary**      | `bg-secondary` / `text-secondary-foreground` | Secondary actions, inactive tab indicators, subtle pills.                    |
| **Muted**          | `bg-muted` / `text-muted-foreground`         | Subtle backgrounds, disabled states, secondary descriptions, timestamps.     |
| **Accent**         | `bg-accent` / `text-accent-foreground`       | Hover states on interactive list items, dropdown options, and ghost buttons. |
| **Destructive**    | `bg-destructive` / `text-destructive`        | Errors, warnings, irreversible action buttons (delete, cancel, reject).      |
| **Border**         | `border-border`                              | Subtle structural dividers, card outlines, table row borders.                |
| **Ring**           | `ring-ring`                                  | Accessible focus rings for keyboard navigation.                              |

---

## ✍️ Typography Scale & Hierarchy

The application standardizes on **Inter** via `--font-sans`.

| Role                    | Class Scale            | Weight & Tracking                   | Typical Application                                        |
| :---------------------- | :--------------------- | :---------------------------------- | :--------------------------------------------------------- |
| **Display / Page Hero** | `text-3xl md:text-4xl` | `font-bold tracking-tight`          | Main page title (`<h1>`). Only one per page.               |
| **Section Header**      | `text-xl md:text-2xl`  | `font-semibold tracking-tight`      | Major page sections, card group headers (`<h2>`).          |
| **Subsection Header**   | `text-lg`              | `font-semibold`                     | Card titles, modal headers, list section headers (`<h3>`). |
| **Body (Default)**      | `text-sm md:text-base` | `font-normal text-foreground`       | Paragraphs, descriptions, table cells.                     |
| **Muted / Secondary**   | `text-sm`              | `font-normal text-muted-foreground` | Supporting descriptions, helper text beneath inputs.       |
| **Caption / Meta**      | `text-xs`              | `font-medium text-muted-foreground` | Badges, timestamps, avatar labels, footer metadata.        |

---

## 📐 Layout, Spacing & Container Rhythm

We enforce a 4px/8px rhythmic scale:

### Container Shells

- Standard full-width page container:
  ```tsx
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">{/* Page Content */}</div>
  ```
- Focused reading / Form centered container:
  ```tsx
  <div className="container mx-auto px-4 max-w-2xl">{/* Form Content */}</div>
  ```

### Spacing Guidelines

- **Inner element gap**: `gap-1.5` to `gap-2` (e.g. icon + label, button groups).
- **Component internal padding**: `p-4` or `p-6` (cards, dialog bodies).
- **Grid / Stack spacing**: `gap-4` or `gap-6` (card grids, form field rows).
- **Page section spacing**: `space-y-8` or `py-10` to `py-16` (between major sections).

### 📱 Mobile-First Responsive Standards

- **Mobile Baseline (0px - 639px)**:
  - Base classes apply without prefixes (e.g., `flex flex-col w-full gap-3 p-4`).
  - Form action buttons span full width (`w-full`) for easy thumb reach on touch devices.
  - Long tables must be wrapped in `<div className="overflow-x-auto">` or rendered as stacked card lists on mobile.
- **Tablet Enhancements (`sm: 640px`, `md: 768px`)**:
  - Transition stacked vertical layouts into horizontal alignments (`md:flex-row md:items-center`).
  - Grids shift from single column to dual columns (`grid-cols-1 md:grid-cols-2`).
- **Desktop Enhancements (`lg: 1024px`, `xl: 1280px`)**:
  - Expand multi-column dashboards (`lg:grid-cols-3` or `lg:grid-cols-4`).
  - Transition mobile sheet navigation into persistent sidebar layouts.

---

## 🎛️ Component Guidelines & Standards

### 1. Buttons (`components/ui/button.tsx`)

- **Primary Action**: `<Button variant="default">` (Only 1 primary CTA per visible viewport area).
- **Secondary Action**: `<Button variant="outline">` or `<Button variant="secondary">`.
- **Subtle / Table Action**: `<Button variant="ghost" size="sm">`.
- **Destructive**: `<Button variant="destructive">` (Always pair with `ConfirmDialog` for critical operations).
- **Icons with Buttons**: Always place icon before label with `className="gap-2"` and icon size `h-4 w-4`.

### 2. Cards (`components/ui/card.tsx`)

Standard pattern for grouped information:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
    <CardDescription>Short description explaining this section.</CardDescription>
  </CardHeader>
  <CardContent>{/* Main body content */}</CardContent>
  <CardFooter className="flex justify-end gap-2">{/* Actions */}</CardFooter>
</Card>
```

### 3. Modals vs. Drawers

- **`Dialog`**: For short, focused decisions (confirmations, authentication, compact single-step forms).
- **`Sheet`**: For contextual side panels, complex filters, mobile navigation drawers, or detailed record inspection.

### 4. Forms & Inputs

- Always wrap inputs with `<Label>` and display validation errors below using `text-xs text-destructive`.
- Use pre-built [`PasswordInput`](components/ui/password-input.tsx) for password fields with show/hide toggle.
- Provide clear placeholder text and disabled states (`disabled:opacity-50 disabled:cursor-not-allowed`).

### 5. Toast Notifications (Sonner)

Always provide instant feedback for asynchronous operations:

- `toast.success("Profile saved successfully")`
- `toast.error("Failed to connect to backend", { description: "Please check your network connection." })`
- `toast.info("Update available")`

---

## ✨ Icons & Micro-Interactions

- **Icon Family**: Exclusively use **Lucide React** (`lucide-react`).
- **Standard Sizing**:
  - `h-3.5 w-3.5`: Inline tag or caption icons.
  - `h-4 w-4`: Button and form input icons.
  - `h-5 w-5`: Navigation items and card header icons.
  - `h-6 w-6`: Hero feature highlight icons.
- **Transitions**: Apply `transition-colors duration-150 ease-in-out` on interactive hover states. Avoid heavy transition durations (>300ms) that make the UI feel sluggish.

---

## ♿ Accessibility & Quality Standards

1. **Focus Visibility**: Every interactive button, link, and input must preserve `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
2. **Touch Targets**: Mobile buttons and clickable icons must have a minimum touch target area of `44x44px` (or `p-2` on `h-8 w-8` icons).
3. **Semantic Landmarks**: Use `<main>`, `<header>`, `<nav>`, `<aside>`, and `<footer>` appropriately.
4. **Empty & Loading States**:
   - When data is loading, use `<Skeleton>` placeholders instead of empty blank screens.
   - When lists are empty, render a helpful empty state with an icon, explanatory caption, and an action button.
