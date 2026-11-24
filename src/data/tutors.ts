import type { Tutor } from "@/types";

export const TUTORS: Tutor[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    headline: "Mathematics",
    badge: "Top Rated",
    rating: 4.9,
    reviewCount: 312,
    experienceYears: 8,
    languages: ["Hindi", "English"],
    hourlyRate: 400,
    category: "school-education",
    avatar: { src: "/avatars/priya-sharma.svg", tint: "sky" },
    about:
      "8 years of experience teaching Maths and Science to students from Class 6-12. Known for making complex concepts simple and building strong fundamentals.",
    subjects: [
      { id: "mathematics", name: "Mathematics", price: 400 },
      { id: "physics", name: "Physics", price: 420 },
      { id: "science", name: "Science", price: 380 },
    ],
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      slots: ["6:00 AM – 8:00 AM", "5:00 PM – 8:00 PM"],
    },
  },
  // ASSUMED: only the Home-card fields below are from the screenshots;
  // about / subjects / availability are minimal placeholders.
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    headline: "Python & AI",
    badge: "Popular",
    rating: 4.8,
    reviewCount: 198,
    experienceYears: 6,
    languages: ["English", "Gujarati"],
    hourlyRate: 600,
    category: "tech-coding",
    avatar: { src: "/avatars/arjun-mehta.svg", tint: "lavender" },
    about: "6 years of experience teaching Python and AI.", // ASSUMED
    subjects: [{ id: "python-ai", name: "Python & AI", price: 600 }], // ASSUMED
    availability: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"], // ASSUMED
      slots: ["6:00 PM – 9:00 PM"], // ASSUMED
    },
  },
];
