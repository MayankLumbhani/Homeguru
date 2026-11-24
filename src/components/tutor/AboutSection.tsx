import { CONTENT } from "@/data/content";

interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="border-t border-border px-5 py-5">
      <h2 className="text-[20px] font-bold leading-[26px] text-fg">{CONTENT.detail.about}</h2>
      <p className="mt-3 text-base leading-[26px] text-body">{about}</p>
    </section>
  );
}
