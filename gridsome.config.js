module.exports = {
  siteName: 'Jake Walker',
  siteDescription: "Hi! I'm Jake Walker a tech enthusiast and developer living in the United Kingdom.",
  siteUrl: "https://jakew.me",
  icon: "./src/assets/avatar.png",
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      autolinkHeadings: false,
      plugins: [
        "gridsome-plugin-remark-prismjs-all"
      ]
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: './content/blog/**/*.md',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    },
    {
      use: '@microflash/gridsome-plugin-feed',
      options: {
        contentTypes: ['BlogPost'],
        feedOptions: {
          title: 'Jake Walker'
        }
      }
    }
  ],
  templates: {
    BlogPost: '/:year/:month/:day/:slug'
  }
}
