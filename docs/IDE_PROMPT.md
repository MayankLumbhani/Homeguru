# Master Prompt for Qoder / Cursor

> **How to use:** put `README.md`, `UI_UX_GUIDELINES.md`, `APP_WORKFLOW_AND_CONTENT.md` in the project's `docs/` folder (or attach them to the chat), then paste everything inside the box below as your first message.

---

````text
You are a senior frontend engineer. Build a complete, production-quality, UI-only Next.js app.

## PROJECT
Rebuild the "HomeGuru" tutor-booking app UI so that its entire theme and UI/UX is EXACTLY like the "POP" app (dark theme, glowing gradient backgrounds, rounded dark cards, orange gradient pill buttons, floating bottom navigation with a separate round button, bottom sheets). Keep HomeGuru's EXACT content (text, tutors, prices, labels). Only the look and feel changes to POP style.

- Framework: Next.js (latest stable) with the App Router, TypeScript strict, Tailwind CSS, lucide-react.
- NO database, NO backend, NO API routes, NO auth, NO env vars. UI only with static mock data.
- Build ONLY 5 screens: (1) Home, (2) Tutor Detail, (3) Book a Class bottom sheet, (4) the same sheet scrolled to the 1-MONTH SUMMARY, (5) Payment bottom sheet. Nothing else. No extra pages or features.

## SOURCE OF TRUTH — READ BEFORE WRITING ANY CODE
Read these three files completely, in this order. They are authoritative; follow them literally. Do not guess, do not improvise, do not "improve" anything they specify.
1. docs/README.md                      -> scope, stack, setup, folder structure, architecture, coding rules, definition of done
2. docs/UI_UX_GUIDELINES.md            -> design tokens, component specs, exact layout of all 5 screens, motion, accessibility
3. docs/APP_WORKFLOW_AND_CONTENT.md    -> user flow, state machine, EXACT text/data, ready-to-paste code files, ordered task list T0–T12, QA checklist

If two files ever seem to conflict, README.md wins for structure/rules, UI_UX_GUIDELINES.md wins for visuals, APP_WORKFLOW_AND_CONTENT.md wins for content/behavior. If something is truly not specified, choose the simplest option consistent with the docs and mention it in your final report. Do NOT stop to ask questions.

## HARD RULES (non-negotiable)
1. Create exactly the folder structure in README.md §6 — no extra files, no missing files.
2. Allowed dependencies ONLY: next, react, react-dom, tailwindcss (via create-next-app), lucide-react, clsx, tailwind-merge. Install nothing else (no framer-motion, no state libraries, no UI kits).
3. TypeScript strict. No `any`, no `@ts-ignore`, no non-null assertions.
4. One component per file, named exports (default exports only for Next special files page/layout/not-found). Max ~150 lines per component.
5. ALL UI strings come from src/data/content.ts or src/data/tutors.ts, copied VERBATIM from APP_WORKFLOW_AND_CONTENT.md §4 and §6 (including ₹, ×, –, ·, … and the exact placeholders and validation errors in §4.3). Never retype text from memory.
6. Use the exact code in APP_WORKFLOW_AND_CONTENT.md §6 for types, data, content, lib files. Create the hooks per §6.6.
7. Colors/radii/shadows/gradients ONLY via the design tokens in UI_UX_GUIDELINES.md §3 (defined in globals.css). No raw hex values inside components.
8. Currency only via formatINR / formatINRPlain. Booking math only via src/lib/booking.ts.
9. Mobile-first: centered container max 430px; fixed elements stay inside it. Use the z-index scale in README.md §7.5.
10. Server components by default; add 'use client' only where README.md §7.2 says (state/effects/handlers/usePathname).
11. In the dynamic route, `params` is a Promise: `params: Promise<{ id: string }>` and `await params`. Use generateStaticParams and notFound().
12. Accessibility: aria-labels on icon buttons, role="dialog" + aria-modal on sheets, Esc closes sheets, visible focus rings, prefers-reduced-motion respected.
13. No console.log, no commented-out code, no leftover TODOs (the only allowed comment is `// TODO(backend)` on the Pay Now button).
14. Do NOT build: Bookings/About pages, settings, chat, payment success screen, POPcoins/scan features, or anything not in the docs. Bottom-nav tabs Bookings/About, the gear icon, the chat button, and Pay Now are visual only.

## HOW TO WORK
Follow the ordered tasks T0 → T12 in APP_WORKFLOW_AND_CONTENT.md §8, strictly in order. After each task:
- run `npm run lint` and `npm run typecheck`, fix every error and warning before continuing;
- check the task's acceptance criteria;
- keep the app running (`npm run dev`) and make sure it never breaks between tasks.

Task summary (details and acceptance criteria are in the doc):
T0 scaffold + copy docs · T1 tokens/fonts/globals · T2 types/data/lib/hooks · T3 UI primitives + 2 avatar SVGs · T4 app shell (AppShell, AppBar, DemoBanner, ChatFab) · T5 brand components · T6 Home screen · T7 Tutor Detail screen · T8 Book a Class sheet + summary · T9 Payment sheet · T10 polish & accessibility · T11 QA + final build · T12 post-fix (custom dropdowns + editable validated booking form, docs sync).

## SETUP (T0)
```
npx create-next-app@latest homeguru-pop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd homeguru-pop
npm install lucide-react clsx tailwind-merge
```
If the project folder already exists, scaffold inside it instead. Add `"typecheck": "tsc --noEmit"` to package.json scripts. Remove all create-next-app boilerplate content.

## DESIGN IN ONE PARAGRAPH (details in the docs)
Near-black canvas (#0A0A0B), dark surfaces, white text, muted gray secondary text. Each screen has one big soft gradient glow at the top (orange on Home, purple on Detail). Cards have 24px radius with thin white-8% borders; sheets have 32px top radius. The only primary button style is an orange→red gradient pill with an orange glow shadow. Purple is the secondary accent (chat button, summary card, PhonePe). Headings use Figtree 800; the word "Tutor" in the Home title uses Instrument Serif italic in orange. Bottom navigation is a floating blurred pill (Home / Bookings / About) with a separate round purple chat button to its right. The red demo banner is a dark-red gradient strip, and there is NO blue app bar.

## THE 5 SCREENS (what must exist)
1. Home `/`: AppBar + demo banner, HOMEGURU × PhonePe co-brand row, "Find your Tutor", subtitle, search + consent text, category chips, Language/Budget/Exp. custom dropdowns (working, client-side, with a "Clear selection" row), tutor cards (Priya Sharma, Arjun Mehta) linking to /tutors/[id], floating bottom nav + chat button.
2. Tutor Detail `/tutors/[id]`: sticky name header, profile block, About, Subjects & Pricing (radio cards, synced with the bottom-bar subject dropdown), Availability (Mon–Fri active, Sat/Sun muted, two time slots), sticky bottom bar "Mathematics ₹400/session" + Book.
3. Book a Class sheet: first and last name empty with placeholders, editable email and phone (placeholder + validation error after blur, `+91` phone prefix), sessions-per-week stepper (default 2, 1–7), preferred time dropdown (empty, placeholder "Select a time slot"), purple 1-MONTH SUMMARY card, footer button "Fill all details to continue" (disabled) that becomes "Continue to Pay" only when first name, last name, a valid email, a valid 10-digit phone and a time slot are all set.
4. Same sheet scrolled to the summary: `8× Mathematics` / `8 sessions`, `₹400 × 8` / `₹3,200`, "Classes are booked for 1 month at a time".
5. Payment sheet stacked over the Book sheet: NSL wordmark, `₹3200.00` pill, PhonePe tile, ORDER SUMMARY (Description `8x Mathematics with Priya Sharma` truncated with ellipsis, Customer = the email typed in the form, Total `₹3200.00`), "Pay Now" (no action), "Secured by NSLPay · 256-bit encryption", round close button top-right. Closing it returns to the Book sheet.

## FINAL STEPS (T11)
1. Walk through the QA checklist in APP_WORKFLOW_AND_CONTENT.md §9 against every screen and fix every mismatch.
2. Verify at widths 360, 390, 430 and on desktop (centered container, no horizontal scroll).
3. Run `npm run lint`, `npm run typecheck`, `npm run build` — all must pass with zero errors and zero warnings.
4. Confirm the folder structure equals README.md §6 exactly and that the Definition of Done in README.md §10 is fully satisfied.

## FINAL REPORT FORMAT
When finished, reply with: (a) a checklist of T0–T12 marked done, (b) the output summary of lint/typecheck/build, (c) any place where you had to choose something not specified in the docs, (d) the list of files created. Keep it short.

Start now with T0. Read the three docs first.
````

---

## Optional: auto-load rules in the IDE

Create a tiny rules file so the IDE always reads the docs:

- **Qoder:** `.qoder/rules/project.md`
- **Cursor:** `.cursor/rules/project.mdc`

Content (same for both):

```text
Before changing any code, read docs/README.md, docs/UI_UX_GUIDELINES.md and docs/APP_WORKFLOW_AND_CONTENT.md.
They are the source of truth. Follow the folder structure, coding rules, design tokens and exact content defined there.
Do not add dependencies, files, features or screens that are not described in those docs.
```
