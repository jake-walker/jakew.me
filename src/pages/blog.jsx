import * as React from 'react';
import { Container } from 'react-bootstrap';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostCard from '../components/post-card';

const BlogPage = ({ data }) => (
  <Layout title="Blog">
    <section>
      <Container>
        <h1 className="title">Blog</h1>
        {
          data.posts.nodes.map((node) => (
            <PostCard key={node.id} post={node} />
          ))
        }
      </Container>
    </section>
  </Layout>
);

export const query = graphql`
  query {
    posts: allGhostPost(sort: {fields: published_at, order: DESC}) {
      nodes {
        id
        slug
        title
        published_at(formatString: "D MMM YYYY")
        excerpt
        reading_time
        localImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
        author
      }
    }
  }
`;

export default BlogPage;
