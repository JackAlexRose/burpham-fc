import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn more about Burpham Football Club and our history.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">
        About Burpham Football Club
      </h1>

      <div className="mb-8">
        <p className="mb-4 text-zinc-300">
          Burpham Football Club is a community-focused sports organization
          dedicated to providing opportunities for people of all ages and skill
          levels to participate in the beautiful game. Our club is based in the
          heart of Burpham, Surrey, and we have a long history of success in
          local leagues and tournaments. Founded in 1923, we have a rich
          heritage and a strong commitment to developing the next generation of
          footballing talent.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Committee Members
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Chairman</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-white">John Smith</p>
              <p className="mb-4 text-zinc-400 mt-2">
                John has been involved with the club for over 20 years and is
                passionate about developing young talent.
              </p>
              <div className="flex space-x-4 items-center justify-center">
                <Image
                  src="/harry.png"
                  alt="John Smith"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Secretary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-white">Jane Doe</p>
              <p className="mb-4 text-zinc-400 mt-2">
                Jane is responsible for managing the club&apos;s administration
                and ensuring everything runs smoothly.
              </p>
              <div className="flex space-x-4 items-center justify-center">
                <Image
                  src="/charlie.png"
                  alt="Jane Doe"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Treasurer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-white">David Brown</p>
              <p className="mb-4 text-zinc-400 mt-2">
                David oversees the club&apos;s finances and ensures that we
                operate within budget.
              </p>
              <div className="flex space-x-4 items-center justify-center">
                <Image
                  src="/some_guy.png"
                  alt="David Brown"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Connect with Us
        </h2>
        <div className="flex space-x-4">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-burpham-green bg-zinc-200"
          >
            <Link
              href="https://www.instagram.com/burphamfc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="hover:bg-burpham-yellow bg-zinc-200"
          >
            <Link
              href="https://www.youtube.com/@BurphamFC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="mr-2 h-4 w-4" />
              YouTube
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-white">Our Sponsors</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Sleep Toniq</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-white">
                The night you need
              </p>
              <p className="mb-4 text-zinc-400 mt-2">
                Sleep Toniq is a natural drink that promotes sleep and makes you
                feel fresher the next day.
              </p>
              <Button asChild variant="link">
                <Link
                  href="https://sleeptoniq.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Visit Website
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Doormatic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-white">Garage Doors</p>
              <p className="mb-4 text-zinc-400 mt-2">
                Leading Supplier & Installer of Garage Doors in the South East
              </p>
              <Button asChild variant="link">
                <Link
                  href="https://www.doormaticgaragedoors.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Visit Website
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
