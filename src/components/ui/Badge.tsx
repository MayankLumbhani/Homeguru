import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  tone: "amber" | "violet";
  children: ReactNode;
  className?: string;
}

const TONES = {
  amber: "bg-amber-soft text-amber",
  violet: "bg-violet-soft text-purple-text",
} as const;

export function Badge({ tone, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center rounded-sm px-2.5 text-xs font-semibold",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
