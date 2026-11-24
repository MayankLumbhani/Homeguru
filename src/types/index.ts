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
