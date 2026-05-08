# Burpham FC: Sanity + Next.js to EmDash + Astro Migration

## Progress

| Status | Count |
|--------|-------|
| Done | 0 |
| In Progress | 0 |
| To Do | 6 |

## Executive Summary

Migrate the Burpham FC website from Next.js 15 + Sanity CMS (hosted) to Astro + EmDash CMS (self-contained). This eliminates the external CMS dependency, moves to an Astro HTML-first architecture, and deploys on Cloudflare instead of Vercel. The Cloudflare Worker API for league/fixture data is unchanged.

## Goals

- Replace Sanity with EmDash as the sole CMS (self-hosted, no external dependency)
- Rewrite the frontend from Next.js to Astro
- Preserve all existing pages and functionality exactly as they are
- Keep the Cloudflare Worker API integration for league tables and fixtures
- Deploy on Cloudflare Workers (D1 + R2) for production
- Support local SQLite development without a Cloudflare account

## Non-Goals / Out of Scope

- Implementing the match reports feature (typed but never built in the original)
- Redesigning the UI (pixel-for-pixel port of existing design)
- Migrating content data programmatically (small enough for manual re-entry)
- Setting up EmDash plugins
- Setting up authentication / preview mode (not in the original either)

## Current Architecture

### Framework & Hosting

| Layer | Current | Target |
|-------|---------|--------|
| Framework | Next.js 15 (App Router, Turbopack) | Astro 6 + EmDash |
| CMS | Sanity (hosted, project `7qbpow7z`) | EmDash (self-contained) |
| Hosting | Vercel | Cloudflare Workers |
| Database | Sanity API (GROQ queries) | D1 (prod) / SQLite (dev) |
| Media Storage | Sanity CDN (`cdn.sanity.io`) | R2 (prod) / local fs (dev) |
| Styling | Tailwind 3.4 + shadcn/ui + CSS vars | Same (Tailwind 4 + shadcn/ui) |
| Dynamic Data | CF Worker API via React Query | Same (unchanged) |

### Sanity Content Types (Source of Truth)

#### `header` (singleton, `_id: "header"`)

- `description`: string - Hero tagline text
- `carouselImages`: SanityImageSource[] - Fetched but **unused** (carousel uses hardcoded local images)

#### `about` (singleton)

- `description`: string - About page intro
- `committeeMembers[]`: { name, title, description, image }
- `sponsors[]`: { title, subtitle, description, websiteUrl }

#### `getStuckIn` (singleton)

- `title`: string
- `description`: string

#### `matchReport` (typed in `src/types/sanity.ts` but NO page/query uses it)

- Not implemented. Skip for this migration.

### Pages

| Route | File | CMS Data | Client Data |
|-------|------|----------|-------------|
| `/` | `src/app/page.tsx` | `header.description` | League tables, fixtures (React Query) |
| `/about-us` | `src/app/about-us/page.tsx` | `about.*` (committee, sponsors) | None |
| `/get-involved` | `src/app/get-involved/page.tsx` | `getStuckIn.*` | None |

### Components

| Component | Client/Server | Dependencies | Migration Strategy |
|-----------|--------------|--------------|-------------------|
| `main-nav.tsx` | Client (`use client`) | Radix Sheet, lucide | React island (`client:load`) |
| `image-carousel.tsx` | Client (`use client`) | Embla Carousel, Autoplay | React island (`client:load`) |
| `league-table.tsx` | Client (`use client`) | React Query, Skeleton | React island (`client:load`) |
| `upcoming-fixtures.tsx` | Client (`use client`) | React Query, lucide, Skeleton | React island (`client:load`) |
| `youtube-embed.tsx` | Server (no state) | None | Pure Astro component |
| `query-client-provider.tsx` | Client (`use client`) | React Query | Keep for React islands |
| `ui/button.tsx` | - | Radix Slot, CVA | Keep as-is for islands |
| `ui/card.tsx` | - | - | Port to Astro or keep for islands |
| `ui/carousel.tsx` | Client | Embla | Keep as-is |
| `ui/sheet.tsx` | Client | Radix Dialog | Keep as-is |
| `ui/skeleton.tsx` | - | - | Keep as-is |

### Static Assets (in `public/`)

- `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` - Carousel images
- `Logo_2024.png` - Club logo
- `pitch.png` - Hero background
- `charlie.png`, `harry.png`, `person.jpg`, `some_guy.png` - Misc images
- `Bebas-Regular.ttf` - Custom font (in `src/components/`)

### Key Configuration

- Brand colors: `--burpham-green: 152, 99%, 27%` / `--burpham-yellow: 58, 84%, 52%`
- Background: `rgb(20, 20, 20)` solid dark
- Fonts: Geist Sans (body), Geist Mono (code), Bebas Regular (headings)

## EmDash Target Content Model

### Site Settings (built-in)

| Field | Type | Maps From |
|-------|------|-----------|
| `heroTagline` | Text | `header.description` |

### `committee-members` Collection

| Field | Type | Maps From |
|-------|------|-----------|
| `name` | Text | `committeeMembers[].name` |
| `role` | Text | `committeeMembers[].title` |
| `description` | Text | `committeeMembers[].description` |
| `photo` | Media | `committeeMembers[].image` |

### `sponsors` Collection

| Field | Type | Maps From |
|-------|------|-----------|
| `name` | Text | `sponsors[].title` |
| `subtitle` | Text | `sponsors[].subtitle` |
| `description` | Text | `sponsors[].description` |
| `websiteUrl` | URL | `sponsors[].websiteUrl` |

### `pages` Collection (for Get Involved)

| Field | Type | Maps From |
|-------|------|-----------|
| `title` | Text | `getStuckIn.title` |
| `body` | Rich Text | `getStuckIn.description` |
| `slug` | Slug | hardcoded `get-involved` |

## Tickets

### Phase 1: Scaffold Astro + EmDash Project

> **Description**: Create a new Astro project with EmDash integration alongside the existing Next.js code.
>
> **Scope**:
> - Run `npm create emdash@latest` or manually set up `astro.config.mjs` with EmDash
> - Configure SQLite for local dev
> - Configure local filesystem storage for media
> - Set up `src/live.config.ts` for Live Collections
> - Verify admin panel loads at `/_emdash/admin`
>
> **Acceptance Criteria**:
> - [ ] `npm run dev` starts Astro dev server
> - [ ] EmDash admin loads at `localhost:4321/_emdash/admin`
> - [ ] SQLite database is created locally

### Phase 2: Port Styling and Shared Utilities

> **Description**: Migrate Tailwind config, CSS variables, fonts, and shared utilities.
>
> **Scope**:
> - Port `globals.css` (CSS variables, brand colors, shadcn base styles)
> - Port `tailwind.config.ts` (color definitions, border radius, plugins)
> - Set up fonts (Geist Sans, Geist Mono via `@fontsource`, Bebas Regular as local)
> - Port `src/lib/utils.ts` (cn utility)
> - Copy all static assets from `public/` to Astro's `public/`
>
> **Acceptance Criteria**:
> - [ ] Brand colors render correctly
> - [ ] Fonts load (Geist Sans body, Bebas headings)
> - [ ] `cn()` utility works
> - [ ] All images accessible at same paths

### Phase 3: Port Layout and Navigation

> **Description**: Create the Astro layout and port the navigation component.
>
> **Scope**:
> - Create `src/layouts/Layout.astro` (html, head, body, fonts, nav, footer)
> - Port `MainNav` as a React island with `client:load` (uses Radix Sheet state)
> - Port shadcn `Button` and `Sheet` components (used by nav)
> - Replace `next/link` with `<a>` tags (Astro handles routing natively)
> - Replace `next/image` with `<img>` or Astro's `<Image>` component
>
> **Acceptance Criteria**:
> - [ ] Layout renders with logo, nav, footer
> - [ ] Mobile hamburger menu opens/closes
> - [ ] Desktop nav links work
> - [ ] All pages use the layout

### Phase 4: Port Pages

> **Description**: Convert all three pages from Next.js to Astro, replacing Sanity queries with EmDash API calls.
>
> **Scope**:
> - **Home page** (`src/pages/index.astro`):
>   - Fetch hero tagline from EmDash site settings (or hardcode initially)
>   - Hero section with background image, title, CTA button
>   - Image carousel as React island
>   - Cards section with league table, fixtures (React islands), YouTube embed
> - **About page** (`src/pages/about-us.astro`):
>   - Fetch committee members from EmDash `committee-members` collection
>   - Fetch sponsors from EmDash `sponsors` collection
>   - Social links section
> - **Get Involved page** (`src/pages/get-involved.astro`):
>   - Fetch from EmDash `pages` collection or site settings
>   - Social links section
>
> **Acceptance Criteria**:
> - [ ] All three pages render with correct content
> - [ ] EmDash queries return data for each page
> - [ ] League table and fixtures load client-side via React Query
> - [ ] YouTube embed works
> - [ ] Image carousel autoplays

### Phase 5: Port Interactive Components

> **Description**: Migrate all client-side React components as Astro islands.
>
> **Scope**:
> - Port `ImageCarousel` (Embla + Autoplay) - React island
> - Port `LeagueTable` (React Query) - React island
> - Port `UpcomingFixtures` (React Query) - React island
> - Port `YoutubeEmbed` - pure Astro component (just an iframe)
> - Port `QueryClientProviderWrapper` - wraps React islands
> - Port shadcn `Card`, `Carousel`, `Skeleton` components
> - Remove `next/image` usage, replace with standard `<img>` or Astro `<Image>`
> - Remove `next/link` usage, replace with `<a>` tags
>
> **Acceptance Criteria**:
> - [ ] Carousel autoplays through 4 images
> - [ ] League tables load and display data from CF Worker API
> - [ ] Fixtures load and display with date/venue
> - [ ] YouTube playlist embed renders
> - [ ] Loading skeletons show while data fetches

### Phase 6: Build Verification and Cleanup

> **Description**: Verify the full build works, remove Next.js artifacts, clean up.
>
> **Scope**:
> - Run `astro build` and verify no errors
> - Test all pages in production build (`astro preview`)
> - Remove Next.js config files (`next.config.ts`, etc.)
> - Remove Sanity client and types (`src/sanity/`, `src/types/sanity.ts`)
> - Remove Next.js-specific dependencies from `package.json`
> - Update README if it exists
> - Add Cloudflare deployment config (`wrangler.jsonc`) for future deploy
>
> **Acceptance Criteria**:
> - [ ] `astro build` succeeds with zero errors
> - [ ] `astro preview` serves all pages correctly
> - [ ] No Sanity or Next.js code remains
> - [ ] `package.json` only has Astro/EmDash/React dependencies

## Open Questions

| # | Question | Status | Answer |
|---|----------|--------|--------|
| 1 | Should we use Tailwind 3 or upgrade to Tailwind 4 with Astro? | Open | |
| 2 | Should carousel images come from EmDash media library or stay as local files? | Open | |
| 3 | Do we need Vercel Analytics/SpeedInsights equivalents on Cloudflare? | Open | |

## Technical Notes

### Decisions

- 2025-05-08: Use React islands (`client:load`) for all interactive components (nav, carousel, league table, fixtures) rather than rewriting in vanilla JS. This preserves the existing React code and shadcn/ui components.
- 2025-05-08: Start with local SQLite + filesystem storage for dev. Cloudflare D1/R2 deployment config can be added later.
- 2025-05-08: Manual content re-entry via EmDash admin rather than scripted migration. Content volume is tiny (a few text strings, ~5 committee members, ~3 sponsors).

### Gotchas

- The current carousel fetches `carouselImages` from Sanity but ignores them — uses hardcoded local images instead. The new version should just use local images directly.
- `next/image` must be replaced everywhere. Astro has its own `<Image>` component for local images, or use plain `<img>` tags.
- `next/link` must be replaced with plain `<a>` tags. Astro handles client-side navigation natively.
- The `fonts.ts` file uses `next/font` which doesn't exist in Astro. Use `@fontsource` packages or CSS `@font-face` instead.
- shadcn/ui components use `@radix-ui` which is React-only. These must live inside React islands, not in `.astro` files.

---

*Last updated: 2025-05-08*
