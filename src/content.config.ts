import { GhostCMSContentAPIFactory } from "astro-ghostcms-loader/api";
import { TagsLoader } from "astro-ghostcms-loader/loaders";
import { postsSchema, tagsSchema, type Post } from "astro-ghostcms-loader/schemas";
import { defineCollection } from "astro:content";
import { AstroError } from "astro/errors";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import type { AstroConfig } from "astro";
import { rehypeAnchorRewrite, rehypeCollectImages, rehypeImages, rehypeGhostVideoCard } from "./lib/rehype";

function createParser(opts?: AstroConfig) {
  return unified().use(rehypeParse, { fragment: true })
    .use(rehypeAnchorRewrite)
    .use(rehypeCollectImages, opts?.image)
    .use(rehypeShiki, { themes: { light: 'catppuccin-latte', dark: 'catppuccin-mocha' } })
    .use(rehypeImages)
    .use(rehypeGhostVideoCard)
    .use(rehypeStringify);
}

const api = GhostCMSContentAPIFactory(import.meta.env.GHOST_URL, import.meta.env.GHOST_CONTENT_API_KEY, 'v5.0');

export const collections = {
  // ...ghost,
  ghostTags: defineCollection({
    schema: tagsSchema,
    loader: TagsLoader(api),
  }),
  ghostPosts: defineCollection({
    schema: postsSchema,
    loader: {
      name: 'custom-ghostcms-posts',
      schema: postsSchema,
      load: async (context) => {
        const { logger, parseData, store, config } = context;

        const parser = createParser(config);

        const posts: Post[] = [];

        logger.info("Fetching posts from Ghost Content API");

        let cursor = await api.posts.browse().include({ authors: true, tags: true }).paginate().catch((err) => {
          throw new AstroError('Failed to fetch posts from Ghost Content API', err);
        });

        if (cursor.current.success) posts.push(...cursor.current.data);
        while (cursor.next) {
          cursor = await cursor.next.paginate();
          if (cursor.current.success) posts.push(...cursor.current.data);
        }

        if (posts.length === 0) {
          throw new AstroError('No posts returned from Ghost Content API');
        }

        posts.sort((a, b) => new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime());

        for (const post of posts) {
          const parsedPost = await parseData({
            id: post.id,
            data: post,
          });

          const result = await parser.process(parsedPost.html.trim());

          store.set({
            id: parsedPost.id,
            data: parsedPost,
            rendered: {
              html: String(result.value),
              metadata: {
                imagePaths: [...(result.data.astro?.localImagePaths || []), ...(result.data.astro?.remoteImagePaths || [])]
              }
            },
            filePath: parsedPost.url,
          });
        }
      }
    }
  })
}
