"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";
import { CONTENT } from "@/data/content";

export function AppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-1 border-b border-border bg-bg/80 px-2 backdrop-blur-md">
      <button
        type="button"
        onClick={isHome ? undefined : () => router.back()}
        aria-label="Go back"
        className="flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:text-orange"
      >
        <ArrowLeft size={24} aria-hidden="true" />
      </button>
      <span className="text-[20px] font-semibold text-fg">{CONTENT.app.title}</span>
      <button
        type="button"
        aria-label="Settings"
        className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:text-orange"
      >
        <Settings size={22} aria-hidden="true" />
      </button>
    </header>
  );
}
