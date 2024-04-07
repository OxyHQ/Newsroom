import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { describe } from "node:test";

async function getData(slug: string) {
  const res = await fetch(
    `https://peable-website-notion-server.vercel.app/api/blog/post/${slug}?t=${new Date().getTime()}`
  );

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  return data;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getData(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post?.title}
            coverImage={post?.image}
            date={post?.date.default}
            author={post?.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = await getData(params.slug);
  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Peable Newsroom`;

  return {
    title,
    description: post.content ? post.content.slice(0, 100) + "..." : "",
    openGraph: {
      title,
      images: [post.image],
    },
  };
}
