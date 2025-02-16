import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { MatchReport } from "@/types/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const { projectId, dataset } = client.config();

const matchReportsQuery = groq`*[_type == "matchReport"] | order(date desc) {
  _id,
  title,
  slug,
  matchDate,
  image,
  manOfTheMatch,
  body
}`;

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const revalidate = 60;

export const metadata = {
  title: "Match Reports",
  description: "Read the latest match reports from Burpham Football Club.",
};

export default async function MatchReportsPage() {
  const reports = await client.fetch<MatchReport[]>(matchReportsQuery);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-white">Match Reports</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Link key={report._id} href={`/match-reports/${report.slug.current}`}>
            <Card className="bg-zinc-900/50 h-full hover:bg-zinc-800/50 transition-colors">
              <div className="relative w-full h-48">
                <Image
                  src={urlFor(report.image)?.width(600).height(400).url() || ""}
                  alt={report.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-white">{report.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-2">
                  {new Date(report.matchDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-zinc-300 line-clamp-3">
                  MOTM: {report.manOfTheMatch}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
