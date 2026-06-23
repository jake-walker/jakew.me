import { defineCollection } from "astro:content";
import { AstroError } from "astro/errors";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import type { AstroConfig } from "astro";
import { rehypeAnchorRewrite, rehypeCollectImages, rehypeImages, rehypeGhostVideoCard } from "./lib/rehype";
import { z } from "astro/zod";
import { postsSchema, type Post, ghostClient } from "./lib/ghost";

function createParser(opts?: AstroConfig) {
  return unified().use(rehypeParse, { fragment: true })
    .use(rehypeAnchorRewrite)
    .use(rehypeCollectImages, opts?.image)
    .use(rehypeShiki, { themes: { light: 'catppuccin-latte', dark: 'catppuccin-mocha' } })
    .use(rehypeImages)
    .use(rehypeGhostVideoCard)
    .use(rehypeStringify);
}

export const collections = {
  ghostPosts: defineCollection({
    schema: postsSchema,
    loader: {
      name: 'custom-ghostcms-posts',
      schema: postsSchema,
      load: async (context) => {
        const { logger, parseData, store, config } = context;

        const parser = createParser(config);

        logger.info("Fetching posts from Ghost Content API");

        const posts = await ghostClient.posts.browse({
          order: "published_at DESC",
          include: ["authors", "tags"],
          limit: "all"
        });

        if (posts.length === 0) {
          throw new AstroError('No posts returned from Ghost Content API');
        }

        posts.sort((a, b) => {
          const aDate = a.published_at ?? a.created_at;
          const bDate = b.published_at ?? b.created_at;

          const aTime = aDate !== undefined ? new Date(aDate).getTime() : 0;
          const bTime = bDate !== undefined ? new Date(bDate).getTime() : 0;

          return bTime - aTime;
        });

        for (const post of posts) {
          const parsedPost = await parseData({
            id: post.id,
            data: post as any,
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
  }),
  githubRepos: defineCollection({
    schema: z.object({
      id: z.string(),
      description: z.string().nullable(),
      full_name: z.string(),
      html_url: z.string(),
      language: z.string().nullable(),
      name: z.string(),
      archived: z.boolean(),
      created_at: z.coerce.date(),
      pushed_at: z.coerce.date(),
      fork: z.boolean()
    }),
    loader: async () => {
      let headers: HeadersInit = {
        "X-GitHub-Api-Version": "2022-11-28",
        "Accept": "application/vnd.github+json"
      };

      if (import.meta.env.GITHUB_API_KEY !== undefined) {
        headers["Authorization"] = `Bearer ${import.meta.env.GITHUB_API_KEY}`;
      }

      let page = 1;

      let repos: any[] = [];

      while (true) {
        const res = await fetch(`https://api.github.com/users/jake-walker/repos?page=${page}`, {
          headers
        });

        if (!res.ok) {
          break;
        }

        const resJson = await res.json();

        if (resJson.length == 0) {
          break;
        }

        repos = [...repos, ...resJson];
        page++;
      }

      return repos.filter((r) => !r.private).map((repo) => ({
        ...repo,
        id: repo.full_name,
      }));
    }
  }),
  forgejoRepos: defineCollection({
    schema: z.object({
      id: z.string(),
      description: z.string().nullable().transform((v) => v === "" ? null : v),
      full_name: z.string(),
      html_url: z.string(),
      language: z.string().nullable(),
      name: z.string(),
      archived: z.boolean(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      fork: z.boolean()
    }),
    loader: async () => {
      let page = 1;

      let repos: any[] = [];

      while (true) {
        const res = await fetch(`https://git.boop.fi/api/v1/users/jakew/repos?page=${page}`);

        if (!res.ok) {
          break;
        }

        const resJson = await res.json();

        if (resJson.length == 0) {
          break;
        }

        repos = [...repos, ...resJson];
        page++;
      }

      return repos.map((repo) => ({
        ...repo,
        id: repo.full_name,
      }));
    }
  })
}
