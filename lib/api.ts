import { Post } from "@/interfaces/post";

// Function to get post slugs
export async function getPosts(): Promise<Post[]> {
  // Fetch the post slugs from the API
  const uniqueTime = new Date().getTime();
  const res = await fetch(
    `https://peable-website-notion-server.vercel.app/api/blog/posts/?nocache=${uniqueTime}`,
    { cache: "no-store" }
  );
  const posts = await res.json();
  return posts;
}

// Function to get post by slug
export async function getPostBySlug(slug: string): Promise<Post> {
  const uniqueTime = new Date().getTime();
  // Fetch the post data from the API
  const res = await fetch(
    `https://peable-website-notion-server.vercel.app/api/blog/post/${slug}?nocache=${uniqueTime}`,
    { cache: "no-store" }
  );
  const postData = await res.json();
  return postData;
}

// Function to get all posts
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getPosts();
  // Sort posts by date in descending order
  posts.sort((post1, post2) =>
    post1?.date?.default > post2?.date?.default ? -1 : 1
  );
  return posts;
}
