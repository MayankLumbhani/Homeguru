"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  ariaLabel: string;
}

const SIDE_BUTTON =
  "flex h-[52px] w-[52px] items-center justify-center rounded-md border border-border bg-surface-2 text-fg transition-colors duration-150 hover:text-orange disabled:cursor-not-allowed disabled:opacity-40";

export function Stepper({ value, min, max, onChange, ariaLabel }: StepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease sessions per week"
        className={SIDE_BUTTON}
      >
        <Minus size={20} aria-hidden="true" />
      </button>
      <div
        role="spinbutton"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            onChange(value + 1);
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            onChange(value - 1);
          }
        }}
        className={cn(
          "flex h-[52px] flex-1 items-center justify-center rounded-md border-2",
          "border-purple-border bg-purple-soft text-[22px] font-bold text-purple-text",
        )}
      >
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase sessions per week"
        className={SIDE_BUTTON}
      >
        <Plus size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
