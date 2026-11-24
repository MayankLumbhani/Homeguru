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
