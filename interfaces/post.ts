import { type Author } from "./author";

type Date = {
  default: string;
  formatted: string;
};

export type Post = {
  slug: string;
  title: string;
  date: Date;
  image: string;
  featuredImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
