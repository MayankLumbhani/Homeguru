"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label: string;
  helper?: string;
  error?: string;
  prefix?: ReactNode;
}

export function Input({ label, helper, error, prefix, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? helper;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-fg-subtle"
      >
        {label}
      </label>
      <div
        className={cn(
          "flex h-[52px] w-full items-center rounded-md border bg-surface-2 transition duration-150",
          error
            ? "border-danger focus-within:shadow-focus-danger"
            : "border-border focus-within:border-orange focus-within:shadow-focus",
        )}
      >
        {prefix ? (
          <>
            <span className="pl-4 pr-3 text-[15px] text-fg-muted">{prefix}</span>
            <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border-strong" />
          </>
        ) : null}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "h-full w-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-fg shadow-none ring-0 outline-none placeholder:text-fg-subtle focus:outline-none focus-visible:outline-none",
            prefix ? "px-3" : "px-4",
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <p id={messageId} role="alert" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : helper ? (
        <p id={messageId} className="mt-2 text-[13px] text-fg-subtle">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
