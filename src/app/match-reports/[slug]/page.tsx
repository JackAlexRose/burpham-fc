import { groq } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/client";
import { MatchReport } from "@/types/sanity";

const { projectId, dataset } = client.config();

const matchReportQuery = groq`*[_type == "matchReport" && slug.current == $slug][0]{
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const report = await client.fetch<MatchReport>(matchReportQuery, {
    slug: (await params).slug,
  });

  if (!report) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: report.title,
    description: `Match report for ${report.title}`,
  };
}

const components = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-4 text-zinc-300">{children}</p>
    ),
  },
};

export default async function MatchReportPage({ params }: Props) {
  const report = await client.fetch<MatchReport>(matchReportQuery, {
    slug: (await params).slug,
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-white">{report.title}</h1>

        <div className="mb-6">
          <div className="relative w-full h-[400px]">
            <Image
              src={urlFor(report.image)?.width(1200).height(800).url() || ""}
              alt={report.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
          <p className="text-zinc-300 mb-2 sm:mb-0">
            {new Date(report.matchDate).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-zinc-300">
            Man of the Match:{" "}
            <span className="font-semibold">{report.manOfTheMatch}</span>
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <PortableText value={report.body} components={components} />
        </div>
      </div>
    </div>
  );
}
