import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
}

export function Chip({ active = false, className, disabled, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-150",
        "h-10 disabled:cursor-not-allowed disabled:opacity-60",
        active
          ? "border-transparent bg-cta bg-orange text-white"
          : "border-border bg-surface text-fg-muted hover:text-fg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
