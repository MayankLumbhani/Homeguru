import Link from "next/link";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { CONTENT } from "@/data/content";
import { formatINR } from "@/lib/format";
import type { Tutor } from "@/types";

interface TutorCardProps {
  tutor: Tutor;
  index: number;
}

export function TutorCard({ tutor, index }: TutorCardProps) {
  return (
    <Link
      href={`/tutors/${tutor.id}`}
      style={{ animationDelay: `${Math.min(index, 4) * 60}ms` }}
      className="animate-fade-up block overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-150 hover:border-border-strong"
    >
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar
            src={tutor.avatar.src}
            name={tutor.name}
            tint={tutor.avatar.tint}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[18px] font-bold leading-6 text-fg">{tutor.name}</h2>
              {tutor.badge ? (
                <Badge tone={tutor.badge === "Top Rated" ? "amber" : "violet"}>{tutor.badge}</Badge>
              ) : null}
            </div>
            <p className="mt-1 text-[15px] text-fg-muted">{tutor.headline}</p>
            <div className="mt-1 flex items-center gap-1.5 text-[15px]">
              <Star size={14} aria-hidden="true" className="fill-amber text-amber" />
              <span className="font-bold text-fg">{tutor.rating}</span>
              <span className="text-fg-muted">({tutor.reviewCount})</span>
              <span className="text-fg-muted">·</span>
              <span className="text-fg-muted">{tutor.experienceYears}y exp</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
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
      <div className="flex items-center justify-between border-t border-border p-4">
        <p className="flex items-baseline">
          <span className="text-2xl font-extrabold text-fg">{formatINR(tutor.hourlyRate)}</span>
          <span className="ml-0.5 text-sm text-fg-muted">{CONTENT.home.perHour}</span>
        </p>
        <span className="inline-flex h-11 items-center rounded-full bg-cta px-5 text-[15px] font-bold text-white shadow-cta">
          {CONTENT.home.bookClass}
        </span>
      </div>
    </Link>
  );
}
