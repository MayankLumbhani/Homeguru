"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { CONTENT } from "@/data/content";
import { formatINR } from "@/lib/format";
import type { Subject } from "@/types";

interface BookingBarProps {
  subjects: Subject[];
  selectedId: string;
  onSelect: (id: string) => void;
  onBook: () => void;
}

export function BookingBar({ subjects, selectedId, onSelect, onBook }: BookingBarProps) {
  const selected = subjects.find((subject) => subject.id === selectedId) ?? subjects[0];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px]">
      <div className="pointer-events-auto flex items-center gap-3 border-t border-border bg-bar px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <Dropdown
          variant="bar"
          placement="top"
          value={selected.id}
          onChange={onSelect}
          ariaLabel="Select subject"
          placeholder=""
          options={subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
            meta: `${formatINR(subject.price)}${CONTENT.detail.perSession}`,
          }))}
          triggerContent={
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-5 text-fg">{selected.name}</p>
              <p className="truncate text-sm leading-5 text-fg-muted">
                {formatINR(selected.price)}
                {CONTENT.detail.perSession}
              </p>
            </div>
          }
        />
        <Button size="lg" onClick={onBook} className="w-[104px] px-0">
          {CONTENT.detail.book}
        </Button>
      </div>
    </div>
  );
}
