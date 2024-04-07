import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5 lg:gap-x-5 gap-y-10 md:gap-y-5 mb-15">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            image={post.featuredImage}
            date={post.date.default}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
