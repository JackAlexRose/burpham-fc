import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

export interface CommitteeMember {
  name: string;
  title: string;
  description: string;
  image: SanityImageSource;
}

export interface Sponsor {
  title: string;
  subtitle: string;
  description: string;
  websiteUrl: string;
}

export interface AboutDocument {
  _id: string;
  description: string;
  committeeMembers: CommitteeMember[];
  sponsors: Sponsor[];
}

export interface GetStuckInDocument {
  title: string;
  description: string;
}

export interface HeaderDocument {
  _id: string;
  description: string;
  carouselImages: SanityImageSource[];
}

export interface MatchReport {
  _id: string;
  title: string;
  slug: { current: string };
  matchDate: string;
  manOfTheMatch: string;
  image: SanityImageSource;
  body: PortableTextBlock[];
}

export interface MatchReportsDocument {
  reports: MatchReport[];
}
