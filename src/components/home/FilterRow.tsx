"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import {
  BUDGET_OPTIONS,
  CONTENT,
  EXPERIENCE_OPTIONS,
  FILTER_LABELS,
  LANGUAGE_OPTIONS,
} from "@/data/content";
import type { BudgetFilter, ExperienceFilter } from "@/types";

interface FilterRowProps {
  language: string;
  budget: BudgetFilter;
  experience: ExperienceFilter;
  onLanguage: (value: string) => void;
  onBudget: (value: BudgetFilter) => void;
  onExperience: (value: ExperienceFilter) => void;
}

export function FilterRow({
  language,
  budget,
  experience,
  onLanguage,
  onBudget,
  onExperience,
}: FilterRowProps) {
  return (
    <div className="flex gap-2 px-5">
      <Dropdown
        variant="filter"
        value={language}
        onChange={onLanguage}
        ariaLabel={FILTER_LABELS.language}
        placeholder={FILTER_LABELS.language}
        options={LANGUAGE_OPTIONS.map((option) => ({ value: option, label: option }))}
        allowClear
        clearLabel={CONTENT.dropdown.clear}
      />
      <Dropdown
        variant="filter"
        value={budget}
        onChange={(value) => onBudget(value as BudgetFilter)}
        ariaLabel={FILTER_LABELS.budget}
        placeholder={FILTER_LABELS.budget}
        options={BUDGET_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
        allowClear
        clearLabel={CONTENT.dropdown.clear}
      />
      <Dropdown
        variant="filter"
        value={experience}
        onChange={(value) => onExperience(value as ExperienceFilter)}
        ariaLabel={FILTER_LABELS.experience}
        placeholder={FILTER_LABELS.experience}
        options={EXPERIENCE_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
        allowClear
        clearLabel={CONTENT.dropdown.clear}
      />
    </div>
  );
}
