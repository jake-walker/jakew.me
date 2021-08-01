exports.createPages = async function ({ actions, graphql, reporter }) {
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              slug
              date(formatString: "YYYY/MM/DD")
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running blog pages GraphQL query');
    return;
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.slug,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {
        id: node.id
      }
    });
  });
}
