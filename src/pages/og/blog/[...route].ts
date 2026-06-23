import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOGImage, type OGImageInfo } from "../../../lib/og";

const posts = await getCollection("ghostPosts");

const pages: Record<string, OGImageInfo> = Object.fromEntries(posts.map((post) => [
  post.data.slug,
  {
    title: post.data.title,
    featureImage: post.data.feature_image,
    publishedAt: post.data.published_at,
    readingTime: post.data.reading_time,
    showAuthor: true
  }
]));

export function getStaticPaths() {
  return Object.keys(pages).map((route) => ({
    params: { route: `${route}.png` }
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const routeName = params.route?.split(".")[0];

  if (routeName === undefined || pages[routeName] === undefined) {
    return new Response("Not found", { status: 404 });
  }

  return await renderOGImage(pages[routeName]);
}
