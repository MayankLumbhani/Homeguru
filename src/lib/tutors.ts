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
