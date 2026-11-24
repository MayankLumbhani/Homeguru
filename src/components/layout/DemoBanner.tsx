import { CONTENT } from "@/data/content";

export function DemoBanner() {
  return (
    <div className="bg-demo px-4 py-2 text-center text-[13px] font-semibold leading-[18px] text-white">
      {CONTENT.app.demoBanner}
    </div>
  );
}
