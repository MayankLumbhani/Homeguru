"use client";

import { useState } from "react";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Stepper";
import { CONTENT } from "@/data/content";
import {
  MAX_SESSIONS_PER_WEEK,
  MIN_SESSIONS_PER_WEEK,
} from "@/lib/booking";
import type { BookingForm } from "@/hooks/useBookingForm";
import type { Subject, Tutor } from "@/types";

interface BookClassSheetProps {
  open: boolean;
  onClose: () => void;
  tutor: Tutor;
  subject: Subject;
  form: BookingForm;
  onContinue: () => void;
}

export function BookClassSheet({
  open,
  onClose,
  tutor,
  subject,
  form,
  onContinue,
}: BookClassSheetProps) {
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={CONTENT.book.title}
      subtitle={`${tutor.name} · ${subject.name}`}
      zIndexClass="z-40"
      bodyClassName="pb-24"
      footer={
        <Button size="lg" fullWidth disabled={!form.canContinue} onClick={onContinue}>
          {form.canContinue ? CONTENT.book.ctaEnabled : CONTENT.book.ctaDisabled}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={CONTENT.book.firstName}
            value={form.firstName}
            placeholder={CONTENT.book.firstNamePlaceholder}
            onChange={(event) => form.setFirstName(event.target.value)}
            autoComplete="given-name"
            autoCapitalize="words"
            maxLength={30}
          />
          <Input
            label={CONTENT.book.lastName}
            value={form.lastName}
            placeholder={CONTENT.book.lastNamePlaceholder}
            onChange={(event) => form.setLastName(event.target.value)}
            autoComplete="family-name"
            autoCapitalize="words"
            maxLength={30}
          />
        </div>

        <Input
          label={CONTENT.book.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          value={form.email}
          placeholder={CONTENT.book.emailPlaceholder}
          onChange={(event) => form.setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          error={
            emailTouched && !form.isEmailValid ? CONTENT.book.emailError : undefined
          }
        />

        <Input
          label={CONTENT.book.phone}
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={form.phone}
          placeholder={CONTENT.book.phonePlaceholder}
          prefix={CONTENT.book.phonePrefix}
          onChange={(event) => form.setPhone(event.target.value)}
          onBlur={() => setPhoneTouched(true)}
          error={
            phoneTouched && !form.isPhoneValid ? CONTENT.book.phoneError : undefined
          }
        />

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-fg-subtle">
            {CONTENT.book.sessionsPerWeek}
          </span>
          <div className="mt-2">
            <Stepper
              value={form.sessionsPerWeek}
              min={MIN_SESSIONS_PER_WEEK}
              max={MAX_SESSIONS_PER_WEEK}
              onChange={form.setSessionsPerWeek}
              ariaLabel={CONTENT.book.sessionsPerWeek}
            />
          </div>
          <p className="mt-2 text-[13px] text-fg-subtle">{CONTENT.book.sessionsHelper}</p>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-fg-subtle">
            {CONTENT.book.preferredTime}
          </span>
          <div className="mt-2">
            <Dropdown
              variant="field"
              placement="auto"
              value={form.preferredTime}
              onChange={form.setPreferredTime}
              ariaLabel="Preferred time"
              placeholder={CONTENT.book.preferredTimePlaceholder}
              options={tutor.availability.slots.map((slot) => ({ value: slot, label: slot }))}
            />
          </div>
        </div>

        <BookingSummary
          subjectName={subject.name}
          price={subject.price}
          sessionsPerWeek={form.sessionsPerWeek}
        />
      </div>
    </BottomSheet>
  );
}
