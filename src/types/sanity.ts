import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
