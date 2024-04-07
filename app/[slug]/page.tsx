import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

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

export function generateMetadata({ params }: Params): Metadata {
  const post = {
    title: "Next.js Blog Example with Markdown",
    ogImage: {
      url: "",
    },
  };

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}
