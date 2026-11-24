import { Clock } from "lucide-react";
import { CONTENT, WEEK_DAYS } from "@/data/content";
import { cn } from "@/lib/cn";
import type { DayKey } from "@/types";

interface AvailabilitySectionProps {
  days: DayKey[];
  slots: string[];
}

export function AvailabilitySection({ days, slots }: AvailabilitySectionProps) {
  return (
    <section className="border-t border-border px-5 py-5">
      <h2 className="text-[20px] font-bold leading-[26px] text-fg">
        {CONTENT.detail.availability}
      </h2>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((day) => {
          const available = days.includes(day);
          return (
            <span
              key={day}
              className={cn(
                "flex h-10 items-center justify-center rounded-full text-sm",
                available
                  ? "bg-white font-bold text-bg"
                  : "bg-surface font-medium text-fg-subtle opacity-60",
              )}
            >
              {day}
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {slots.map((slot) => (
          <span
            key={slot}
            className="flex h-12 items-center gap-2 rounded-md border border-border bg-surface px-3.5 text-sm text-fg"
          >
            <Clock size={16} aria-hidden="true" className="text-fg-subtle" />
            {slot}
          </span>
        ))}
      </div>
    </section>
  );
}
