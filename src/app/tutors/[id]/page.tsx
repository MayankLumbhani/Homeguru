import { notFound } from "next/navigation";
import { TutorDetailView } from "@/components/tutor/TutorDetailView";
import { TUTORS } from "@/data/tutors";
import { getTutorById } from "@/lib/tutors";

interface TutorDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return TUTORS.map((tutor) => ({ id: tutor.id }));
}

export default async function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = await params;
  const tutor = getTutorById(id);

  if (!tutor) {
    notFound();
  }

  return <TutorDetailView tutor={tutor} />;
}
