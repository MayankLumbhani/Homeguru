# UI / UX Guidelines — POP Design Language for HomeGuru

> Apply this to **every** screen. Goal: someone who knows the POP app should feel HomeGuru is a screen from POP.
> Content (text/data) is NOT decided here — see `APP_WORKFLOW_AND_CONTENT.md`.

---

## 1. Design principles

1. **Dark first.** Near-black canvas, dark surfaces, white text. No light screens, no white cards.
2. **Glow, not flat.** Each screen gets one large soft gradient glow near the top (orange on Home, purple on Detail/sheets). Everything below fades to black.
3. **Big rounded shapes.** Cards 24px, sheets 32px, icon tiles 20px, buttons fully pill or 16–20px.
4. **One loud accent.** The **orange gradient pill** is the only primary CTA style. Purple is the secondary brand accent (PhonePe link, summary card, chat button).
5. **Confident type.** Heavy geometric sans for headings, muted gray for support text, one italic serif accent word per hero.
6. **Quiet chrome.** Thin low-contrast borders (white at 8%), subtle blur on floating bars, soft motion.

## 2. What we borrow from each POP screenshot

| POP screenshot | Borrow |
|---|---|
| "Tap to scan" (orange hero + "Everything UPI") | Orange radial glow at top fading to black; section headings in white semibold; **floating bottom nav pill with a separate round button on the right**; dark rounded icon tiles |
| "UPI-first credit card… Apply now" | **Orange-red gradient pill CTA**; small co-brand row (`pop │ YES BANK │ RuPay`) → our `CoBrandRow` |
| "Save ₹250 on card bill" (purple) | Purple gradient/tinted panels → our booking summary card |
| "Introducing POPchop" (red card, purple "Pay ₹0" button) | Italic serif accent text; bold, chunky price/amount typography |
| "The better way to shop" (dark grid) | Dark cards with thin borders, small rounded rating chips, bold prices |
| "The better way to earn" (green) | List rows on dark surface with divider lines |

## 3. Design tokens

Define in `globals.css` (Tailwind v4: inside `@theme`; v3: mirror in `tailwind.config.ts`). **Use these names exactly.**

### 3.1 Colors

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0B` | page background |
| `--color-surface` | `#141416` | cards, nav |
| `--color-surface-2` | `#1D1D21` | inputs, chips, inner tiles |
| `--color-surface-3` | `#26262B` | pressed/disabled fills, amount pill |
| `--color-sheet` | `#121214` | bottom sheet background |
| `--color-border` | `rgba(255,255,255,0.08)` | default 1px borders, dividers |
| `--color-border-strong` | `rgba(255,255,255,0.16)` | nav pill, selected neutral |
| `--color-fg` | `#FFFFFF` | primary text |
| `--color-fg-muted` | `#A1A1AA` | secondary text |
| `--color-fg-subtle` | `#71717A` | hints, overlines, placeholders |
| `--color-orange` | `#FF8A2A` | accent text/icons, active nav |
| `--color-orange-deep` | `#F2480A` | gradient end |
| `--color-purple` | `#7C3AED` | chat FAB, brand accent |
| `--color-purple-soft` | `rgba(124,58,237,0.16)` | tinted panels/steppers |
| `--color-purple-border` | `rgba(167,139,250,0.45)` | tinted panel borders |
| `--color-purple-text` | `#C4B5FD` | text on purple tint |
| `--color-amber` | `#FBBF24` | star icon, "Top Rated" |
| `--color-amber-soft` | `rgba(251,191,36,0.14)` | "Top Rated" badge fill |
| `--color-violet-soft` | `rgba(167,139,250,0.16)` | "Popular" badge fill |
| `--color-demo-from` | `#7F1027` | demo strip gradient start |
| `--color-demo-to` | `#B3123A` | demo strip gradient end |
| `--color-phonepe` | `#5F259F` | PhonePe mark circle |
| `--color-phonepe-text` | `#A78BFA` | "PhonePe" text on dark |
| `--color-hg-blue` | `#7AA2FF` | "HOME" in HomeGuru wordmark |
| `--color-avatar-sky` | `#7FD6E6` | Priya avatar tile |
| `--color-avatar-lavender` | `#B9A5E8` | Arjun avatar tile |
| `--color-danger` | `#F87171` | validation error border + text |

### 3.2 Gradients

| Token | Value |
|---|---|
| `--gradient-cta` | `linear-gradient(135deg, #FF8A2A 0%, #F2480A 100%)` |
| `--gradient-glow-orange` | `radial-gradient(120% 55% at 50% 0%, rgba(255,106,26,0.55) 0%, rgba(194,59,0,0.25) 38%, rgba(10,10,11,0) 72%)` |
| `--gradient-glow-purple` | `radial-gradient(120% 50% at 50% 0%, rgba(109,40,217,0.5) 0%, rgba(59,15,120,0.22) 40%, rgba(10,10,11,0) 75%)` |
| `--gradient-demo` | `linear-gradient(90deg, var(--color-demo-from), var(--color-demo-to))` |
| `--gradient-fab` | `linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)` |
| `--gradient-summary` | `linear-gradient(160deg, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.08) 100%)` |

### 3.3 Radius, shadow, spacing

| Token | Value |
|---|---|
| `--radius-sm` | `12px` (small chips, amount pill) |
| `--radius-md` | `16px` (inputs, radio cards, steppers, dropdown) |
| `--radius-lg` | `24px` (cards) |
| `--radius-xl` | `32px` (sheet top corners) |
| `--radius-full` | `9999px` |
| `--shadow-cta` | `0 10px 30px -8px rgba(242,72,10,0.55)` |
| `--shadow-fab` | `0 12px 28px -6px rgba(91,33,182,0.65)` |
| `--shadow-nav` | `0 16px 40px -12px rgba(0,0,0,0.8)` |
| `--shadow-dropdown` | `0 20px 50px -12px rgba(0,0,0,0.8)` |
| `--shadow-focus` | `0 0 0 3px rgba(255,138,42,0.22)` |
| `--shadow-focus-danger` | `0 0 0 3px rgba(248,113,113,0.22)` |

Spacing: page horizontal padding **20px**; vertical rhythm steps **8 / 12 / 16 / 24 / 32px**. Tap targets **≥ 44px**.

### 3.4 Typography

- **Figtree** (weights 400, 500, 600, 700, 800) via `next/font/google`, CSS var `--font-sans`. This is the default body font.
- **Instrument Serif** italic (weight 400) via `next/font/google`, CSS var `--font-serif`. Used **only** for accent words (e.g. "Tutor" in the Home title).

| Style | Size / line | Weight | Notes |
|---|---|---|---|
| Display (Home title) | 32 / 36 | 800 | tracking `-0.02em` |
| Title (sheet titles, name) | 22 / 28 | 700 | |
| Section heading | 20 / 26 | 700 | |
| Body | 15 / 22 | 400–500 | |
| Caption | 13 / 18 | 400 | muted |
| Overline (field labels, "ORDER SUMMARY") | 12 / 16 | 600 | uppercase, tracking `0.08em`, `fg-subtle` |
| Price (large) | 24 / 28 | 800 | |

### 3.5 Motion

| Token | Value |
|---|---|
| `--ease-sheet` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Sheet slide | `transform` 320ms `--ease-sheet` (from `translateY(100%)`) |
| Backdrop fade | `opacity` 200ms ease-out |
| Button press | `scale(0.98)` 120ms |
| Card entrance | fade + translateY(8px→0), 350ms, stagger 60ms (cap at 5 items) |
| Chip/Dropdown/Input state | 150ms |
| Dropdown panel | opacity 0→1 + scale 0.98→1, 150ms, origin at the trigger side |

`@media (prefers-reduced-motion: reduce)` → disable all transforms/animations (keep opacity changes instant).

## 4. App shell

- `body` background `--color-bg`. On screens wider than 430px, the area outside the container shows `--color-bg` with a very subtle vignette (`radial-gradient(circle at 50% 0%, #17171C, #0A0A0B 60%)`).
- `AppShell`: `mx-auto min-h-dvh w-full max-w-[430px] relative overflow-x-hidden bg-bg`. Content scrolls with the **page** (not an inner scroller). **Do not apply `transform`/`filter` to AppShell** (it would break `position: fixed` children).
- All `fixed` elements (BottomNav, BookingBar, ChatFab, sheets) use a wrapper `fixed inset-x-0 mx-auto max-w-[430px]` so they stay inside the phone width on desktop.
- Respect safe areas: bottom bars add `padding-bottom: max(16px, env(safe-area-inset-bottom))`. Set viewport `viewport-fit=cover` in `layout.tsx` (`export const viewport`).

## 5. Global components

### 5.1 `AppBar` (every screen)
- Height 56, sticky top, z 20, background `--color-bg` at 80% + `backdrop-blur-md`, bottom border `--color-border`.
- Left: back icon button (`ArrowLeft`, 24px, white, 44×44 hit area, `aria-label="Go back"`). On Home it is visible but does nothing; on other routes it calls `router.back()`.
- Title: **HomeGuru**, 20px / 600, white, left-aligned after the back button.
- Right: `Settings` (gear) icon button 44×44, `aria-label="Settings"`, no action.
- **No blue bar.** No solid colored header.

### 5.2 `DemoBanner` (every screen, directly under AppBar)
- Full width, `--gradient-demo`, white text, 13px / 600, centered, padding 8px 16px, up to 2 lines.
- Scrolls away with the page (not sticky).

### 5.3 `ChatFab`
- 56×56 circle, `--gradient-fab`, `--shadow-fab`, `MessageSquare` icon (white, 24px), `aria-label="Chat"`, no action.
- Rendered once in `layout.tsx`. Position via `usePathname()`:
  - on `/` → **in the bottom-nav row**: right 16px, bottom `max(16px, safe-area)`, vertically aligned with the nav pill.
  - elsewhere → right 16px, bottom **104px** (floats above the BookingBar).
- z-index 45.

### 5.4 `BottomNav` (Home only)
- Floating pill: left 16px, **right 88px** (room for the FAB), bottom `max(16px, safe-area)`, height 64, `bg rgba(20,20,22,0.85)` + `backdrop-blur-xl`, 1px `--color-border-strong`, `--radius-full`, `--shadow-nav`, z 30.
- 3 equal tabs, icon (24px) over label (12px / 600): **Home** (`House`), **Bookings** (`CalendarDays`), **About** (`User`).
- Active (Home): icon + label `--color-orange`, plus a pill highlight `bg-surface-3` (inset 6px). Inactive: `--color-fg-subtle`.
- Bookings and About are visual only (buttons, no navigation, no route). Use `aria-current="page"` on Home.
- Home page needs `padding-bottom: 120px` so the last card clears the nav.

### 5.5 `CoBrandRow`
- A centered pill row (like POP's `pop │ YES BANK │ RuPay`): `bg-surface`, 1px border, `--radius-full`, padding 10px 16px, items separated by a thin vertical divider (`1px × 16px`, `--color-border-strong`) and a `×` between brands (muted).
- `HomeGuruWordmark`: text **HOME** (`--color-hg-blue`) + **GURU** (`--color-orange`), 800 weight, 14px, inside a 1px `--color-orange` rounded (6px) box, padding 2px 6px.
- `PhonePeMark`: 24px circle `--color-phonepe` with white "पे" (700, 14px) + text **PhonePe** (`--color-phonepe-text`, 700, 14px). Pure CSS/inline SVG — no image files, no real logo assets.

## 6. UI primitives

### `Button` (`variant`: `primary` | `secondary` | `ghost`; `size`: `md` | `lg`)
- `primary`: `--gradient-cta`, white 700 text, `--shadow-cta`, `--radius-full` (md: height 44, px 20; lg: height 56, `--radius-lg`, full width when `fullWidth`).
- `secondary`: `bg-surface-2`, 1px border, white text.
- `ghost`: transparent, white text.
- **Disabled** (all variants): `bg-surface-3`, text `--color-fg-subtle`, no shadow, `cursor-not-allowed`, `aria-disabled`.
- Pressed: `scale(0.98)`. Focus-visible: 2px `--color-orange` ring at 2px offset (global rule); it wraps the button's own border-radius, so rounded buttons never show a square focus box.

### `Chip` (category chips, availability slots)
- Height 40, px 16, `--radius-full`, 14px / 600. Inactive: `bg-surface`, 1px border, `fg-muted`. **Active: `--gradient-cta`, white text, no border.**
- Focus-visible: 2px `--color-orange` ring at 2px offset (global rule), wrapping the pill radius.
- Used in a horizontally scrollable row (`overflow-x-auto`, hidden scrollbar, `gap-8px`, 20px side padding, last chip may be cut off at the edge like the screenshot).

### `Badge` (`tone`: `amber` | `violet`)
- Height 24, px 10, `--radius-sm`, 12px / 600. `amber`: `--color-amber-soft` bg + `--color-amber` text (**Top Rated**). `violet`: `--color-violet-soft` bg + `--color-purple-text` text (**Popular**).

### `Dropdown` (filters + bottom-bar subject picker + Preferred time)

Custom listbox — **never a native `<select>`**. The trigger is a `<button type="button">` with `aria-haspopup="listbox"`, `aria-expanded` and `aria-label`; its label truncates and a `ChevronDown` (18px, `fg-subtle`) rotates 180° in 150ms when open.

- Variants: **filter** height 48, px 16, 15px text, `flex-1 min-w-0` (selected: border `--color-orange` at 50% opacity + white 600 text); **field** height 52 matching `Input`; **bar** height 56 rendering a two-line `triggerContent` (name 15px / 700 white, price/session 14px `fg-muted`).
- Open: border 1.5px `--color-orange` + `--shadow-focus`. Focus-visible: 1px `--color-orange` border + `--shadow-focus` glow following `--radius-md`; the global outline is suppressed so there is a single rounded indicator. Pressed: `scale(0.99)` 120ms.
- Panel is portaled to `document.body`: `position: fixed`, z 60, bg `rgba(29,29,33,0.96)` + `backdrop-blur-xl`, 1px `--color-border-strong`, `--radius-md`, padding 6, `--shadow-dropdown`, max-height `min(280px, available space)` (never below 120), hidden scrollbar.
- Option rows: height 48, px 14, 12px radius, 15px. Label left (truncate), optional `meta` right (`fg-muted`, 14px), a reserved 20px slot holding `Check` (18px, `--color-orange`) for the selected row. Hover/keyboard-active row `bg-surface-3`; selected white 700, others white 500.
- `allowClear` + `clearLabel` adds a **Clear selection** row at the top (muted text, divider below) only while a value is selected; choosing it calls `onChange("")`.
- Position (`useDropdownPosition`): measured from the trigger; filters are at least 208px wide; left edge is clamped inside `[data-app-shell]` ± 12px; placement `auto` flips upward when there is no room below; recomputed on open, resize and any scroll. No scroll lock inside the dropdown.
- Keyboard: ArrowDown/ArrowUp on a closed trigger open the list; while open ArrowDown/ArrowUp move with wrap, Home/End jump, Enter/Space select, Tab closes, `Esc` closes **only the dropdown** (the parent sheet stays open) and focus returns to the trigger.

### `Input`

- Height 52, px 16, `bg-surface-2`, 1px border, `--radius-md`, 15px, placeholder `--color-fg-subtle`. The **rounded wrapper** owns every visual; the inner `<input>` is borderless, transparent and focus-ring-free. Focus: wrapper gets 1px `--color-orange` border + `--shadow-focus` glow (150ms transition) — one indicator that follows the radius, never a separate square outline. Keyboard focus is unchanged for assistive tech.
- `prefix` renders inside the field on the left: 15px `--color-fg-muted`, then a 1px × 20px divider (`--color-border-strong`), 12px gaps.
- `error`: wrapper border `--color-danger`; while focused, `--shadow-focus-danger` glow with the danger border kept. Error text below (13px `--color-danger`, 8px gap) with `role="alert"`, `aria-invalid="true"` and `aria-describedby` pointing at the message. If both helper and error exist, only the error shows.
- **No read-only variant.** Label above: overline style, 8px gap. Optional helper text below: caption, `fg-subtle`, 8px gap. Ids are generated with `useId()` and link label, input and message.

### `Stepper`
- Row: `[−]` 52×52 · centered value box (flex-1, height 52) · `[+]` 52×52, gap 12.
- Side buttons: `bg-surface-2`, 1px border, `--radius-md`, `Minus`/`Plus` icons 20px. Disabled at limits (opacity .4). Focus-visible: 2px `--color-orange` ring at 2px offset (global rule) following the radius.
- Value box: `--color-purple-soft` bg, **2px `--color-purple-border`**, `--radius-md`, text 22px / 700 `--color-purple-text`. `role="spinbutton"`, `aria-valuenow/min/max`; the same rounded focus ring applies.

### `RadioCard`
- Full-width row, height 56, px 16, `--radius-md`, 1px border, `bg-surface`. Left: radio circle 22px + label (16px / 600). Right: price (16px / 700).
- **Selected:** border 1.5px `--color-orange`, bg `rgba(255,138,42,0.08)`, radio filled orange with white inner dot. Use `role="radio"` inside a `role="radiogroup"`. Focus-visible: 2px `--color-orange` ring at 2px offset (global rule) following `--radius-md`.

### `SearchBar`
- Pill field: wrapper owns height 52, `--radius-full`, 1px `--color-border`, `bg-surface-2`; leading `Search` icon 20px `fg-subtle`; the inner `<input type="search">` is borderless, transparent and focus-ring-free.
- Focus: wrapper gets 1px `--color-orange` border + `--shadow-focus` glow (150ms transition) — one rounded indicator only.

### `BottomSheet`
- Wrapper `fixed inset-0 mx-auto max-w-[430px]`. Backdrop `rgba(0,0,0,0.6)` + `backdrop-blur-sm`; click closes.
- Panel: `bg-sheet`, top radius `--radius-xl`, 1px top border `--color-border`, max-height **92dvh**, flex column: **header (fixed)** / **body (scrolls)** / **footer (fixed)**.
- Drag handle: 40×4, `--radius-full`, `#3A3A40`, centered, 12px from top.
- `role="dialog" aria-modal="true" aria-labelledby`; focus moves into the panel on open; `Esc` closes; body scroll locked via `useLockBodyScroll`.
- Props: `open`, `onClose`, `title`, `subtitle?`, `children`, `footer?`, `zIndexClass` (so Book = z-40, Payment = z-50).
- Always mounted while `open`; slide-up on open. (Closing may unmount immediately — no exit animation required.)

### `Avatar`
- 64×64, **20px** corner radius, background = tint color token (`sky` → `--color-avatar-sky`, `lavender` → `--color-avatar-lavender`), simple flat SVG character inside. A **verified badge** overlays bottom-right: 22px white circle with 2px `bg` ring, `ShieldCheck` icon (14px, `--color-phonepe`).
- Detail-screen profile uses the same Avatar at 72×72.

## 7. Screen specifications

### Screen 1 — Home (`/`)

Vertical stack (top → bottom). Orange glow (`--gradient-glow-orange`, height ~420px) sits absolutely behind the top of the page content.

1. `AppBar`, `DemoBanner`
2. `CoBrandRow` — centered, margin-top 20
3. Heading block (px 20, margin-top 24)
   - Title **"Find your Tutor"**, Display style; the word **Tutor** is `font-serif italic` in `--color-orange`.
   - Subtitle: caption-large (15px) `fg-muted`, margin-top 6.
4. `SearchBar` (margin-top 20): `Input`-style, height 52, `--radius-full`, leading `Search` icon 20px; below it consent text caption `fg-subtle`, margin-top 10.
5. `CategoryChips` (margin-top 16)
6. `FilterRow` (margin-top 12): 3 `Dropdown`s (`filter` variant): Language / Budget / Exp.
7. `TutorList` (margin-top 20), cards gap 16, container padding-bottom 120px.

**`TutorCard`** (whole card is a `Link` to `/tutors/{id}`):
- `bg-surface`, 1px border, `--radius-lg`, overflow hidden.
- Top section padding 16: row → `Avatar` (64) · column (gap 4):
  - Line 1: **name** (18px / 700) + `Badge` (if any), wraps if needed
  - Line 2: headline (subject) 15px `fg-muted`
  - Line 3: `Star` icon (14px filled `--color-amber`) · **rating** (15px / 700) · `(reviewCount)` `fg-muted` · `·` · `{years}y exp` `fg-muted`
- Language tags row (margin-top 12, padding-left aligned under the text column or full-width under avatar — **full width under the avatar row**): small pills `bg-surface-2`, 12px, `fg-muted`, px 10, height 24, `--radius-sm`.
- Divider (1px `--color-border`), then footer row padding 16, space-between: **price** `₹400` (24px / 800) + `/hr` (14px `fg-muted`, baseline) · `Button` primary md **"Book Class"**.
- Entrance animation: fade-up, staggered.
- Empty result: centered `fg-muted` text (see content).

### Screen 2 — Tutor Detail (`/tutors/[id]`)

Purple glow (`--gradient-glow-purple`) behind the top. Page `padding-bottom: 140px` (BookingBar clearance).

1. `AppBar`, `DemoBanner`
2. `TutorHeader` (sticky just below the AppBar region: `top: 56px`, z 20, `bg` 85% + blur, bottom border): 
   - Square back button 44×44 (`bg-surface`, 1px border, `--radius-md`, `ChevronLeft`) → `router.back()`; 
   - Column: **name** 16px / 700, **headline** 14px `fg-muted`.
3. Profile block (px 20, py 20): `Avatar` 72 + column: name (22px / 700) + `Badge`; rating row (same as card); language tag pills.  *(Assumed block — see content doc note.)*
4. `AboutSection`: top divider; heading **About** (20 / 700); paragraph 16px / 26px `fg-muted`-lighter (`#D4D4D8`).
5. `SubjectPricing`: top divider; header row: heading **Subjects & Pricing** + right caption "60 mins per session" (`fg-subtle`); then `RadioCard`s stacked, gap 12.
6. `AvailabilitySection`: top divider; heading **Availability**; day chips row (Mon–Sun, gap 8, each `Chip` shape but compact height 40, px 14): **available** days = white background `#FFFFFF`, text `#0A0A0B`, 700; **unavailable** days = `bg-surface`, `fg-subtle`, opacity .6, not interactive; below (margin-top 12): time-slot pills (clock icon + text) wrapping in a row, `bg-surface`, 1px border, `--radius-md`, height 48, px 14.
7. `BookingBar` (fixed bottom, z 30): bg `rgba(10,10,11,0.9)` + blur, top border, padding 12px 16px + safe-area. Row (gap 12): subject selector `flex-1` (`Dropdown` `bar` variant, opens upward, height 56: **"{subject}"** 15px / 700, then `₹{price}/session` 14px `fg-muted`, chevron right) · `Button` primary lg **"Book"** (width ~104px).

Subject selection in `SubjectPricing` and the `BookingBar` dropdown are **two controls for the same state**.

### Screen 3 & 4 — "Book a Class" sheet (`BottomSheet`, z-40)

- Header: **Book a Class** (22px / 700) + subtitle `"{tutor} · {subject}"` (14px `fg-muted`); right: close button 44×44 square (`X` icon, `bg-surface-2`, 1px border, `--radius-md`).
- Body (px 20, py 20, gap 20, `padding-bottom: 96px` so the last fields clear the chat button):
  1. Row (2 columns, gap 12): **FIRST NAME** (empty, placeholder "Enter your first name") · **LAST NAME** (empty, placeholder "Enter your last name")
  2. **EMAIL** — editable, `type="email"`, placeholder "Enter your email address"; after the first blur, an invalid value shows "Enter a valid email address"
  3. **PHONE** — editable, numeric, max 10 digits, `+91` prefix, placeholder "Enter 10-digit mobile number"; after the first blur, an invalid value shows "Enter a valid 10-digit mobile number"
  4. **SESSIONS PER WEEK** `Stepper` (default 2) + helper "1–7 sessions per week"
  5. **PREFERRED TIME** — `Dropdown` (`field` variant), empty by default with placeholder "Select a time slot"; options = tutor's time slots; `aria-label="Preferred time"`; no clear row
  6. `BookingSummary` card (see below)
- Footer (fixed, padding 16 + safe-area, top border): `Button` primary lg, full width. **Disabled label:** "Fill all details to continue" (enabled only when first name, last name, valid email, valid phone and a time slot are set). **Enabled label:** "Continue to Pay".
- **Screen 3** = sheet opened (top of body visible, summary partly hidden behind footer). **Screen 4** = the same sheet scrolled so the summary is fully visible.

**`BookingSummary`**: `--gradient-summary` bg, 1px `--color-purple-border`, `--radius-lg`, padding 20.
- Overline **1-MONTH SUMMARY** in `--color-purple-text`.
- Row 1 (margin-top 12): `8× Mathematics` (16px, left) ... `8 sessions` (16px `fg-muted`, right)
- Row 2 (margin-top 8): `₹400 × 8` (16px `fg-muted`, left) ... **`₹3,200`** (26px / 800 `--color-purple-text`, right)
- Footnote (margin-top 12): "Classes are booked for 1 month at a time" (13px `fg-subtle`)

### Screen 5 — Payment sheet (`BottomSheet`, z-50, stacked over the Book sheet)

- No drag handle title area; instead a floating circular close button (40×40, `bg rgba(255,255,255,0.14)`, `X` white 18px, `aria-label="Close payment"`) at top-right of the sheet, 16px from edges.
- Sheet padding 16. Inside, a **gateway card** (`bg-surface`, 1px border, `--radius-lg`, padding 20):
  1. Header row (space-between): `NslWordmark` · amount pill (`bg-surface-3`, `--radius-sm`, px 14 py 8, 16px / 700, e.g. `₹3200.00`). Divider below.
  2. Payment-method tile (margin-top 20): 88×88, `bg-surface-2`, 2px border `rgba(255,255,255,0.85)`, `--radius-lg`, centered 64px circle `--color-phonepe` with white "पे" (700, 28px). Divider below (margin-top 20).
  3. Overline **ORDER SUMMARY** (margin-top 20).
  4. Rows (space-between, margin-top 14): **Description** (muted label) ↔ value (right aligned, 15px / 600, single line with ellipsis, max 60% width); **Customer** ↔ the email typed in the Book sheet.
  5. Divider, then row **Total** (16px / 700) ↔ **`₹3200.00`** (22px / 800).
- Footer (outside the card, padding 16 + safe-area): `Button` primary lg full width **"Pay Now"**; below it (margin-top 12) centered row: `Lock` icon 14px + "Secured by NSLPay · 256-bit encryption" (13px, `fg-subtle`).
- `NslWordmark`: three vertical rounded bars (heights 18/22/26px, 4px wide, `#FFFFFF` at 55%/75%/100%) + text **NSL** (800, 26px, white). Inline SVG/CSS.

## 8. States checklist

| Element | Required states |
|---|---|
| Button | default, pressed, disabled, focus-visible |
| Chip | inactive, active, focus-visible |
| Input / Dropdown | default, focus, open (Dropdown), error (Input) |
| RadioCard | unselected, selected |
| Day chip | available, unavailable |
| Stepper | normal, at-min, at-max |
| BottomSheet | closed, open (animated in) |
| Home list | with results, empty |

## 9. Responsive & accessibility

- Verify at **360, 390, 430px** widths and a desktop width (container centered, no horizontal scroll). Long text truncates; layouts never overflow.
- Contrast: all text ≥ WCAG AA against its background (muted `#A1A1AA` on `#0A0A0B` passes).
- Every interactive element reachable by keyboard; visible orange focus ring; sheets trap focus (at minimum: focus moves in on open, returns to the trigger on close) and close on `Esc`.
- Provide `lang="en"`, page `<title>` "HomeGuru", dark `color-scheme` (`color-scheme: dark`), `theme-color` `#0A0A0B`.

## 10. Don'ts

- No light backgrounds, no white cards, no blue app bar, no red solid banner (use the gradient strip).
- No new colors outside the token table; no raw hex in components.
- No emojis in the UI. No stock photos. No external fonts/images by URL.
- No extra decorative elements that are not described here (no coin counters, no POP logo, no "POPcoins", no scan button).
- Don't change any HomeGuru wording to POP wording — only the **look** is POP.
