import type { Metadata } from "next";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";

import { Button } from "@/components/ui/button";
import { BebasRegular, GeistMono, GeistSans } from "@/components/fonts";

import "./globals.css";

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
          <nav className="flex items-center justify-between p-4 lg:px-8">
            <div className="flex items-center gap-4">
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
            </div>
            <div className="hidden sm:flex items-center gap-3 z-10">
              <Button
                variant="ghost"
                className="text-zinc-200 hover:text-burpham-yellow hover:bg-burpham-green"
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="text-zinc-200 hover:text-burpham-yellow hover:bg-burpham-green"
              >
                Match Reports
              </Button>
              <Button
                variant="ghost"
                className="text-white bg-burpham-green hover:bg-burpham-yellow"
              >
                Get Stuck In
              </Button>
            </div>
          </nav>
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
