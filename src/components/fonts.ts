import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

export const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const BebasRegular = localFont({ src: "./Bebas-Regular.ttf" });
