import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/layout';
import PostCard from '../components/post-card';
import { graphql } from 'gatsby';
import { BlogJsonLd } from 'gatsby-plugin-next-seo';

const BlogPage = ({ data }) => {
  return (
    <Layout title="Blog">
      <section>
        <Container>
          <h1 className="title">Blog</h1>
          {
            data.allMdx.edges.map(({ node }) => (
              <PostCard key={node.id} post={node} size="big"/>
            ))
          }
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "D MMM YYYY")
            description
            feature {
              image {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
          excerpt
          timeToRead
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
`

export default BlogPage
