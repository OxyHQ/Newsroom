import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getData(slug: string) {
  const res = await fetch(
    `https://peable-website-notion-server.vercel.app/api/blog/post/${slug}`
  );

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  return data;
}

export const metadata: Metadata = {
  title: "",
  description: "",
  openGraph: {
    images: [""],
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  metadata.title = data?.title + " - Peable Newsroom" || "Peable Newsroom";
  metadata.openGraph.images = [
    {
      url: data.image,
      width: 800,
      height: 400,
      alt: data.title,
    },
  ];

  return (
    <article>
      <Image src={data.image} alt={data.title} width={800} height={400} />
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-gray-500">{data.content}</p>
    </article>
  );
}
