import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/client";
import { AboutDocument } from "@/types/sanity";

const { projectId, dataset } = client.config();

export const revalidate = 60; // invalidate every 60 seconds

const aboutQuery = groq`*[_type == "about"][0]{
  _id,
  description,
  committeeMembers[]{
  name,
  title,
  description,
  image
  },
  sponsors[]{
  title,
  subtitle,
  description,
  websiteUrl
  }
  }`;

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const metadata = {
  title: "About Us",
  description: "Learn more about Burpham Football Club and our history.",
};

export default async function AboutPage() {
  const about = await client.fetch<AboutDocument>(aboutQuery);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">
        About Burpham Football Club
      </h1>

      <div className="mb-8">
        <p className="mb-4 text-zinc-300">{about.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Committee Members
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {about.committeeMembers?.map((member) => (
            <Card key={member.name} className="bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-white">{member.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-white">
                  {member.name}
                </p>
                <p className="mb-4 text-zinc-400 mt-2">{member.description}</p>
                <div className="flex space-x-4 items-center justify-center">
                  <Image
                    src={
                      urlFor(member.image)?.width(200).height(200).url() || ""
                    }
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
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
          {about.sponsors?.map((sponsor) => (
            <Card key={sponsor.title} className="bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-white">{sponsor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-white">
                  {sponsor.subtitle}
                </p>
                <p className="mb-4 text-zinc-400 mt-2">{sponsor.description}</p>
                <Button asChild variant="link">
                  <Link
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    Visit Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
