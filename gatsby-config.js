require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Jake Walker',
    author: 'Jake Walker',
    description: "Hi! I'm Jake Walker a tech enthusiast and developer living in the United Kingdom.",
    siteUrl: 'https://jakew.me/',
    ogImage: 'https://jakew.me/img/avatar2bg.png',
    twitterUsername: '@_jakewalker1',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jake Walker',
        short_name: 'Jake Walker',
        start_url: '/',
        background_color: '#f8f9fa',
        theme_color: '#8000ff',
        display: 'standalone',
        icon: 'src/images/avatarbg.png',
      },
    },
    'gatsby-plugin-next-seo',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://jakew.me',
      },
    },
    {
      resolve: 'gatsby-source-ghost',
      options: {
        apiUrl: 'https://ghost.jakew.me',
        contentApiKey: process.env.GHOST_API_KEY,
        version: 'v3',
      },
    },
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'GhostPost',
        imagePath: 'feature_image',
      },
    },
    {
      resolve: 'gatsby-transformer-rehype',
      options: {
        filter: (node) => node.internal.type === 'GhostPost',
        source: (node) => node.html,
        plugins: [
          'gatsby-rehype-ghost-links',
          'gatsby-rehype-prismjs',
        ],
      },
    },
  ],
};
