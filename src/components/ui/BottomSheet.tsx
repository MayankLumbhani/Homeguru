"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/cn";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  zIndexClass: string;
  hideHeader?: boolean;
  ariaLabel?: string;
  bodyClassName?: string;
}

export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  zIndexClass,
  hideHeader = false,
  ariaLabel,
  bodyClassName,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useLockBodyScroll(open);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(
      "input:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex='0']",
    );
    (firstFocusable ?? panel)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 mx-auto max-w-[430px]", zIndexClass)}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-backdrop backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        className="animate-sheet-up absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-xl border-t border-border bg-sheet"
      >
        {hideHeader ? null : (
          <div className="shrink-0 px-5 pb-4 pt-3">
            <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-handle" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 id={titleId} className="text-[22px] font-bold leading-7 text-fg">
                  {title}
                </h2>
                {subtitle ? <p className="mt-1 text-sm text-fg-muted">{subtitle}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-fg transition-colors duration-150 hover:text-orange"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
        <div className={cn("no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5", bodyClassName)}>
          {children}
        </div>
        {footer ? (
          <div className="shrink-0 border-t border-border bg-sheet px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
