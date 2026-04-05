import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { ParticleField } from "@/src/ui/components/canvas/ParticleField";
import { AlchemistNavbar } from "@/src/ui/components/AlchemistNavbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "ALCHIMISTRA | Elite Technical Orchestration",
  description: "Turning raw logic into extraordinary digital ecosystems. Architecting the future of premium tech.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(
        "min-h-screen bg-black font-sans antialiased text-white relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white",
        inter.variable,
        jetbrainsMono.variable
      )}>
        <ParticleField />
        <AlchemistNavbar />
        <main className="relative flex flex-col w-full min-h-screen">
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
