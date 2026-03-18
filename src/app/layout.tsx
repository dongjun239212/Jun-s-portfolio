import type { Metadata } from "next";
import { TikTok_Sans, Playfair_Display } from "next/font/google";
import { NextJsPortalFix } from "@/components/NextJsPortalFix";
import "./globals.css";

const tiktokSans = TikTok_Sans({
  subsets: ["latin"],
  variable: "--font-tiktok-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_NAME = "CALM & CRAZY | Jun Dong";
const SITE_DESC = "UX designer focusing on e-commerce experience and conversion.";

function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESC,
  keywords: ["portfolio", "UX design", "e-commerce", "conversion", "Jun Dong"],
  authors: [{ name: "Jun Dong" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }], // 将 1200×630 的图放到 public/og.png
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tiktokSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased">
        {children}
        {/* 覆盖 Next.js 注入的 nextjs-portal 定位，强制固定到视口左上角，避免 top: 11415px 等错误位置 */}
        <style dangerouslySetInnerHTML={{ __html: `nextjs-portal{position:fixed!important;top:0!important;left:0!important;margin:0!important;z-index:99999;}` }} />
        <NextJsPortalFix />
      </body>
    </html>
  );
}
