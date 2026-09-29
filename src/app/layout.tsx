import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://youcam-ai-commerce.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SkinCast — Cast your skin before you buy",
  description:
    "YouCam Skin Analysis + Skin Simulation shopping concierge. See how a product may change your skin, then add to cart.",
  applicationName: "SkinCast",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SkinCast",
    title: "SkinCast — Cast your skin before you buy",
    description:
      "YouCam Skin Analysis + Skin Simulation shopping concierge for the hackathon demo.",
    images: [
      {
        url: "/hero-atmosphere.jpg",
        width: 1600,
        height: 900,
        alt: "SkinCast atmosphere — cast your skin before you buy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinCast — Cast your skin before you buy",
    description:
      "YouCam Skin Analysis + Skin Simulation shopping concierge.",
    images: ["/hero-atmosphere.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
