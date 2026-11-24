import { cn } from "@/lib/cn";

interface RadioCardProps {
  label: string;
  price: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioCard({ label, price, selected, onSelect }: RadioCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex h-14 w-full items-center gap-3 rounded-md border px-4 text-left transition-colors duration-150",
        selected
          ? "border-[1.5px] border-orange bg-orange-tint"
          : "border-border bg-surface hover:border-border-strong",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-orange bg-orange" : "border-border-strong bg-transparent",
        )}
      >
        {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
      </span>
      <span className="flex-1 text-base font-semibold text-fg">{label}</span>
      <span className="text-base font-bold text-fg">{price}</span>
    </button>
  );
}
