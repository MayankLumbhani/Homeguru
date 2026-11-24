"use client";

import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import type { KeyboardEvent, RefObject } from "react";
import type { DropdownPosition } from "@/hooks/useDropdownPosition";
import type { DropdownOption } from "@/components/ui/Dropdown";
import { cn } from "@/lib/cn";

interface DropdownPanelProps {
  panelRef: RefObject<HTMLDivElement | null>;
  position: DropdownPosition;
  ariaLabel: string;
  rows: ReadonlyArray<DropdownOption>;
  showClear: boolean;
  selectedValue: string;
  activeIndex: number;
  onSelect: (index: number) => void;
  onActivate: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export function DropdownPanel({
  panelRef,
  position,
  ariaLabel,
  rows,
  showClear,
  selectedValue,
  activeIndex,
  onSelect,
  onActivate,
  onKeyDown,
}: DropdownPanelProps) {
  return createPortal(
    <div
      ref={panelRef}
      role="listbox"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        width: position.width,
        maxHeight: position.maxHeight,
        transformOrigin: position.side === "bottom" ? "top center" : "bottom center",
      }}
      className="animate-dropdown no-scrollbar fixed z-[60] overflow-y-auto rounded-md border border-border-strong bg-dropdown p-1.5 shadow-dropdown backdrop-blur-xl"
    >
      {rows.map((row, index) => {
        const isClear = showClear && index === 0;
        const isSelected = !isClear && row.value === selectedValue;
        const isActive = index === activeIndex;

        const rowButton = (
          <button
            key={`${row.value}-${index}`}
            type="button"
            role="option"
            aria-selected={isSelected}
            data-index={index}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onActivate(index)}
            className={cn(
              "flex h-12 w-full items-center gap-2 rounded-[12px] px-3.5 text-left text-[15px]",
              isActive && "bg-surface-3",
              isClear ? "text-fg-muted" : isSelected ? "font-bold text-fg" : "font-medium text-fg",
            )}
          >
            <span className="min-w-0 flex-1 truncate">{row.label}</span>
            {row.meta ? (
              <span className="ml-auto shrink-0 text-sm text-fg-muted">{row.meta}</span>
            ) : null}
            {isClear ? null : (
              <span className="flex w-5 shrink-0 justify-center">
                {isSelected ? <Check size={18} className="text-orange" aria-hidden="true" /> : null}
              </span>
            )}
          </button>
        );

        if (!isClear) return rowButton;

        return (
          <div key="clear" className="mb-1 border-b border-border">
            {rowButton}
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
