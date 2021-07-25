import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../components/layout';
import { MDXProvider } from "@mdx-js/react"

import "prismjs/themes/prism-okaidia.css";
import "./blog-post.css";

const Blockquote = props => <blockquote className="blockquote text-end" {...props}/>
const Table = props => <table className="table" {...props}/>

const components = {
  blockquote: Blockquote,
  table: Table
}

const PostLayout = ({ data }) => {
  return (
    <Layout title={data.mdx.frontmatter.title} description={data.mdx.frontmatter.description || data.mdx.excerpt}>
      <section className="bg-light">
        <Container>
          <h1>{data.mdx.frontmatter.title}</h1>
          <p className="lead">{data.mdx.frontmatter.date} &bull; {data.mdx.timeToRead} min read</p>
        </Container>
      </section>
      <section className="post">
        <Container>
          <MDXProvider components={components}>
            <MDXRenderer>
              {data.mdx.body}
            </MDXRenderer>
          </MDXProvider>
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
      }
      timeToRead
      body
      excerpt
    }
  }
`

export default PostLayout
