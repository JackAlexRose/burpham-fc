import type { Metadata } from "next";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MainNav } from "@/components/main-nav";
import { BebasRegular, GeistMono, GeistSans } from "@/components/fonts";

import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Burpham Football Club",
    default: "Burpham Football Club",
  },
  description:
    "The official website of Burpham Football Club, a community football club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-gradient-to-b from-background-start to-background-start`}
      >
        <div className="flex items-center justify-between p-4 lg:px-8">
          <Link href="/" className="flex items-center gap-4 z-10">
            <Image
              src="/Logo_2024.png"
              alt="Burpham Football Club"
              width={48}
              height={48}
            />
            <h1
              className={`text-2xl font-bold text-burpham-green ${BebasRegular.className}`}
            >
              Burpham <span className="text-burpham-yellow">Football Club</span>
            </h1>
          </Link>
          <MainNav />
        </div>
        {children}
        <footer className="text-end p-4 text-zinc-200 text-sm">
          Website made by{" "}
          <a href="https://github.com/jackalexrose" className="text-blue-400">
            Jack Rose
          </a>
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
