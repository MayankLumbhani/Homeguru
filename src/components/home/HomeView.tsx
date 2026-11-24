"use client";

import { useMemo, useState } from "react";
import { CoBrandRow } from "@/components/brand/CoBrandRow";
import { CategoryChips } from "@/components/home/CategoryChips";
import { FilterRow } from "@/components/home/FilterRow";
import { SearchBar } from "@/components/home/SearchBar";
import { TutorList } from "@/components/home/TutorList";
import { BottomNav } from "@/components/layout/BottomNav";
import { CONTENT } from "@/data/content";
import { filterTutors } from "@/lib/tutors";
import type { BudgetFilter, CategoryId, ExperienceFilter, Tutor, TutorFilters } from "@/types";

interface HomeViewProps {
  tutors: Tutor[];
}

export function HomeView({ tutors }: HomeViewProps) {
  const [filters, setFilters] = useState<TutorFilters>({
    query: "",
    category: "all",
    language: "",
    budget: "",
    experience: "",
  });

  const results = useMemo(() => filterTutors(tutors, filters), [tutors, filters]);

  return (
    <div className="relative pb-[120px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-glow-orange"
      />
      <div className="relative">
        <div className="mt-5 flex justify-center">
          <CoBrandRow />
        </div>

        <div className="mt-6 px-5">
          <h1 className="text-[32px] font-extrabold leading-9 tracking-[-0.02em] text-fg">
            {CONTENT.home.titleLead}
            <span className="font-serif font-normal italic text-orange">
              {CONTENT.home.titleAccent}
            </span>
          </h1>
          <p className="mt-1.5 text-[15px] text-fg-muted">{CONTENT.home.subtitle}</p>
        </div>

        <SearchBar
          value={filters.query}
          onChange={(query) => setFilters((current) => ({ ...current, query }))}
        />

        <div className="mt-4">
          <CategoryChips
            active={filters.category}
            onChange={(category: CategoryId) => setFilters((current) => ({ ...current, category }))}
          />
        </div>

        <div className="mt-3">
          <FilterRow
            language={filters.language}
            budget={filters.budget}
            experience={filters.experience}
            onLanguage={(language) => setFilters((current) => ({ ...current, language }))}
            onBudget={(budget: BudgetFilter) => setFilters((current) => ({ ...current, budget }))}
            onExperience={(experience: ExperienceFilter) =>
              setFilters((current) => ({ ...current, experience }))
            }
          />
        </div>

        <TutorList tutors={results} />
      </div>

      <BottomNav />
    </div>
  );
}
