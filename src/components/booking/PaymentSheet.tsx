"use client";

import { Lock, X } from "lucide-react";
import { NslWordmark } from "@/components/brand/NslWordmark";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { CONTENT } from "@/data/content";
import { formatINRPlain } from "@/lib/format";

interface PaymentSheetProps {
  open: boolean;
  onClose: () => void;
  tutorName: string;
  subjectName: string;
  customerEmail: string;
  totalSessions: number;
  totalPrice: number;
}

export function PaymentSheet({
  open,
  onClose,
  tutorName,
  subjectName,
  customerEmail,
  totalSessions,
  totalPrice,
}: PaymentSheetProps) {
  const description = `${totalSessions}x ${subjectName} with ${tutorName}`;
  const amount = formatINRPlain(totalPrice);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      zIndexClass="z-50"
      hideHeader
      ariaLabel="Payment"
      bodyClassName="px-4 py-4"
      footer={
        <div>
          <Button
            size="lg"
            fullWidth
            onClick={() => {
              // TODO(backend)
            }}
          >
            {CONTENT.payment.payNow}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-fg-subtle">
            <Lock size={14} aria-hidden="true" />
            {CONTENT.payment.secured}
          </p>
        </div>
      }
    >
      <div className="relative pt-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close payment"
          className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-close text-white transition-opacity duration-150 hover:opacity-80"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <NslWordmark />
            <span className="rounded-sm bg-surface-3 px-3.5 py-2 text-base font-bold text-fg">
              {amount}
            </span>
          </div>

          <div className="mt-5 border-t border-border" />

          <div className="mt-5 flex justify-center">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-lg border-2 border-tile bg-surface-2">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-phonepe text-[28px] font-bold text-white">
                पे
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-border" />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-fg-subtle">
            {CONTENT.payment.orderSummary}
          </p>

          <div className="mt-3.5 flex items-center justify-between gap-4">
            <span className="text-[15px] text-fg-muted">{CONTENT.payment.description}</span>
            <span className="max-w-[60%] truncate text-right text-[15px] font-semibold text-fg">
              {description}
            </span>
          </div>

          <div className="mt-3.5 flex items-center justify-between gap-4">
            <span className="text-[15px] text-fg-muted">{CONTENT.payment.customer}</span>
            <span className="max-w-[60%] truncate text-right text-[15px] font-semibold text-fg">
              {customerEmail.trim()}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="text-base font-bold text-fg">{CONTENT.payment.total}</span>
            <span className="text-[22px] font-extrabold leading-7 text-fg">{amount}</span>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
