"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { BookClassSheet } from "@/components/booking/BookClassSheet";
import { PaymentSheet } from "@/components/booking/PaymentSheet";
import { AboutSection } from "@/components/tutor/AboutSection";
import { AvailabilitySection } from "@/components/tutor/AvailabilitySection";
import { BookingBar } from "@/components/tutor/BookingBar";
import { SubjectPricing } from "@/components/tutor/SubjectPricing";
import { TutorHeader } from "@/components/tutor/TutorHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useBookingForm } from "@/hooks/useBookingForm";
import type { SheetState, Tutor } from "@/types";

interface TutorDetailViewProps {
  tutor: Tutor;
}

export function TutorDetailView({ tutor }: TutorDetailViewProps) {
  const [selectedId, setSelectedId] = useState(tutor.subjects[0].id);
  const [sheet, setSheet] = useState<SheetState>("none");

  const selectedSubject =
    tutor.subjects.find((subject) => subject.id === selectedId) ?? tutor.subjects[0];
  const form = useBookingForm(selectedSubject.price);

  return (
    <div className="relative pb-[140px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-glow-purple"
      />

      <div className="relative">
        <TutorHeader tutor={tutor} />

        <section className="flex gap-4 px-5 py-5">
          <Avatar src={tutor.avatar.src} name={tutor.name} tint={tutor.avatar.tint} size={72} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-bold leading-7 text-fg">{tutor.name}</h1>
              {tutor.badge ? (
                <Badge tone={tutor.badge === "Top Rated" ? "amber" : "violet"}>{tutor.badge}</Badge>
              ) : null}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[15px]">
              <Star size={14} aria-hidden="true" className="fill-amber text-amber" />
              <span className="font-bold text-fg">{tutor.rating}</span>
              <span className="text-fg-muted">({tutor.reviewCount})</span>
              <span className="text-fg-muted">·</span>
              <span className="text-fg-muted">{tutor.experienceYears}y exp</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tutor.languages.map((language) => (
                <span
                  key={language}
                  className="rounded-sm bg-surface-2 px-2.5 text-xs leading-6 text-fg-muted"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </section>

        <AboutSection about={tutor.about} />
        <SubjectPricing
          subjects={tutor.subjects}
          selectedId={selectedSubject.id}
          onSelect={setSelectedId}
        />
        <AvailabilitySection days={tutor.availability.days} slots={tutor.availability.slots} />
      </div>

      <BookingBar
        subjects={tutor.subjects}
        selectedId={selectedSubject.id}
        onSelect={setSelectedId}
        onBook={() => setSheet("book")}
      />

      <BookClassSheet
        open={sheet === "book" || sheet === "payment"}
        onClose={() => setSheet((current) => (current === "payment" ? current : "none"))}
        tutor={tutor}
        subject={selectedSubject}
        form={form}
        onContinue={() => setSheet("payment")}
      />

      <PaymentSheet
        open={sheet === "payment"}
        onClose={() => setSheet("book")}
        tutorName={tutor.name}
        subjectName={selectedSubject.name}
        customerEmail={form.email}
        totalSessions={form.totalSessions}
        totalPrice={form.totalPrice}
      />
    </div>
  );
}
