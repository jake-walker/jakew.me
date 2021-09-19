module.exports = {
  siteMetadata: {
    title: "Jake Walker",
    author: "Jake Walker",
    description: "Hi! I'm Jake Walker a tech enthusiast and developer living in the United Kingdom.",
    siteUrl: "https://jakew.me/",
    ogImage: "https://jakew.me/img/avatar2bg.png",
    twitterUsername: "@_jakewalker1"
  },
  plugins: [
    "gatsby-remark-images",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Jake Walker",
        short_name: "Jake Walker",
        start_url: "/",
        background_color: "#f8f9fa",
        theme_color: "#8000ff",
        display: "standalone",
        icon: "src/images/avatarbg.png"
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files"
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`
      },
    },
    "gatsby-plugin-next-seo",
    "gatsby-plugin-sitemap"
  ],
};
