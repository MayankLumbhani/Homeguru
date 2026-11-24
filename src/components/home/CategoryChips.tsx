"use client";

import { Chip } from "@/components/ui/Chip";
import { CATEGORIES } from "@/data/content";
import type { CategoryId } from "@/types";

interface CategoryChipsProps {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5">
      {CATEGORIES.map((category) => (
        <Chip
          key={category.id}
          active={category.id === active}
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </Chip>
      ))}
    </div>
  );
}
