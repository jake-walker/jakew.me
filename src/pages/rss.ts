import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('ghostPosts');

  return rss({
    title: 'Jake Walker',
    description: 'Coder, maker, and builder of things',
    site: context.site?.href ?? 'https://jakew.me',
    items: await Promise.all(posts.filter((p) => p.rendered !== undefined).map(async (p) => {
      return {
        title: p.data.title,
        author: 'Jake Walker',
        content: p.data.basicHtml,
        description: p.data.excerpt,
        link: `/${p.data.slug}`,
        pubDate: p.data.published_at !== null && p.data.published_at !== undefined ? new Date(p.data.published_at) : new Date()
      } satisfies RSSFeedItem;
    }))
  });
}
