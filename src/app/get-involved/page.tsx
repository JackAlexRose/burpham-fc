import { Button } from "@/components/ui/button";
import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { GetStuckInDocument } from "@/types/sanity";

const getStuckInQuery = groq`*[_type == "getStuckIn"][0]{
  title,
  description
}`;

export const revalidate = 60; // invalidate every 60 seconds

export const metadata = {
  title: "Get Involved",
  description: "Learn how you can get involved with Burpham Football Club.",
};

export default async function GetInvolved() {
  const content = await client.fetch<GetStuckInDocument>(getStuckInQuery);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">{content.title}</h1>
      <div className="mb-8 text-zinc-300 whitespace-pre-wrap">
        {content.description}
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
    </div>
  );
}
