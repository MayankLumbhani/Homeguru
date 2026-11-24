# App Workflow, Content & Tasks

> Source of truth for **flow, state, exact content, data, and the build order**.
> Visual design is in `UI_UX_GUIDELINES.md`. Architecture and rules are in `README.md`.

---

## 1. User flow

```
[Screen 1] Home  /
   │  tap a tutor card  OR  tap "Book Class"
   ▼
[Screen 2] Tutor Detail  /tutors/[id]
   │  tap "Book"
   ▼
[Screen 3/4] Book a Class sheet  (disabled until form valid)
   │  tap "Continue to Pay"
   ▼
[Screen 5] Payment sheet (stacked on top of Book sheet)
   │  "Pay Now" → no action in this UI-only build
   │  close (X / backdrop / Esc) → back to Book sheet
```

Closing the Book sheet (X / backdrop / Esc) returns to Tutor Detail. The browser/back button on the Detail page returns to Home.

## 2. State machine (Tutor Detail)

```ts
type SheetState = "none" | "book" | "payment";
```

| From | Event | To | Notes |
|---|---|---|---|
| `none` | tap **Book** | `book` | |
| `book` | tap X / backdrop / `Esc` | `none` | form values are kept |
| `book` | tap **Continue to Pay** (only when `canContinue`) | `payment` | Book sheet stays mounted underneath |
| `payment` | tap X / backdrop / `Esc` | `book` | |
| `payment` | tap **Pay Now** | `payment` | no-op; keep `// TODO(backend)` comment |

**Form state (`useBookingForm`)** — initial values:

| Field | Initial | Editable |
|---|---|---|
| `firstName` | `""` (placeholder "Enter your first name") | yes |
| `lastName` | `""` (placeholder "Enter your last name") | yes |
| `email` | `""` (placeholder "Enter your email address") | yes, validated |
| `phone` | `""` (placeholder "Enter 10-digit mobile number", `+91` prefix) | yes, digits only (max 10), validated |
| `sessionsPerWeek` | `2` (min 1, max 7) | via stepper |
| `preferredTime` | `""` (dropdown placeholder "Select a time slot") | via dropdown |

**Derived values:**
- `totalSessions = sessionsPerWeek × 4`
- `totalPrice = selectedSubject.price × totalSessions`
- `canContinue = firstName.trim() !== "" && lastName.trim() !== "" && isEmailValid && isPhoneValid && preferredTime !== ""`

Email and phone are validated with `src/lib/validation.ts` (`isValidEmail`, `isValidPhone`); `setPhone` always runs `sanitizePhone` (strip non-digits, cap at 10). Error messages appear only after the field has been blurred at least once.

**Worked example (must match screenshots):** Mathematics ₹400, 2 sessions/week → 8 sessions → `₹400 × 8` = **₹3,200** in the summary and **₹3200.00** in the payment sheet. Payment description: `8x Mathematics with Priya Sharma`.

**Changing the subject** (radio list or bottom-bar dropdown) updates: bottom-bar label/price, sheet subtitle, summary lines, payment description and totals. **Changing sessions/week** updates the summary. The preferred-time options come from the tutor's `availability.slots`; if the subject changes, `preferredTime` is kept.

## 3. Home filtering rules

- Pure client-side filtering via `filterTutors()` (§6.5). All criteria combine with AND.
- Search matches (case-insensitive substring) tutor name, headline, any subject name, any language.
- Category chip `All` shows everything. Other chips match `tutor.category`.
- Filter dropdowns: selecting an option applies that filter immediately; the **Clear selection** row (visible only while a value is selected) resets that filter to empty.
- If nothing matches, show the empty-state text (§4.1) in place of the list.

## 4. Exact content (use verbatim — copy exactly, including punctuation and symbols)

Symbols: `₹` rupee · `×` multiplication sign (U+00D7) in the summary · `x` plain letter in the payment description · `–` en dash in time ranges and "1–7" · `·` middle dot · `…` ellipsis character · `-` plain hyphen in "Class 6-12" and "1-MONTH".

### 4.1 Global & Home

| Key | Text |
|---|---|
| App title | `HomeGuru` |
| Demo banner | `This is a demo application for simulation purpose only.` |
| Co-brand | `HOMEGURU` × `PhonePe` |
| Home title | `Find your Tutor` (word `Tutor` styled as accent) |
| Home subtitle | `Best qualified tutors matched to your needs` |
| Search placeholder | `Search by name, subject or language…` |
| Search consent | `By searching, you agree to share your PhonePe profile with HomeGuru to personalise your experience.` |
| Category chips | `All`, `School Education`, `Languages`, `Music & Dance`, `Tech & Coding` ⚠ *(see assumptions)* |
| Filter labels | `Language`, `Budget`, `Exp.` |
| Bottom nav | `Home`, `Bookings`, `About` |
| Card CTA | `Book Class` |
| Price suffix | `/hr` |
| Empty state ⚠ | `No tutors match your search.` |

### 4.2 Tutor Detail

| Key | Text |
|---|---|
| Section headings | `About`, `Subjects & Pricing`, `Availability` |
| Pricing caption | `60 mins per session` |
| Bar button | `Book` |
| Bar price format | `₹400/session` (name bold, price muted) |
| Day labels | `Mon` `Tue` `Wed` `Thu` `Fri` `Sat` `Sun` |

### 4.3 Book a Class sheet

| Key | Text |
|---|---|
| Title | `Book a Class` |
| Subtitle format | `Priya Sharma · Mathematics` |
| Labels | `FIRST NAME`, `LAST NAME`, `EMAIL`, `PHONE`, `SESSIONS PER WEEK`, `PREFERRED TIME` |
| First name placeholder | `Enter your first name` |
| Last name placeholder | `Enter your last name` |
| Email placeholder | `Enter your email address` |
| Email error | `Enter a valid email address` |
| Phone prefix | `+91` |
| Phone placeholder | `Enter 10-digit mobile number` |
| Phone error | `Enter a valid 10-digit mobile number` |
| Preferred time placeholder | `Select a time slot` |
| Dropdown clear row | `Clear selection` |
| Stepper helper | `1–7 sessions per week` |
| Summary overline | `1-MONTH SUMMARY` |
| Summary line 1 | `8× Mathematics` ↔ `8 sessions` |
| Summary line 2 | `₹400 × 8` ↔ `₹3,200` |
| Summary footnote | `Classes are booked for 1 month at a time` |
| Footer (disabled) | `Fill all details to continue` |
| Footer (enabled) ⚠ | `Continue to Pay` |

### 4.4 Payment sheet

| Key | Text |
|---|---|
| Gateway | `NSL` (wordmark) |
| Amount pill | `₹3200.00` |
| Overline | `ORDER SUMMARY` |
| Row labels | `Description`, `Customer`, `Total` |
| Description | `8x Mathematics with Priya Sharma` (CSS-truncated with ellipsis like the screenshot) |
| Customer | the email typed in the Book sheet (e.g. `aarav@example.com`) |
| Total | `₹3200.00` |
| Button | `Pay Now` |
| Footer note | `Secured by NSLPay · 256-bit encryption` |

### 4.5 Assumptions (⚠) — not visible in the screenshots, kept minimal

1. **5th category chip** is cut off in the screenshot → named `Tech & Coding` so Arjun Mehta (Python & AI) has a category.
2. **Enabled button label** `Continue to Pay` (only the disabled label was visible).
3. **Empty-state** text for zero search results.
4. **Arjun Mehta's detail page** (about text, subjects, availability) was not shown → minimal placeholder data, marked `// ASSUMED` in `tutors.ts`.
5. **Profile block** at the top of Tutor Detail (avatar, rating, languages) — the screenshot starts below it; it reuses data already shown on the Home card.
6. Filter dropdown **options** are derived from the tutor data.
7. **Pay Now** has no behavior.
8. **Post-fix form decisions:** all six fields are user-entered and start empty; placeholders are listed in §4.3; phone shows a `+91` prefix and accepts digits only (max 10); email follows `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` and phone follows `/^[6-9]\d{9}$/`; validation errors appear after the first blur; dropdowns are custom listboxes with a "Clear selection" row in the filters; the old PhonePe helper texts were removed because the fields are no longer prefilled from PhonePe.

These are the only inventions allowed. Do not add anything else.

## 5. Avatars

Create two small, simple flat-illustration SVGs (a friendly cartoon head-and-shoulders, ~120×120 viewBox, transparent background — the tinted tile color comes from `Avatar`):
- `public/avatars/priya-sharma.svg` — elderly-looking cartoon person with round glasses and gray hair (matches the screenshot's avatar style), on transparent background.
- `public/avatars/arjun-mehta.svg` — cartoon person with a hair bun and a plaid/yellow-orange top.

Hand-written inline-shape SVG only (circles, paths, rects). No external assets. `Avatar` must show the **initials** (white, 700) if the image fails to load.

## 6. Ready-to-paste code

> These files are exact. Create them as written. All paths are under `src/`.

### 6.1 `types/index.ts`

```ts
export type CategoryId =
  | "all"
  | "school-education"
  | "languages"
  | "music-dance"
  | "tech-coding";

export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type TutorBadge = "Top Rated" | "Popular";

export type AvatarTint = "sky" | "lavender";

export type BudgetFilter = "" | "under-500" | "500-plus";

export type ExperienceFilter = "" | "5-plus" | "8-plus";

export type SheetState = "none" | "book" | "payment";

export interface Subject {
  id: string;
  name: string;
  price: number;
}

export interface Tutor {
  id: string;
  name: string;
  headline: string;
  badge?: TutorBadge;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  languages: string[];
  hourlyRate: number;
  category: Exclude<CategoryId, "all">;
  avatar: { src: string; tint: AvatarTint };
  about: string;
  subjects: Subject[];
  availability: { days: DayKey[]; slots: string[] };
}

export interface TutorFilters {
  query: string;
  category: CategoryId;
  language: string;
  budget: BudgetFilter;
  experience: ExperienceFilter;
}
```

### 6.2 `data/tutors.ts`

```ts
import type { Tutor } from "@/types";

export const TUTORS: Tutor[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    headline: "Mathematics",
    badge: "Top Rated",
    rating: 4.9,
    reviewCount: 312,
    experienceYears: 8,
    languages: ["Hindi", "English"],
    hourlyRate: 400,
    category: "school-education",
    avatar: { src: "/avatars/priya-sharma.svg", tint: "sky" },
    about:
      "8 years of experience teaching Maths and Science to students from Class 6-12. Known for making complex concepts simple and building strong fundamentals.",
    subjects: [
      { id: "mathematics", name: "Mathematics", price: 400 },
      { id: "physics", name: "Physics", price: 420 },
      { id: "science", name: "Science", price: 380 },
    ],
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      slots: ["6:00 AM – 8:00 AM", "5:00 PM – 8:00 PM"],
    },
  },
  // ASSUMED: only the Home-card fields below are from the screenshots;
  // about / subjects / availability are minimal placeholders.
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    headline: "Python & AI",
    badge: "Popular",
    rating: 4.8,
    reviewCount: 198,
    experienceYears: 6,
    languages: ["English", "Gujarati"],
    hourlyRate: 600,
    category: "tech-coding",
    avatar: { src: "/avatars/arjun-mehta.svg", tint: "lavender" },
    about: "6 years of experience teaching Python and AI.", // ASSUMED
    subjects: [{ id: "python-ai", name: "Python & AI", price: 600 }], // ASSUMED
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"], // ASSUMED
      slots: ["6:00 PM – 9:00 PM"], // ASSUMED
    },
  },
];
```

### 6.3 `data/content.ts`

```ts
import type { BudgetFilter, CategoryId, DayKey, ExperienceFilter } from "@/types";

export const CONTENT = {
  app: {
    title: "HomeGuru",
    demoBanner: "This is a demo application for simulation purpose only.",
  },
  home: {
    titleLead: "Find your ",
    titleAccent: "Tutor",
    subtitle: "Best qualified tutors matched to your needs",
    searchPlaceholder: "Search by name, subject or language…",
    searchConsent:
      "By searching, you agree to share your PhonePe profile with HomeGuru to personalise your experience.",
    emptyState: "No tutors match your search.",
    bookClass: "Book Class",
    perHour: "/hr",
  },
  nav: { home: "Home", bookings: "Bookings", about: "About" },
  detail: {
    about: "About",
    subjectsAndPricing: "Subjects & Pricing",
    sessionLength: "60 mins per session",
    availability: "Availability",
    book: "Book",
    perSession: "/session",
  },
  book: {
    title: "Book a Class",
    firstName: "FIRST NAME",
    lastName: "LAST NAME",
    email: "EMAIL",
    phone: "PHONE",
    sessionsPerWeek: "SESSIONS PER WEEK",
    preferredTime: "PREFERRED TIME",
    firstNamePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    emailPlaceholder: "Enter your email address",
    phonePlaceholder: "Enter 10-digit mobile number",
    phonePrefix: "+91",
    emailError: "Enter a valid email address",
    phoneError: "Enter a valid 10-digit mobile number",
    preferredTimePlaceholder: "Select a time slot",
    sessionsHelper: "1–7 sessions per week",
    summaryTitle: "1-MONTH SUMMARY",
    summaryFootnote: "Classes are booked for 1 month at a time",
    ctaDisabled: "Fill all details to continue",
    ctaEnabled: "Continue to Pay",
  },
  payment: {
    orderSummary: "ORDER SUMMARY",
    description: "Description",
    customer: "Customer",
    total: "Total",
    payNow: "Pay Now",
    secured: "Secured by NSLPay · 256-bit encryption",
  },
  dropdown: {
    clear: "Clear selection",
  },
} as const;

export const CATEGORIES: ReadonlyArray<{ id: CategoryId; label: string }> = [
  { id: "all", label: "All" },
  { id: "school-education", label: "School Education" },
  { id: "languages", label: "Languages" },
  { id: "music-dance", label: "Music & Dance" },
  { id: "tech-coding", label: "Tech & Coding" },
];

export const FILTER_LABELS = {
  language: "Language",
  budget: "Budget",
  experience: "Exp.",
} as const;

export const LANGUAGE_OPTIONS: ReadonlyArray<string> = ["Hindi", "English", "Gujarati"];

export const BUDGET_OPTIONS: ReadonlyArray<{ value: Exclude<BudgetFilter, "">; label: string }> = [
  { value: "under-500", label: "Under ₹500/hr" },
  { value: "500-plus", label: "₹500/hr & above" },
];

export const EXPERIENCE_OPTIONS: ReadonlyArray<{
  value: Exclude<ExperienceFilter, "">;
  label: string;
}> = [
  { value: "5-plus", label: "5+ years" },
  { value: "8-plus", label: "8+ years" },
];

export const WEEK_DAYS: ReadonlyArray<DayKey> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
```

### 6.4 `lib/format.ts`, `lib/booking.ts`, `lib/cn.ts`, `lib/validation.ts`

```ts
// lib/format.ts
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 3200 -> "₹3,200" */
export function formatINR(value: number): string {
  return inr.format(value);
}

/** 3200 -> "₹3200.00" (payment sheet format, no grouping) */
export function formatINRPlain(value: number): string {
  return `₹${value.toFixed(2)}`;
}
```

```ts
// lib/booking.ts
export const WEEKS_PER_BOOKING = 4;
export const MIN_SESSIONS_PER_WEEK = 1;
export const MAX_SESSIONS_PER_WEEK = 7;
export const DEFAULT_SESSIONS_PER_WEEK = 2;

export function getTotalSessions(sessionsPerWeek: number): number {
  return sessionsPerWeek * WEEKS_PER_BOOKING;
}

export function getTotalPrice(pricePerSession: number, sessionsPerWeek: number): number {
  return pricePerSession * getTotalSessions(sessionsPerWeek);
}
```

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

```ts
// lib/validation.ts
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value);
}

export function sanitizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}
```

> After creating `format.ts`, verify in a quick check that `formatINR(3200) === "₹3,200"` and `formatINRPlain(3200) === "₹3200.00"`. If `Intl` returns a non-breaking space, strip it with `.replace(/ /g, "")`.

### 6.5 `lib/tutors.ts`

```ts
import { TUTORS } from "@/data/tutors";
import type { Tutor, TutorFilters } from "@/types";

export function getTutorById(id: string): Tutor | undefined {
  return TUTORS.find((tutor) => tutor.id === id);
}

export function filterTutors(tutors: Tutor[], filters: TutorFilters): Tutor[] {
  const query = filters.query.trim().toLowerCase();

  return tutors.filter((tutor) => {
    if (filters.category !== "all" && tutor.category !== filters.category) return false;
    if (filters.language && !tutor.languages.includes(filters.language)) return false;
    if (filters.budget === "under-500" && tutor.hourlyRate >= 500) return false;
    if (filters.budget === "500-plus" && tutor.hourlyRate < 500) return false;
    if (filters.experience === "5-plus" && tutor.experienceYears < 5) return false;
    if (filters.experience === "8-plus" && tutor.experienceYears < 8) return false;
    if (!query) return true;

    const haystack = [
      tutor.name,
      tutor.headline,
      ...tutor.subjects.map((subject) => subject.name),
      ...tutor.languages,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}
```

### 6.6 `hooks/useBookingForm.ts` (contract)

```ts
// Signature the rest of the code relies on. Implement with useState.
export interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sessionsPerWeek: number;
  preferredTime: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void; // always runs sanitizePhone()
  setSessionsPerWeek: (value: number) => void; // clamps to 1..7
  setPreferredTime: (value: string) => void;
  isEmailValid: boolean;
  isPhoneValid: boolean;
  totalSessions: number;
  totalPrice: number;
  canContinue: boolean;
}

export function useBookingForm(pricePerSession: number): BookingForm;
```

Initial state: every text field `""`, `sessionsPerWeek` = `DEFAULT_SESSIONS_PER_WEEK` (2), `preferredTime` `""`. Totals come only from `src/lib/booking.ts`; validity flags from `src/lib/validation.ts`.

`useLockBodyScroll(locked: boolean)` sets `document.body.style.overflow = "hidden"` while `locked`, and restores the previous value on cleanup.

## 7. Component contracts (props)

| Component | Props |
|---|---|
| `HomeView` | `{ tutors: Tutor[] }` |
| `SearchBar` | `{ value: string; onChange: (v: string) => void }` |
| `CategoryChips` | `{ active: CategoryId; onChange: (id: CategoryId) => void }` |
| `FilterRow` | `{ language: string; budget: BudgetFilter; experience: ExperienceFilter; onLanguage; onBudget; onExperience }` |
| `TutorList` | `{ tutors: Tutor[] }` (renders empty state when `[]`) |
| `TutorCard` | `{ tutor: Tutor; index: number }` (`index` drives the stagger delay) |
| `TutorDetailView` | `{ tutor: Tutor }` |
| `TutorHeader` | `{ tutor: Tutor }` |
| `AboutSection` | `{ about: string }` |
| `SubjectPricing` | `{ subjects: Subject[]; selectedId: string; onSelect: (id: string) => void }` |
| `AvailabilitySection` | `{ days: DayKey[]; slots: string[] }` |
| `BookingBar` | `{ subjects: Subject[]; selectedId: string; onSelect: (id: string) => void; onBook: () => void }` |
| `BookClassSheet` | `{ open: boolean; onClose: () => void; tutor: Tutor; subject: Subject; form: BookingForm; onContinue: () => void }` |
| `BookingSummary` | `{ subjectName: string; price: number; sessionsPerWeek: number }` |
| `PaymentSheet` | `{ open: boolean; onClose: () => void; tutorName: string; subjectName: string; customerEmail: string; totalSessions: number; totalPrice: number }` |
| `BottomSheet` | `{ open; onClose; title; subtitle?; children; footer?; zIndexClass; hideHeader?: boolean; ariaLabel?; bodyClassName? }` |
| `Button` | `{ variant?; size?; fullWidth?; disabled? } & ButtonHTMLAttributes` |
| `Chip` | `{ active?: boolean; disabled?: boolean } & ButtonHTMLAttributes` |
| `Badge` | `{ tone: "amber" \| "violet"; children }` |
| `Avatar` | `{ src: string; name: string; tint: AvatarTint; size?: 64 \| 72 }` |
| `Dropdown` | `{ value: string; onChange: (value: string) => void; options: { value: string; label: string; meta?: string }[]; ariaLabel: string; placeholder: string; variant: "filter" \| "field" \| "bar"; placement?: "auto" \| "top" \| "bottom"; allowClear?: boolean; clearLabel?: string; triggerContent?: ReactNode; className?: string }` |
| `Input` | `{ label: string; helper?: string; error?: string; prefix?: ReactNode } & InputHTMLAttributes<HTMLInputElement>` |
| `Stepper` | `{ value; min; max; onChange; ariaLabel }` |
| `RadioCard` | `{ label: string; price: string; selected: boolean; onSelect: () => void }` |

> `PaymentSheet` builds its strings as: description = `` `${totalSessions}x ${subjectName} with ${tutorName}` ``, amount = `formatINRPlain(totalPrice)`, customer = `customerEmail.trim()` (the email typed in the Book sheet).
> The `BottomSheet` for payment uses `hideHeader` and renders its own floating close button.

## 8. Ordered task list (build in this order; verify each before moving on)

Mark each task done only when its acceptance criteria pass.

| # | Task | Acceptance criteria |
|---|---|---|
| T0 | **Scaffold** with the setup commands in `README.md` §4; copy docs into `docs/`; delete boilerplate (default page content, unused svgs) | `npm run dev` shows an empty page; `lint` + `typecheck` pass |
| T1 | **Tokens, fonts, globals**: all tokens from `UI_UX_GUIDELINES.md` §3 in `globals.css`; Figtree + Instrument Serif in `layout.tsx`; dark `color-scheme`; keyframes (`fade-up`, `sheet-up`, `fade-in`); reduced-motion rule; viewport export | Token classes usable; body is `#0A0A0B`; fonts load |
| T2 | **Types, data, lib**: create §6.1–6.5 files exactly; `useLockBodyScroll`; `useBookingForm` per §6.6 | `typecheck` passes; `formatINR(3200)` → `₹3,200`; `formatINRPlain(3200)` → `₹3200.00` |
| T3 | **UI primitives**: `Button`, `Chip`, `Badge`, `Input`, `Stepper`, `RadioCard`, `Avatar`, `BottomSheet` per guidelines §6 + the 2 avatar SVGs (`Dropdown` / `DropdownPanel` arrive in T12) | All states in guidelines §8 reachable; keyboard accessible |
| T4 | **Shell**: `AppShell`, `AppBar`, `DemoBanner`, `ChatFab`, wire into `layout.tsx`; centered 430px container | Looks right at 390px and on desktop; FAB moves with route |
| T5 | **Brand**: `HomeGuruWordmark`, `PhonePeMark`, `NslWordmark`, `CoBrandRow` | Matches guidelines §5.5 |
| T6 | **Screen 1 Home**: `HomeView`, `SearchBar`, `CategoryChips`, `FilterRow`, `TutorCard`, `TutorList`, `BottomNav`, `page.tsx` | Matches screenshot 1 content; search + filters work; empty state works; cards link to detail |
| T7 | **Screen 2 Detail**: `TutorDetailView` (state), `TutorHeader`, `AboutSection`, `SubjectPricing`, `AvailabilitySection`, `BookingBar`, `[id]/page.tsx` with `generateStaticParams` + `notFound()`; `not-found.tsx` | Matches screenshot 2; subject radio ↔ bottom-bar dropdown stay in sync |
| T8 | **Screens 3–4 Book sheet**: `BookClassSheet`, `BookingSummary` | Initial state shows disabled "Fill all details to continue"; typing last name + choosing time enables "Continue to Pay"; summary shows `₹3,200` for defaults |
| T9 | **Screen 5 Payment sheet**: `PaymentSheet` | Opens over Book sheet; shows `₹3200.00`; close returns to Book sheet; FAB hidden behind it |
| T10 | **Polish & a11y**: focus rings, `Esc`, aria labels, entrance animations, safe-area, reduced motion; verify at 360/390/430/desktop | No overflow; keyboard flow OK |
| T11 | **QA pass**: go through the checklist in §9; run `lint`, `typecheck`, `build`; fix everything | Definition of done in `README.md` §10 fully ticked |
| T12 | **Post-fix**: replace native selects with the `Dropdown` / `DropdownPanel` / `useDropdownPosition` trio; make all booking fields user-entered with placeholders and email/phone validation; pass the typed email to the Payment sheet; sync docs | No `<select>` remains; empty form starts disabled; `Esc` closes only an open dropdown; `lint` + `typecheck` + `build` pass |

## 9. QA checklist (compare against the 5 screenshots)

**Screen 1** — [ ] Demo banner text exact · [ ] `HOMEGURU × PhonePe` row · [ ] "Find your Tutor" with italic accent · [ ] subtitle · [ ] search placeholder + consent text · [ ] 5 chips, first active · [ ] 3 filters Language/Budget/Exp. · [ ] Priya card: Top Rated, Mathematics, ★ 4.9 (312) · 8y exp, Hindi + English, ₹400/hr, Book Class · [ ] Arjun card: Popular, Python & AI, ★ 4.8 (198) · 6y exp, English + Gujarati, ₹600/hr · [ ] floating nav (Home active) + round chat button on the right

**Screen 2** — [ ] header "Priya Sharma / Mathematics" · [ ] About text exact · [ ] Subjects & Pricing with "60 mins per session"; Mathematics ₹400 (selected), Physics ₹420, Science ₹380 · [ ] Mon–Fri available, Sat/Sun muted · [ ] two time slots · [ ] bottom bar "Mathematics ₹400/session" + Book · [ ] chat button above bar

**Screen 3** — [ ] Book a Class / "Priya Sharma · Mathematics" · [ ] first and last name empty with placeholders "Enter your first name" / "Enter your last name" · [ ] editable email + phone, placeholders shown, `+91` prefix · [ ] invalid values show red errors only after blur · [ ] stepper shows 2, helper "1–7 sessions per week" · [ ] preferred time shows "Select a time slot" · [ ] disabled "Fill all details to continue"

**Screen 4** — [ ] scrolled: summary card `1-MONTH SUMMARY`, `8× Mathematics` / `8 sessions`, `₹400 × 8` / `₹3,200`, footnote · [ ] chat button visible over sheet

**Screen 5** — [ ] NSL wordmark + `₹3200.00` pill · [ ] PhonePe tile · [ ] ORDER SUMMARY: Description `8x Mathematics with Priya Sharma` (ellipsis), Customer = the typed email, Total `₹3200.00` · [ ] Pay Now · [ ] `Secured by NSLPay · 256-bit encryption` · [ ] round close button top-right

**Global** — [ ] everything dark, POP-style glows, orange pill CTAs · [ ] no blue bar, no light surfaces
