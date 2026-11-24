"use client";

import { Search } from "lucide-react";
import { CONTENT } from "@/data/content";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mt-5 px-5">
      <div className="relative flex h-[52px] w-full items-center rounded-full border border-border bg-surface-2 transition duration-150 focus-within:border-orange focus-within:shadow-focus">
        <Search
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle"
        />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={CONTENT.home.searchPlaceholder}
          aria-label={CONTENT.home.searchPlaceholder}
          className="h-full w-full appearance-none border-0 bg-transparent pl-11 pr-4 text-[15px] text-fg shadow-none ring-0 outline-none placeholder:text-fg-subtle focus:border-0 focus:outline-none focus-visible:outline-none"
        />
      </div>
      <p className="mt-2.5 text-[13px] leading-[18px] text-fg-subtle">
        {CONTENT.home.searchConsent}
      </p>
    </div>
  );
}
