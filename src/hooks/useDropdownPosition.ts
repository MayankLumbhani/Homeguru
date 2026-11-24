"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type DropdownPlacement = "auto" | "top" | "bottom";
export type DropdownVariant = "filter" | "field" | "bar";

export interface DropdownPosition {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  maxHeight: number;
  side: "top" | "bottom";
}

interface UseDropdownPositionArgs {
  triggerRef: RefObject<HTMLElement | null>;
  open: boolean;
  variant: DropdownVariant;
  placement: DropdownPlacement;
  optionCount: number;
  hasClear: boolean;
}

function computePosition(
  trigger: HTMLElement,
  variant: DropdownVariant,
  placement: DropdownPlacement,
  optionCount: number,
  hasClear: boolean,
): DropdownPosition {
  const rect = trigger.getBoundingClientRect();
  const shell = document.querySelector("[data-app-shell]")?.getBoundingClientRect();
  const shellLeft = shell ? shell.left : 0;
  const shellRight = shell ? shell.right : window.innerWidth;

  const width = variant === "filter" ? Math.max(rect.width, 208) : rect.width;
  const left = Math.min(Math.max(rect.left, shellLeft + 12), shellRight - 12 - width);

  const spaceBelow = window.innerHeight - rect.bottom - 12;
  const spaceAbove = rect.top - 12;
  const estimatedHeight = optionCount * 48 + 12 + (hasClear ? 49 : 0);

  const side: "top" | "bottom" =
    placement === "top"
      ? "top"
      : placement === "bottom"
        ? "bottom"
        : spaceBelow >= Math.min(240, estimatedHeight) || spaceBelow >= spaceAbove
          ? "bottom"
          : "top";

  if (side === "bottom") {
    return {
      top: rect.bottom + 8,
      left,
      width,
      maxHeight: Math.max(120, Math.min(280, spaceBelow - 8)),
      side,
    };
  }

  return {
    bottom: window.innerHeight - rect.top + 8,
    left,
    width,
    maxHeight: Math.max(120, Math.min(280, spaceAbove - 8)),
    side,
  };
}

export function useDropdownPosition({
  triggerRef,
  open,
  variant,
  placement,
  optionCount,
  hasClear,
}: UseDropdownPositionArgs): DropdownPosition | null {
  const [position, setPosition] = useState<DropdownPosition | null>(null);

  useLayoutEffect(() => {
    if (!open) return;

    function update() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      setPosition(computePosition(trigger, variant, placement, optionCount, hasClear));
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, triggerRef, variant, placement, optionCount, hasClear]);

  return position;
}
