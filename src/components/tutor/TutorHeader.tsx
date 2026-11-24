"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Tutor } from "@/types";

interface TutorHeaderProps {
  tutor: Tutor;
}

export function TutorHeader({ tutor }: TutorHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-14 z-20 flex items-center gap-3 border-b border-border bg-bg/85 px-4 py-2 backdrop-blur-md">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-fg transition-colors duration-150 hover:text-orange"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div className="min-w-0">
        <p className="truncate text-base font-bold leading-6 text-fg">{tutor.name}</p>
        <p className="truncate text-sm text-fg-muted">{tutor.headline}</p>
      </div>
    </div>
  );
}
