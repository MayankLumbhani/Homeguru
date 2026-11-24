import { HomeGuruWordmark } from "@/components/brand/HomeGuruWordmark";
import { PhonePeMark } from "@/components/brand/PhonePeMark";

export function CoBrandRow() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2.5">
      <HomeGuruWordmark />
      <span aria-hidden="true" className="h-4 w-px bg-border-strong" />
      <span className="text-xs text-fg-subtle">×</span>
      <span aria-hidden="true" className="h-4 w-px bg-border-strong" />
      <PhonePeMark />
    </div>
  );
}
