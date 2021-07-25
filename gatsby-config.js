module.exports = {
  siteMetadata: {
    siteUrl: "https://jakew.me",
    title: "Jake Walker",
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
        icon: "src/images/avatar.png",
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
    }
  ],
};
