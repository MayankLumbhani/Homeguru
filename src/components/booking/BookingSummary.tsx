import { CONTENT } from "@/data/content";
import { getTotalPrice, getTotalSessions } from "@/lib/booking";
import { formatINR } from "@/lib/format";

interface BookingSummaryProps {
  subjectName: string;
  price: number;
  sessionsPerWeek: number;
}

export function BookingSummary({ subjectName, price, sessionsPerWeek }: BookingSummaryProps) {
  const totalSessions = getTotalSessions(sessionsPerWeek);
  const totalPrice = getTotalPrice(price, sessionsPerWeek);

  return (
    <div className="rounded-lg border border-purple-border bg-summary p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-text">
        {CONTENT.book.summaryTitle}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-base text-fg">
          {totalSessions}× {subjectName}
        </span>
        <span className="text-base text-fg-muted">
          {totalSessions} sessions
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-base text-fg-muted">
          {formatINR(price)} × {totalSessions}
        </span>
        <span className="text-[26px] font-extrabold leading-7 text-purple-text">
          {formatINR(totalPrice)}
        </span>
      </div>
      <p className="mt-3 text-[13px] text-fg-subtle">{CONTENT.book.summaryFootnote}</p>
    </div>
  );
}
