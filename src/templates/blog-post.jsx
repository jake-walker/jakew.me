import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { BlogPostJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/layout';

import 'prismjs/themes/prism-okaidia.css';
import './blog-post.css';
import TableOfContents from '../components/table-of-contents';

const Blockquote = (props) => <blockquote className="blockquote text-end" {...props} />;
const Table = (props) => <table className="table" {...props} />;

const components = {
  blockquote: Blockquote,
  table: Table,
};

const OldPostWarning = () => (
  <Alert variant="secondary" className="mb-5">
    <strong>This post is at least 4 years old. This post is being kept
      around in case it contains any useful information.
    </strong> Please
    keep in mind that some of the information contained in this post
    may be outdated and links may be broken. The post may not reflect my
    current thoughts and feelings.
  </Alert>
);

const PostLayout = ({ data }) => {
  console.log(data.mdx);

  const oldPost = ((new Date()).getFullYear()
                   - (new Date(data.mdx.frontmatter.rawDate)).getFullYear()) > 4;
  const url = `${data.site.siteMetadata.siteUrl}/${data.mdx.frontmatter.slug}`;
  const description = data.mdx.frontmatter.description || data.mdx.excerpt;

  return (
    <Layout title={data.mdx.frontmatter.title} description={description}>
      <GatsbySeo
        openGraph={{
          title: data.mdx.frontmatter.title,
          description,
          url,
          type: 'article',
          article: {
            publishedTime: data.mdx.frontmatter.rawDate,
            tags: data.mdx.frontmatter.tags,
          },
        }}
      />
      <BlogPostJsonLd
        url={url}
        title={data.mdx.frontmatter.title}
        dataPublished={data.mdx.frontmatter.rawDate}
        authorName={data.site.siteMetadata.author}
        description={description}
      />
      <section className="bg-light">
        <Container>
          <h1>{data.mdx.frontmatter.title}</h1>
          <p className="lead">{data.mdx.frontmatter.date} &bull; {data.mdx.timeToRead} min read</p>
        </Container>
      </section>
      <section>
        <Container fluid>
          <Row>
            <Col lg={2} className="d-none d-lg-block">
              {data.mdx.tableOfContents.items && <TableOfContents toc={data.mdx.tableOfContents} />}
            </Col>
            <Col lg={8} sm={12}>
              <Container className="post pt-3">
                {oldPost && <OldPostWarning />}
                <MDXProvider components={components}>
                  <MDXRenderer>
                    {data.mdx.body}
                  </MDXRenderer>
                </MDXProvider>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        rawDate: date
        description
        tags
        slug
        feature {
          image {
            publicURL
          }
        }
      }
      timeToRead
      body
      excerpt
      tableOfContents(maxDepth: 3)
    }
    site {
      siteMetadata {
        siteUrl
        author
      }
    }
  }
`;

export default PostLayout;
