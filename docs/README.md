# HomeGuru × POP UI — Next.js (App Router)

> **Read this file first.** Then read `UI_UX_GUIDELINES.md`, then `APP_WORKFLOW_AND_CONTENT.md`.
> These three files are the single source of truth. If anything is unclear, the docs win over assumptions.

---

## 1. Goal

Rebuild the **HomeGuru** tutor-booking app UI so that its **entire look, feel and interaction style is exactly like the POP app** (dark theme, glowing gradients, rounded dark cards, orange pill CTAs, floating bottom navigation, bottom sheets), while keeping **HomeGuru's exact content** (text, tutor data, prices, labels).

- UI only. **No backend, no database, no API routes, no auth, no env vars.**
- Exactly **5 screens** (see section 2). Nothing else gets built.
- Mobile-first: the app renders inside a centered phone-width container (max 430px) on desktop.

## 2. Scope — the 5 screens

| # | Screen | Where it lives |
|---|---|---|
| 1 | **Home** — "Find your Tutor" (search, category chips, filters, tutor list) | route `/` |
| 2 | **Tutor Detail** — About, Subjects & Pricing, Availability, sticky booking bar | route `/tutors/[id]` |
| 3 | **Book a Class** bottom sheet — form (initial state: button disabled) | sheet on Tutor Detail |
| 4 | **Book a Class** bottom sheet — scrolled to the **1-MONTH SUMMARY** | same sheet, scrolled |
| 5 | **Payment** bottom sheet — NSL order summary + Pay Now | sheet on top of the Book sheet |

Screens 3 and 4 are the same sheet (screen 4 is just the scrolled-down view). So there are **2 routes + 2 sheets**.

**Out of scope (do NOT build):** Bookings tab page, About tab page, settings page, chat page, payment success/failure screen, login, any real data fetching, any animation library, any state library.

## 3. Tech stack (fixed)

| Concern | Choice |
|---|---|
| Framework | **Next.js (latest stable), App Router**, `src/` directory |
| Language | **TypeScript, `strict: true`** |
| Styling | **Tailwind CSS** (whatever version `create-next-app` installs) + CSS variables for design tokens |
| Icons | `lucide-react` |
| Class helper | `clsx` + `tailwind-merge` → exported as `cn()` in `src/lib/cn.ts` |
| Fonts | `next/font/google`: **Figtree** (UI) and **Instrument Serif** italic (accent words) |
| State | React `useState` / `useReducer` only. **No** Redux / Zustand / Context libraries |
| Animation | CSS transitions/keyframes only. **No** framer-motion |
| Images | Local SVG files in `public/avatars/`. **No** external image URLs |

Allowed runtime dependencies: `next`, `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`. **Do not add any other dependency.**

## 4. Setup

Requires Node.js 20+.

```bash
npx create-next-app@latest homeguru-pop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd homeguru-pop
npm install lucide-react clsx tailwind-merge
```

Accept the defaults for any other prompt. Copy this documentation into `docs/` in the project root.

Add this script to `package.json` (keep the generated ones):

```json
"typecheck": "tsc --noEmit"
```

Commands: `npm run dev` · `npm run lint` · `npm run typecheck` · `npm run build` · `npm start`

**Tailwind note:** if Tailwind v4 is installed, define tokens in `src/app/globals.css` inside an `@theme` block. If Tailwind v3 is installed, define them in `tailwind.config.ts` and as CSS variables in `globals.css`. The token *names and values* are in `UI_UX_GUIDELINES.md` §3 and are the same either way.

**Next.js note:** in current Next.js, dynamic route `params` is a **Promise**. In `src/app/tutors/[id]/page.tsx` use `params: Promise<{ id: string }>` and `const { id } = await params;`.

## 5. Documentation index

| File | Purpose |
|---|---|
| `README.md` | Goal, scope, stack, architecture, folder structure, coding rules, definition of done |
| `UI_UX_GUIDELINES.md` | POP design system: tokens, component specs, per-screen layout, motion, accessibility |
| `APP_WORKFLOW_AND_CONTENT.md` | Screen flow and state machine, exact HomeGuru content, ready-to-paste data/types/helpers, ordered task list |
| `IDE_PROMPT.md` | Original build brief and post-build fix brief (custom dropdowns, editable booking form) |

## 6. Folder structure (exact — create these paths, nothing extra)

```
homeguru-pop/
├─ docs/
│  ├─ README.md
│  ├─ UI_UX_GUIDELINES.md
│  ├─ APP_WORKFLOW_AND_CONTENT.md
│  └─ IDE_PROMPT.md
├─ public/
│  └─ avatars/
│     ├─ priya-sharma.svg
│     └─ arjun-mehta.svg
└─ src/
   ├─ app/
   │  ├─ layout.tsx                 # fonts, <AppShell>, <ChatFab>, metadata, viewport
   │  ├─ globals.css                # design tokens + base styles + keyframes
   │  ├─ page.tsx                   # Screen 1: Home
   │  ├─ not-found.tsx              # minimal dark 404
   │  └─ tutors/
   │     └─ [id]/
   │        └─ page.tsx             # Screen 2: Tutor Detail (server component)
   ├─ components/
   │  ├─ layout/
   │  │  ├─ AppShell.tsx            # centered 430px container + ambient background
   │  │  ├─ AppBar.tsx              # back, "HomeGuru" title, settings icon
   │  │  ├─ DemoBanner.tsx          # demo-application strip
   │  │  ├─ BottomNav.tsx           # floating pill: Home / Bookings / About
   │  │  └─ ChatFab.tsx             # round purple chat button
   │  ├─ brand/
   │  │  ├─ CoBrandRow.tsx          # HOMEGURU × PhonePe row
   │  │  ├─ HomeGuruWordmark.tsx
   │  │  ├─ PhonePeMark.tsx         # purple circle mark + "PhonePe" text
   │  │  └─ NslWordmark.tsx
   │  ├─ ui/
   │  │  ├─ Avatar.tsx
   │  │  ├─ Badge.tsx
   │  │  ├─ BottomSheet.tsx
   │  │  ├─ Button.tsx
   │  │  ├─ Chip.tsx
   │  │  ├─ Dropdown.tsx            # custom dropdown trigger + keyboard state
   │  │  ├─ DropdownPanel.tsx       # floating listbox rendered through a portal
   │  │  ├─ Input.tsx
   │  │  ├─ RadioCard.tsx
   │  │  └─ Stepper.tsx
   │  ├─ home/
   │  │  ├─ HomeView.tsx            # client: owns filter state
   │  │  ├─ SearchBar.tsx
   │  │  ├─ CategoryChips.tsx
   │  │  ├─ FilterRow.tsx
   │  │  ├─ TutorCard.tsx
   │  │  └─ TutorList.tsx
   │  ├─ tutor/
   │  │  ├─ TutorDetailView.tsx     # client: owns subject + sheet state
   │  │  ├─ TutorHeader.tsx         # sticky back row + profile block
   │  │  ├─ AboutSection.tsx
   │  │  ├─ SubjectPricing.tsx
   │  │  ├─ AvailabilitySection.tsx
   │  │  └─ BookingBar.tsx          # sticky bottom: subject dropdown + Book
   │  └─ booking/
   │     ├─ BookClassSheet.tsx
   │     ├─ BookingSummary.tsx
   │     └─ PaymentSheet.tsx
   ├─ data/
   │  ├─ content.ts                 # ALL UI strings
   │  └─ tutors.ts                  # tutor mock data
   ├─ hooks/
   │  ├─ useBookingForm.ts          # form state + derived totals
   │  ├─ useDropdownPosition.ts     # computes fixed panel position for Dropdown
   │  └─ useLockBodyScroll.ts
   ├─ lib/
   │  ├─ cn.ts
   │  ├─ format.ts
   │  ├─ booking.ts
   │  ├─ validation.ts              # email / phone validation + sanitization
   │  └─ tutors.ts                  # getTutorById, filterTutors
   └─ types/
      └─ index.ts
```

## 7. Architecture

### 7.1 Layers (dependencies only point downward)

```
app/ (routes)  →  components/ (view)  →  hooks/ + lib/ (logic)  →  data/ + types/
```

- `app/` files are thin: they fetch mock data, then render a view component. No styling logic.
- `components/` never import from `app/`.
- `lib/` and `hooks/` never import from `components/`.
- `data/` contains only static data and strings. `types/` contains only types.

### 7.2 Server vs client

- `layout.tsx`, `page.tsx` (Home), and `tutors/[id]/page.tsx` are **server components**.
- Mark `'use client'` only on files that use state, effects, event handlers, or `usePathname`:
  `HomeView`, `TutorDetailView`, `BottomSheet`, `BookClassSheet`, `PaymentSheet`, `BottomNav`, `ChatFab`, `AppBar`, `Dropdown`, `DropdownPanel`, `Input`, `Stepper`, `SearchBar`, `FilterRow`, `CategoryChips`, `BookingBar`, `SubjectPricing`, and `hooks/*`.
- Presentational pieces without interactivity (`TutorCard` content, `Badge`, `Avatar`, `AboutSection`, `AvailabilitySection`, `CoBrandRow`, `DemoBanner`, wordmarks) stay server components. `TutorCard` is a `next/link`, so it stays a server component.

### 7.3 Routing

| URL | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | renders `<HomeView tutors={TUTORS} />` |
| `/tutors/[id]` | `app/tutors/[id]/page.tsx` | `getTutorById(id)`; if missing → `notFound()`; export `generateStaticParams` returning every tutor id |

Home → Detail navigation uses `next/link` (`TutorCard` as a whole, and its **Book Class** button, both link to `/tutors/{id}`). Bottom sheets are **component state, not routes**.

### 7.4 State

| State | Owner | Type |
|---|---|---|
| search, category, language, budget, experience | `HomeView` | `TutorFilters` (see types) |
| selected subject id, open sheet (`"none" \| "book" \| "payment"`) | `TutorDetailView` | `useState` |
| first name, last name, email, phone, sessions per week, preferred time + derived totals | `useBookingForm` (called in `TutorDetailView`) | hook |

State is kept while the detail page stays mounted (closing a sheet does not reset the form). Nothing is persisted (no localStorage, no cookies).

### 7.5 Layering (z-index) — fixed scale

| Layer | z-index |
|---|---|
| Page content | 0 |
| AppBar / DemoBanner (sticky) | 20 |
| BottomNav / BookingBar | 30 |
| Book sheet + its backdrop | 40 |
| ChatFab | 45 |
| Payment sheet + its backdrop | 50 |
| Dropdown panel | 60 |

So the chat button floats above the Book sheet but is covered by the Payment sheet (this matches the screenshots). The dropdown panel floats above everything, including the Payment sheet.

### 7.6 Styling

- Colors, radii, shadows, gradients come from **tokens** (`UI_UX_GUIDELINES.md` §3). Components use token utility classes, never raw hex values.
- Dynamic values only may use inline `style`.
- Mobile-first. The container is `max-w-[430px]`; there is no desktop layout beyond centering.

## 8. Coding rules

1. TypeScript strict. **No `any`**, no `@ts-ignore`, no non-null `!` assertions.
2. **One component per file**; file name = component name (PascalCase). Components are **named exports**. Only Next special files (`page`, `layout`, `not-found`) use default exports.
3. Max ~150 lines per component file. Split if larger.
4. Props are typed with an `interface <Name>Props` declared in the same file.
5. **All user-facing strings live in `src/data/content.ts`** or in `src/data/tutors.ts`. No string literals for UI text inside components (aria-labels excepted).
6. Currency is formatted only via `formatINR` / `formatINRPlain` (`src/lib/format.ts`). Never concatenate `"₹"` by hand in components.
7. Booking math only via `src/lib/booking.ts`. Never inline `* 4` anywhere else.
8. Imports use the `@/` alias. No deep relative imports (`../../..`).
9. Import order: React/Next → third-party → `@/` modules → types. Keep unused imports at zero.
10. Use semantic HTML: `button` for actions, `a`/`Link` for navigation, `label` + `input`, `dialog` semantics via `role="dialog" aria-modal="true"` on sheets.
11. Every icon-only button has an `aria-label`.
12. No `console.log`, no commented-out code, no TODO left except the single allowed `// TODO(backend)` on Pay Now.
13. Do not install packages beyond the allowed list in §3.
14. Do not create files or folders that are not in §6.
15. Use `next/link` and `next/image` (or plain `<img>` only for the two local SVG avatars — `next/image` with `unoptimized` is fine).
16. Keep components pure; side effects only in hooks.

## 9. Naming conventions

- Components: `PascalCase.tsx` · hooks: `useCamelCase.ts` · utils: `camelCase.ts`
- Types/interfaces: `PascalCase`; union ids: `kebab-case` strings
- Booleans start with `is`, `has`, `can`; handlers start with `on` (props) / `handle` (internal)
- CSS tokens: `--color-*`, `--radius-*`, `--gradient-*`, `--shadow-*`

## 10. Definition of done

- [ ] `npm run lint`, `npm run typecheck`, `npm run build` all pass with **zero errors and zero warnings**
- [ ] All 5 screens match `UI_UX_GUIDELINES.md` §7 and the exact content in `APP_WORKFLOW_AND_CONTENT.md`
- [ ] Full flow works: Home → Tutor Detail → Book sheet → Payment sheet → close/back
- [ ] Works at 360px, 390px, 430px widths and centered on desktop; no horizontal scroll
- [ ] Folder structure equals §6 exactly
- [ ] No raw hex colors in `components/`, no hard-coded UI strings in `components/`
- [ ] Keyboard: Tab order is logical, sheets close with `Esc`, focus rings visible
