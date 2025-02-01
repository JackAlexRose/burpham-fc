import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageCarousel } from "@/components/image-carousel";
import { LeagueTable } from "@/components/league-table";
import { NextFixtures } from "@/components/next-fixtures";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { BebasRegular } from "@/components/fonts";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col justify-center space-y-6">
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
            All ages and abilities are invited to come and join us. We have
            teams for everyone.
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-white bg-burpham-green hover:bg-burpham-yellow"
            >
              Get Stuck In
            </Button>
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
              <CardTitle className="text-white">Next Fixtures</CardTitle>
            </CardHeader>
            <CardContent>
              <NextFixtures />
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">First Team Table</CardTitle>
            </CardHeader>
            <CardContent>
              <LeagueTable team="first" />
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Reserves Team Table</CardTitle>
            </CardHeader>
            <CardContent>
              <LeagueTable team="reserves" />
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
