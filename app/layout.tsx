// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/animations/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCA Batch 2026 — SGSITS Indore | Farewell Memory World",
  description:
    "The digital memory world of MCA Batch 2026, SGSITS Indore. Relive every moment — from first benches to farewell tears. Our college journey, preserved forever.",
  keywords: ["SGSITS", "MCA 2026", "Farewell", "Indore", "Memories", "College"],
  authors: [{ name: "MCA Batch 2026, SGSITS Indore" }],
  openGraph: {
    title: "MCA Batch 2026 — SGSITS Indore | Farewell Memory World",
    description: "This isn't just a website. It's our entire college journey.",
    siteName: "MCA Farewell 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCA Batch 2026 — SGSITS Indore | Farewell Memory World",
    description: "This isn't just a website. It's our entire college journey.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body bg-navy-deep text-white antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "rgba(10,14,26,0.95)",
                  color: "#fff",
                  border: "1px solid rgba(201,168,76,0.3)",
                  backdropFilter: "blur(20px)",
                  fontFamily: "var(--font-body)",
                },
                success: {
                  iconTheme: { primary: "#C9A84C", secondary: "#000" },
                },
              }}
            />
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
