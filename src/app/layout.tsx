import type { Metadata } from "next";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MainNav } from "@/components/main-nav";
import { BebasRegular, GeistMono, GeistSans } from "@/components/fonts";

import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Burpham Football Club",
  description: "The official website of Burpham Football Club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <div className="bg-gradient-to-b from-background-start to-background-start">
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
                Burpham{" "}
                <span className="text-burpham-yellow">Football Club</span>
              </h1>
            </Link>
            <MainNav />
          </div>
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
