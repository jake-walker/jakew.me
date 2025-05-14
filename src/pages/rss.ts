import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import rehypeParse from "rehype-parse";
import type { AstroConfig } from "astro";
import { unified } from "unified";
import { rehypeAnchorRewrite, rehypeCollectImages, rehypeGhostVideoCard, rehypeImages } from "../lib/rehype";
import rehypeStringify from "rehype-stringify";

function createParser() {
  return unified().use(rehypeParse, { fragment: true })
    .use(rehypeAnchorRewrite)
    .use(rehypeGhostVideoCard)
    .use(rehypeStringify);
}

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('ghostPosts');
  const parser = createParser();

  return rss({
    title: 'Jake Walker',
    description: 'Avid Coder, Cyber Security Guy and Tinkerer',
    site: context.site?.href ?? 'https://jakew.me',
    items: await Promise.all(posts.filter((p) => p.rendered !== undefined).map(async (p) => {
      const result = await parser.process(p.data.html);

      return {
        title: p.data.title,
        author: 'Jake Walker',
        content: String(result.value),
        description: p.data.excerpt,
        link: `/${p.data.slug}`
      }
    }))
  });
}
