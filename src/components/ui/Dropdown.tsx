"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { DropdownPanel } from "@/components/ui/DropdownPanel";
import {
  useDropdownPosition,
  type DropdownPlacement,
  type DropdownVariant,
} from "@/hooks/useDropdownPosition";
import { cn } from "@/lib/cn";

export interface DropdownOption {
  value: string;
  label: string;
  meta?: string;
}

export interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<DropdownOption>;
  ariaLabel: string;
  placeholder: string;
  variant: DropdownVariant;
  placement?: DropdownPlacement;
  allowClear?: boolean;
  clearLabel?: string;
  triggerContent?: ReactNode;
  className?: string;
}

const TRIGGER_BASE =
  "flex items-center justify-between gap-2 rounded-md border bg-surface-2 transition-[color,background-color,border-color,box-shadow,transform] duration-[120ms] focus-visible:border-orange focus-visible:shadow-focus active:scale-[0.99]";

const TRIGGER_VARIANTS: Record<DropdownVariant, string> = {
  filter: "h-12 min-w-0 flex-1 px-4 text-[15px]",
  field: "h-[52px] w-full px-4 text-[15px]",
  bar: "h-14 min-w-0 flex-1 px-4 text-left",
};

export function Dropdown({
  value,
  onChange,
  options,
  ariaLabel,
  placeholder,
  variant,
  placement = "auto",
  allowClear = false,
  clearLabel,
  triggerContent,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialIndexRef = useRef(0);

  const showClear = Boolean(allowClear && value !== "" && clearLabel);
  const rows = useMemo<ReadonlyArray<DropdownOption>>(
    () => (showClear ? [{ value: "", label: clearLabel ?? "" }, ...options] : options),
    [showClear, clearLabel, options],
  );

  const selected = options.find((option) => option.value === value);
  const hasValue = selected !== undefined;

  const position = useDropdownPosition({
    triggerRef,
    open,
    variant,
    placement,
    optionCount: options.length,
    hasClear: showClear,
  });
  const hasPosition = position !== null;

  function focusRow(index: number) {
    panelRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.focus();
  }

  function openDropdown() {
    const selectedIndex = rows.findIndex((row) => row.value === value);
    const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;
    initialIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);
    setOpen(true);
  }

  function selectRow(index: number) {
    const row = rows[index];
    if (!row) return;
    onChange(showClear && index === 0 ? "" : row.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveActive(delta: number) {
    if (rows.length === 0) return;
    const next = (activeIndex + delta + rows.length) % rows.length;
    setActiveIndex(next);
    focusRow(next);
  }

  function jumpTo(index: number) {
    setActiveIndex(index);
    focusRow(index);
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      openDropdown();
    }
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        jumpTo(0);
        break;
      case "End":
        event.preventDefault();
        jumpTo(rows.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectRow(activeIndex);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (!open || !hasPosition) return;
    focusRow(initialIndexRef.current);
  }, [open, hasPosition]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          TRIGGER_BASE,
          TRIGGER_VARIANTS[variant],
          open
            ? "border-[1.5px] border-orange shadow-focus"
            : variant === "filter" && hasValue
              ? "border-orange/50"
              : "border-border",
          className,
        )}
      >
        {variant === "bar" ? (
          <span className="min-w-0 flex-1 text-left">{triggerContent}</span>
        ) : (
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              hasValue ? "text-fg" : "text-fg-subtle",
              variant === "filter" && hasValue && "font-semibold",
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
        )}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-fg-subtle transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </button>
      {open && position ? (
        <DropdownPanel
          panelRef={panelRef}
          position={position}
          ariaLabel={ariaLabel}
          rows={rows}
          showClear={showClear}
          selectedValue={value}
          activeIndex={activeIndex}
          onSelect={selectRow}
          onActivate={setActiveIndex}
          onKeyDown={handlePanelKeyDown}
        />
      ) : null}
    </>
  );
}
