/* eslint-disable func-names */
exports.createPages = async function ({ actions, graphql, reporter }) {
  const result = await graphql(`
    query {
      posts: allGhostPost {
        nodes {
          slug
          id
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running blog pages GraphQL query');
    return;
  }

  result.data.posts.nodes.forEach((node) => {
    actions.createPage({
      path: `/blog/${node.slug}`,
      component: require.resolve('./src/templates/blog-post.jsx'),
      context: {
        id: node.id,
      },
    });
  });
};
