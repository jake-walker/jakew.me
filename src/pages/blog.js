import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/layout';
import PostCard from '../components/post-card';
import { graphql } from 'gatsby';

const BlogPage = ({ data }) => {
  return (
    <Layout title="Blog">
      <section>
        <Container>
          <h1>Blog</h1>
          <Row>
            {
              data.allMdx.edges.map(({ node }) => (
                <Col key={node.id} xs={12} lg={4}>
                  <PostCard post={node}/>
                </Col>
              ))
            }
          </Row>
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
  }
`

export default BlogPage
