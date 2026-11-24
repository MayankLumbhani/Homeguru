import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import { AppBar } from "@/components/layout/AppBar";
import { AppShell } from "@/components/layout/AppShell";
import { ChatFab } from "@/components/layout/ChatFab";
import { DemoBanner } from "@/components/layout/DemoBanner";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "HomeGuru",
  description: "Best qualified tutors matched to your needs",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${instrumentSerif.variable}`}>
      <body>
        <AppShell>
          <AppBar />
          <DemoBanner />
          {children}
        </AppShell>
        <ChatFab />
      </body>
    </html>
  );
}
