import { TutorCard } from "@/components/home/TutorCard";
import { CONTENT } from "@/data/content";
import type { Tutor } from "@/types";

interface TutorListProps {
  tutors: Tutor[];
}

export function TutorList({ tutors }: TutorListProps) {
  if (tutors.length === 0) {
    return (
      <p className="mt-10 px-5 text-center text-[15px] text-fg-muted">
        {CONTENT.home.emptyState}
      </p>
    );
  }

  return (
    <ul className="mt-5 flex flex-col gap-4 px-5">
      {tutors.map((tutor, index) => (
        <li key={tutor.id}>
          <TutorCard tutor={tutor} index={index} />
        </li>
      ))}
    </ul>
  );
}
