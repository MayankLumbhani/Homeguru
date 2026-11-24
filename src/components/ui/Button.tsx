import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  fullWidth?: boolean;
}

const BASE =
  "inline-flex items-center justify-center gap-2 font-bold transition duration-150 " +
  "active:scale-[0.98] disabled:cursor-not-allowed";

const VARIANTS = {
  primary: "bg-cta bg-orange text-white shadow-cta",
  secondary: "bg-surface-2 border border-border text-fg",
  ghost: "bg-transparent text-fg",
} as const;

const SIZES = {
  md: "h-11 px-5 text-[15px] rounded-full",
  lg: "h-14 px-6 text-base rounded-lg",
} as const;

const DISABLED =
  "disabled:bg-surface-3 disabled:bg-none disabled:text-fg-subtle disabled:shadow-none";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        BASE,
        VARIANTS[variant],
        SIZES[size],
        DISABLED,
        fullWidth ? "w-full" : "",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
