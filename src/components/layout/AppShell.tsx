import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      data-app-shell
      className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-bg"
    >
      {children}
    </div>
  );
}
