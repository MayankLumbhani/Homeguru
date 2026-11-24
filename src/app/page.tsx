import { HomeView } from "@/components/home/HomeView";
import { TUTORS } from "@/data/tutors";

export default function HomePage() {
  return <HomeView tutors={TUTORS} />;
}
