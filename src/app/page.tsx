import Link from "next/link";
import { groq } from "next-sanity";

import { client } from "@/sanity/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageCarousel } from "@/components/image-carousel";
import { LeagueTable } from "@/components/league-table";
import { UpcomingFixtures } from "@/components/upcoming-fixtures";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { BebasRegular } from "@/components/fonts";
import { QueryClientProviderWrapper } from "@/components/query-client-provider";
import { HeaderDocument } from "@/types/sanity";

const headerQuery = groq`*[_type == "header" && _id == "header"][0]{ 
  _id, 
  description, 
  carouselImages 
}`;

export const revalidate = 60; // invalidate every 60 seconds

export default async function Home() {
  const header = await client.fetch<HeaderDocument>(headerQuery);

  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto grid gap-8 px-4 xs:py-6 sm:py-12 lg:grid-cols-2 lg:py-24">
        <div
          className="absolute inset-0 w-full h-[800px] sm:h-[900px] lg:h-[750px] xl:h-[850px]"
          style={{
            backgroundImage: "url('pitch.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div className="flex flex-col justify-center space-y-6 z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-white">We are</h2>
            <h1
              className={`text-4xl font-bold sm:text-5xl md:text-6xl ${BebasRegular.className}`}
            >
              <span className="text-burpham-green">BURPHAM</span>
              <br />
              <span className="text-burpham-yellow">FOOTBALL CLUB</span>
            </h1>
          </div>
          <p className="text-lg text-zinc-200">
            {header.description ||
              "Whether you're an experienced player or a complete beginner, we have a place for you at our club."}
          </p>
          <div className="flex gap-4">
            <Link href="/get-involved" className="z-10">
              <Button
                variant="ghost"
                className="text-white bg-burpham-green hover:bg-burpham-yellow"
              >
                Get Stuck In
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-xl lg:h-[600px]">
          <ImageCarousel />
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Fixtures</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryClientProviderWrapper>
                <UpcomingFixtures table="601917298" />
              </QueryClientProviderWrapper>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">First Team Table</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryClientProviderWrapper>
                <LeagueTable team="64118803" />
              </QueryClientProviderWrapper>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Reserves Team Table</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryClientProviderWrapper>
                <LeagueTable team="159327489" />
              </QueryClientProviderWrapper>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Latest Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <YoutubeEmbed />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
