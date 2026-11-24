"use client";

import { RadioCard } from "@/components/ui/RadioCard";
import { CONTENT } from "@/data/content";
import { formatINR } from "@/lib/format";
import type { Subject } from "@/types";

interface SubjectPricingProps {
  subjects: Subject[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SubjectPricing({ subjects, selectedId, onSelect }: SubjectPricingProps) {
  return (
    <section className="border-t border-border px-5 py-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[20px] font-bold leading-[26px] text-fg">
          {CONTENT.detail.subjectsAndPricing}
        </h2>
        <span className="text-[13px] text-fg-subtle">{CONTENT.detail.sessionLength}</span>
      </div>
      <div
        role="radiogroup"
        aria-label={CONTENT.detail.subjectsAndPricing}
        className="mt-4 flex flex-col gap-3"
      >
        {subjects.map((subject) => (
          <RadioCard
            key={subject.id}
            label={subject.name}
            price={formatINR(subject.price)}
            selected={subject.id === selectedId}
            onSelect={() => onSelect(subject.id)}
          />
        ))}
      </div>
    </section>
  );
}
