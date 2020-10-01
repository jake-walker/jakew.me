// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Jake Walker',
  siteDescription: "Hi! I'm Jake Walker a tech enthusiast and developer living in the United Kingdom.",
  siteUrl: "https://jakew.me",
  icon: "./src/assets/avatar.png",
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        "gridsome-plugin-remark-prismjs-all"
      ]
    }
  },
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss"
    },
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
    }
  ],
  templates: {
    BlogPost: '/:year/:month/:day/:slug'
  }
}
