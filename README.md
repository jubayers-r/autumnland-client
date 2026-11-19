# Autumn Land — Frontend Web Client

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.4+-fbf0df?logo=bun)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)](https://playwright.dev/)

A modern, high-performance **e-commerce storefront frontend** for Autumn Land, built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript 6**, **Bun**, **Tailwind CSS v4**, and **shadcn/ui**.

This repository (`autumnland-client`) serves as the client-side frontend application of the Autumn Land e-commerce platform, interfacing with the backend services. It delivers a complete, original shopping experience with multi-faceted catalog filtering, dynamic product detail galleries, interactive customer reviews, a persistent Zustand-powered shopping cart, promotional coupon logic, responsive navigation, and full light/dark theme support.

---

## ⚡ Key Features & Highlights

### 🛍️ Storefront & Landing Experience (`/`)

- **Hero Showcase**: Hero section featuring statistical impact counters (200+ International Brands, 2,000+ High-Quality Products, 30,000+ Happy Customers) and responsive call-to-actions.
- **Brand Partner Banner**: Partner logo marquee showcasing luxury brands (**Versace**, **Zara**, **Gucci**, **Prada**, **Calvin Klein**) linking directly to filtered catalog views.
- **Curated Collections**: "New Arrivals" and "Top Selling" product showcases with live pricing, discount badges, and star ratings.
- **Browse By Dress Style**: Visual category grid linking directly to filtered shop collections (**Casual**, **Formal**, **Party**, **Gym**).
- **Customer Testimonials**: Carousel highlighting verified customer feedback with 5-star ratings and buyer confirmation badges.

### 🔍 Advanced Catalog & Filtering (`/shop`)

- **Multi-Faceted Filtering**:
  - **Category**: T-shirts, Shirts, Shorts, Hoodies, Jeans.
  - **Dress Style**: Casual, Formal, Party, Gym.
  - **Brand**: Filter by luxury partner brands.
  - **Price Range**: Interactive dual-thumb slider with min/max price boundaries.
  - **Colors**: Visual color swatch pickers with active states.
  - **Sizes**: Size selector pills (XX-Small through 4X-Large).
  - **On Sale Only**: Instant filter to view discounted apparel.
- **Dynamic Sorting**: Sort by _Most Popular_, _Price: Low to High_, _Price: High to Low_, _Newest Arrivals_, and _Customer Rating_.
- **Responsive Layouts**: Desktop sidebar filter complemented by a smooth slide-over mobile sheet drawer (`MobileFilterSheet`).
- **Catalog Pagination**: Synchronous, zero-lag paginated product grid powered by [`lib/catalog-service.ts`](./lib/catalog-service.ts).

### 👕 Product Details & Customer Reviews (`/shop/product/[id]`)

- **Interactive Media Gallery**: Multi-angle image preview thumbnails with synchronized hero display and zoom preview.
- **Variant Selectors**: Real-time color swatch selection and clothing size buttons.
- **Dynamic Pricing Engine**: Visual strike-through pricing with percentage discount tags.
- **Tabbed Product Information**:
  - **Product Details**: Fabric composition, fit specifications, and care instructions.
  - **Rating & Reviews**: Breakdown of customer reviews, review sort/filter dialog, and an interactive **Write a Review** modal dialog with star rating inputs.
  - **FAQs**: Common shipping, sizing, and return questions.
- **Related Recommendations**: "You might also like" recommendations grid to encourage catalog discovery.

### 🛒 Shopping Cart & Checkout Engine (`/cart`, `/checkout`)

- **Persistent State**: Powered by **Zustand 5** with `localStorage` persistence ([`lib/cart-store.ts`](./lib/cart-store.ts)).
- **Selective Item Management**: Individual item selection checkboxes, select-all / deselect-all controls, and bulk remove capabilities.
- **Live Order Calculation**:
  - Item subtotal calculation based on active selections.
  - Promotional discount deduction.
  - Flat delivery fee computation.
  - Live original value comparison showing total customer savings.
- **Promo Coupon Engine**:
  - `TEST`: Flat $10 off entire order.
  - `AUTUMN20` / `SAVE20`: 20% discount on selected items.
  - `VIP30`: 30% VIP discount on selected items.
- **Mobile Action Bar**: Sticky mobile checkout footer ensuring smooth mobile purchase flow.
- **Checkout & Orders**: Dedicated `/checkout` and `/orders` routing.

### 🎨 Design System & Accessibility

- **Custom Typography**: Premium display typography powered by **Integral CF** (headlines) and **Satoshi** (geometric body sans).
- **Tailwind CSS v4 & OKLCH**: Modern CSS-first token configuration with light/dark palettes in [`app/globals.css`](./app/globals.css).
- **shadcn/ui & Radix Primitives**: 22+ accessible primitives (Dialog, Sheet, Slider, Accordion, Dropdown Menu, Sonner Toaster, etc.).
- **Theme Switching**: Seamless light, dark, and system theme modes via `next-themes`.
- **Strictly Mobile-First**: Built from small viewports up with accessible tap targets (minimum 44px) and fluid responsive layouts.

---

## 🛠️ Technology Stack

| Category           | Technology                                                                                                        | Description                                                               |
| :----------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Framework**      | [Next.js 16.4.3](https://nextjs.org/)                                                                             | App Router, Turbopack, Cache Components, React 19.3.0                     |
| **Runtime & PM**   | [Bun 1.4+](https://bun.sh/)                                                                                       | Fast package installation, script runner, and native test engine          |
| **Language**       | [TypeScript 6](https://www.typescriptlang.org/)                                                                   | Strict compiler mode, type safety, and path mapping                       |
| **Styling**        | [Tailwind CSS v4](https://tailwindcss.com/)                                                                       | CSS-first configuration (`@theme inline`), OKLCH tokens, `tw-animate-css` |
| **UI Components**  | [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)                                       | Accessible headless primitives (`radix-nova` style)                       |
| **Icons & Motion** | [Lucide React](https://lucide.dev/) & [Motion](https://motion.dev/)                                               | Consistent iconography and fluid micro-interactions                       |
| **Server State**   | [TanStack Query v5](https://tanstack.com/query)                                                                   | Async data management with global toast error handling                    |
| **Client State**   | [Zustand 5](https://zustand.docs.pmnd.rs/)                                                                        | Persisted shopping cart store & transient UI state                        |
| **Validation**     | [Zod 3](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)                                       | Type-safe runtime schemas and form management                             |
| **Testing**        | [Bun Test](https://bun.sh/docs/cli/test) & [Playwright](https://playwright.dev/)                                  | Unit test runner (<50ms execution) + cross-browser E2E suite              |
| **Theme**          | [next-themes](https://github.com/pacocoursey/next-themes)                                                         | Dark, light, and system theme switching                                   |
| **Code Quality**   | [ESLint 9](https://eslint.org/) + [Prettier 3](https://prettier.io/) + [Husky](https://typicode.github.io/husky/) | Automated linting, formatting, and git hook quality gates                 |

---

## 📂 Project Structure

```
autumnland-client/
├── app/                              # Next.js App Router routes & pages
│   ├── layout.tsx                    # Root layout (fonts, providers, header, footer)
│   ├── page.tsx                      # Homepage (Hero, Brands, New Arrivals, Top Selling, Dress Styles, Testimonials)
│   ├── globals.css                   # Tailwind v4 theme variables & OKLCH color tokens
│   ├── shop/
│   │   ├── page.tsx                  # Shop catalog with multi-facet filters & sorting
│   │   └── product/[id]/page.tsx     # Dynamic product detail page with reviews & specs
│   ├── cart/page.tsx                 # Shopping cart view with order summary & promo code
│   ├── checkout/page.tsx             # Multi-step checkout flow
│   ├── brands/page.tsx               # Partner brands directory
│   ├── orders/page.tsx               # Order history & status
│   ├── account/page.tsx              # User profile & preferences
│   ├── login/page.tsx                # Customer sign-in
│   ├── register/page.tsx             # Customer registration
│   ├── error.tsx                     # Route-level error boundary
│   ├── not-found.tsx                 # Custom 404 page
│   ├── robots.ts                     # Dynamic robots.txt generation
│   └── sitemap.ts                    # Dynamic sitemap.xml generation
├── components/
│   ├── cart/                         # Cart components (ItemList, ItemCard, Summary, MobileFooter)
│   ├── common/                       # Shared utility views (UnderDevelopmentView, etc.)
│   ├── footer/                       # Footer, Newsletter, SocialLinks, PaymentBadges
│   ├── header/                       # Header, TopBanner, Navbar, SearchBar, MobileDrawer
│   ├── home/                         # HeroSection, BrandBanner, ProductSection, DressStyle, Testimonials
│   ├── product/                      # ProductDetailGallery, ProductDetailOrder, tabs, and reviews
│   │   ├── reviews/                  # ReviewCard, ReviewFilterDialog, WriteReviewDialog, RatingStars
│   │   └── tabs/                     # ProductDetailsContent, ProductSectionTabs, ProductFaqsContent
│   ├── shop/                         # ShopView, FilterSidebar, MobileFilterSheet, ShopHeader, Pagination
│   ├── providers/                    # QueryProvider, ThemeProvider
│   ├── ui/                           # 22+ shadcn/ui primitives (Button, Dialog, Card, Sheet, etc.)
│   └── ErrorBoundary.tsx             # Subtree component error boundary with retry UI
├── lib/
│   ├── api.ts                        # Native fetcher with typed ApiError handling
│   ├── brands-data.ts                # Partner brand metadata and logos
│   ├── cart-store.ts                 # Zustand shopping cart store with localStorage sync
│   ├── catalog-data.ts               # Curated catalog dataset matching design specifications
│   ├── catalog-service.ts            # Synchronous filtering, sorting, and pagination engine
│   ├── env.ts                        # Runtime environment variable validation with Zod
│   ├── product-specs.ts              # Detailed garment specifications and FAQ data
│   ├── products.ts                   # Product details lookup and mock service
│   ├── reviews-data.ts               # Reference customer reviews data
│   ├── reviews-service.ts            # Review querying, sorting, and submission service
│   ├── store.ts                      # Transient global UI state store (Zustand)
│   └── utils.ts                      # Core cn() class merger (clsx + tailwind-merge)
├── tests/
│   ├── unit/                         # Unit tests (catalog, cart, reviews, api, env, utils)
│   └── e2e/                          # Playwright end-to-end tests (cart, home, shop, product, etc.)
├── types/
│   ├── index.ts                      # Shared domain types
│   ├── product.ts                    # Product, category, color, and size interfaces
│   └── review.ts                     # Review contracts, sorting, and filter definitions
├── public/
│   ├── assets/                       # Brand logos, product photography, dress style banners
│   └── fonts/                        # Satoshi Variable & Integral CF web fonts
├── ARCHITECTURE.md                   # Canonical architectural blueprint & conventions
├── DESIGN.md                         # Design system guidelines, tokens, and typography
├── AGENTS.md                         # Operational instructions for AI coding assistants
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (`v1.2.0` or higher recommended)
- Node.js (`v20+`, optional fallback)

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd autumnland-client
bun install
```

### 2. Environment Configuration

Copy the example environment configuration to `.env.local`:

```bash
cp .env.example .env.local
```

Default variables in `.env.example`:

```env
# Node Environment: development | production | test
NODE_ENV=development

# Optional Backend API Base URL (defaults to empty string for mock data)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Development Server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with live hot-reloading powered by Turbopack.

### 4. Build for Production

```bash
bun run build
bun run start
```

---

## 📜 Available Scripts

| Script           | Command                  | Purpose                                                    |
| :--------------- | :----------------------- | :--------------------------------------------------------- |
| `dev`            | `bun run dev`            | Start development server on port **5173** using Turbopack  |
| `build`          | `bun run build`          | Compile optimized Next.js production build                 |
| `start`          | `bun run start`          | Serve production build locally on port **5173**            |
| `lint`           | `bun run lint`           | Run ESLint across all TypeScript and React files           |
| `typecheck`      | `bun run typecheck`      | Perform strict TypeScript compiler check (`tsc --noEmit`)  |
| `test`           | `bun test`               | Execute unit and logic test specs via Bun Test             |
| `test:e2e`       | `bun run test:e2e`       | Run headless browser end-to-end tests via Playwright       |
| `test:e2e:ui`    | `bun run test:e2e:ui`    | Launch interactive Playwright test runner with UI          |
| `format`         | `bun run format`         | Format entire codebase using Prettier                      |
| `format:check`   | `bun run format:check`   | Verify code formatting compliance                          |
| `validate:quick` | `bun run validate:quick` | Pre-commit check (typecheck, lint, format, unit tests)     |
| `validate:full`  | `bun run validate:full`  | Pre-push heavy check (Playwright E2E and production build) |
| `validate`       | `bun run validate`       | Execute complete quality gate (quick + full checks)        |
| `prepare`        | `bun run prepare`        | Initialize Husky git hooks                                 |

---

## 🧪 Testing Strategy

The repository employs a two-tier testing infrastructure ensuring fast feedback loops and robust regression prevention:

### 1. Unit & Service Tests (Bun Test)

Instantaneous unit tests (<50ms total run time) targeting critical business logic, state machines, and data services without heavy browser overhead:

- **Cart Store**: Item addition, quantity updates, removal, and discount calculations ([`tests/unit/cart.test.ts`](./tests/unit/cart.test.ts)).
- **Catalog Filtering**: Multi-facet filter rules, sorting logic, price bounds, and pagination ([`tests/unit/catalog.test.ts`](./tests/unit/catalog.test.ts)).
- **Reviews Service**: Star ratings, sorting algorithms, and review filtering ([`tests/unit/reviews.test.ts`](./tests/unit/reviews.test.ts)).
- **Environment & API**: Runtime Zod validation and typed fetcher responses ([`tests/unit/env.test.ts`](./tests/unit/env.test.ts), [`tests/unit/api.test.ts`](./tests/unit/api.test.ts)).

```bash
bun test tests/unit
```

### 2. End-to-End Tests (Playwright)

Headless browser test suites testing real user journeys in Chromium:

- **Homepage Flow**: Navigation, hero banners, and dress style links ([`tests/e2e/home.spec.ts`](./tests/e2e/home.spec.ts)).
- **Shop & Filters**: Facet filtering, price sliders, mobile sheets, and sorting ([`tests/e2e/shop.spec.ts`](./tests/e2e/shop.spec.ts)).
- **Product Details & Reviews**: Variant selection, gallery interaction, and review modal ([`tests/e2e/product-detail.spec.ts`](./tests/e2e/product-detail.spec.ts), [`tests/e2e/product-reviews.spec.ts`](./tests/e2e/product-reviews.spec.ts)).
- **Cart Lifecycle**: Adding items, modifying quantities, applying coupons, and checkout triggers ([`tests/e2e/cart.spec.ts`](./tests/e2e/cart.spec.ts)).

```bash
bun run test:e2e
```

---

## 🎟️ Promo Codes for Testing

The cart engine includes built-in promo code rules for demonstration and verification:

| Promo Code | Discount Type | Effect                                                  |
| :--------- | :------------ | :------------------------------------------------------ |
| `TEST`     | Fixed Amount  | Flat **\$10.00** discount applied to the order subtotal |
| `AUTUMN20` | Percentage    | **20% off** total selected cart items                   |
| `SAVE20`   | Percentage    | **20% off** total selected cart items                   |
| `VIP30`    | Percentage    | **30% off** total selected cart items (VIP tier)        |

---

## 🔒 Security & Performance

- **Strict Content Security Policy (CSP)**: Pre-configured defense-in-depth headers in [`next.config.ts`](./next.config.ts) including `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.
- **Runtime Environment Validation**: Zod schema in [`lib/env.ts`](./lib/env.ts) prevents accidental builds with malformed configuration.
- **Dynamic SEO**: Automatic OpenGraph, Twitter card tags, programmatic [`app/robots.ts`](./app/robots.ts), and [`app/sitemap.ts`](./app/sitemap.ts).
- **Zero-Friction Import Paths**: Aliases `@/*` and `cn` configured in [`tsconfig.json`](./tsconfig.json) for shadcn/ui compatibility.

---

## 📖 Related Engineering Documentation

- [**Application Architecture (`ARCHITECTURE.md`)**](./ARCHITECTURE.md): Architectural boundaries, data flow, and server/client component guidelines.
- [**Design System Guidelines (`DESIGN.md`)**](./DESIGN.md): Visual tokens, typography scales, 4px grid rhythm, and component conventions.
- [**AI Agent Directives (`AGENTS.md`)**](./AGENTS.md): Development protocols and operational guardrails for AI coding assistants.
- [**Engineering Guides (`docs/engineering/`)**](./docs/engineering/): Standards for frontend, security, and testing.

---

## 📄 License

This project is private and proprietary. All rights reserved.
