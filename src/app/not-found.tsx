import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[32px] font-extrabold text-fg">404</p>
      <p className="mt-2 text-[15px] text-fg-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-full bg-cta px-5 text-[15px] font-bold text-white shadow-cta"
      >
        Go to Home
      </Link>
    </div>
  );
}
