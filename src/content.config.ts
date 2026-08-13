import { defineCollection } from "astro:content";
import { ghostLoader } from "@jakew/astro-ghost-loader";
import { githubRepoLoader, forgejoRepoLoader } from "@jakew/astro-git-repo-loader";

export const collections = {
  ghostPosts: defineCollection({
    loader: ghostLoader({
      url: import.meta.env.GHOST_URL,
      contentApiKey: import.meta.env.GHOST_CONTENT_API_KEY,
      apiVersion: "v6.0"
    })
  }),
  githubRepos: defineCollection({
    loader: githubRepoLoader({
      username: "jake-walker",
      apiKey: import.meta.env.GITHUB_API_KEY
    }),
  }),
  forgejoRepos: defineCollection({
    loader: forgejoRepoLoader({
      baseUrl: "https://git.boop.fi",
      username: "jakew"
    }),
  })
}
