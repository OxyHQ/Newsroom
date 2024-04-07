import type { Metadata } from "next";

async function getData() {
  const res = await fetch(
    "https://peable-website-notion-server.vercel.app/api/blog/post/the-impact-of-social-technology-on-mental-health"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function Page() {
  const data = await getData();

  metadata.title = data?.title + " - Peable Newsroom" || "Peable Newsroom";

  return <main>{data?.title}</main>;
}
