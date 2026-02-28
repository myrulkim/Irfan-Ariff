import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navbar";
import { getProfile } from "@/lib/supabase/queries";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.irfanariff.com"),
  title: {
    default: "Irfan Ariff | Software Developer",
    template: "%s | Irfan Ariff",
  },
  description:
    "Software Engineering student at UniKL MIIT actively seeking 2026 internships. Freelance developer offering custom web systems.",
  keywords: [
    "Irfan Ariff", "software engineer", "freelance developer",
    "web development", "mobile app development", "UniKL MIIT",
    "2026 internship", "Next.js", "Flutter",
  ],
  authors: [{ name: "Irfan Ariff" }],
  creator: "Irfan Ariff",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.irfanariff.com",
    siteName: "Irfan Ariff Portfolio",
    title: "Irfan Ariff | Software Developer",
    description:
      "Exploring 2026 internships & building freelance web and mobile solutions. View my work and get in touch.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Irfan Ariff Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irfan Ariff | Developer Portfolio",
    description:
      "Software Engineering student seeking 2026 internships. Freelance web & mobile dev.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const revalidate = 60; // Ensure Vercel invalidates the cache every 60 seconds

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Irfan Ariff",
        "jobTitle": "Software Engineering Student",
        "affiliation": { "@type": "CollegeOrUniversity", "name": "UniKL MIIT" },
        "url": "https://www.irfanariff.com",
      },
      {
        "@type": "ProfessionalService",
        "name": "Irfan Ariff — Freelance Development",
        "provider": { "@type": "Person", "name": "Irfan Ariff" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Systems" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-black font-sans antialiased text-white relative overflow-x-hidden selection:bg-white selection:text-black",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-5" />
        <Navbar profile={profile} />
        <main className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 md:pt-32">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
