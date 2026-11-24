"use client";

import { CalendarDays, House, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTENT } from "@/data/content";
import { cn } from "@/lib/cn";

interface NavTab {
  label: string;
  icon: LucideIcon;
  active: boolean;
}

const TABS: NavTab[] = [
  { label: CONTENT.nav.home, icon: House, active: true },
  { label: CONTENT.nav.bookings, icon: CalendarDays, active: false },
  { label: CONTENT.nav.about, icon: User, active: false },
];

export function BottomNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px]">
      <nav
        aria-label="Main navigation"
        style={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
        className="pointer-events-auto absolute left-4 right-[88px] flex h-16 items-center rounded-full border border-border-strong bg-nav px-1.5 shadow-nav backdrop-blur-xl"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              aria-current={tab.active ? "page" : undefined}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-full transition-colors duration-150",
                tab.active ? "text-orange" : "text-fg-subtle",
              )}
            >
              {tab.active ? (
                <span aria-hidden="true" className="absolute inset-y-1.5 inset-x-1.5 rounded-full bg-surface-3" />
              ) : null}
              <Icon size={24} aria-hidden="true" className="relative" />
              <span className="relative text-xs font-semibold leading-4">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
