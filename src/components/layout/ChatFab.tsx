"use client";

import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

export function ChatFab() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] mx-auto max-w-[430px]">
      <button
        type="button"
        aria-label="Chat"
        style={{ bottom: isHome ? "max(16px, env(safe-area-inset-bottom))" : "104px" }}
        className="pointer-events-auto absolute right-4 flex h-14 w-14 items-center justify-center rounded-full bg-fab shadow-fab transition-transform duration-[120ms] active:scale-[0.98]"
      >
        <MessageSquare size={24} aria-hidden="true" className="text-white" />
      </button>
    </div>
  );
}
