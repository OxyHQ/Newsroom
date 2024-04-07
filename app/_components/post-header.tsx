import Avatar from "./avatar";
import Image from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  image: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, image, date, author }: Props) {
  return (
    <>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <Image title={title} src={image} />
      </div>
    </>
  );
}
