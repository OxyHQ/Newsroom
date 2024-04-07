import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import Image from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  image: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  image,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-4">
        <Image slug={slug} title={title} src={image} />
      </div>
      <h3 className="text-2xl mb-2 leading-snug font-semibold">
        <Link
          as={`/article/${slug}`}
          href="/article/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-sm mb-2">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-sm leading-relaxed mb-2">{excerpt}</p>
    </div>
  );
}
