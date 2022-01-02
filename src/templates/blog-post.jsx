import { graphql } from 'gatsby';
import * as React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { BlogPostJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo';
import Layout from '../components/layout';

import 'prismjs/themes/prism-okaidia.css';
import './blog-post.css';

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
  const oldPost = ((new Date()).getFullYear()
                   - (new Date(data.post.raw_date)).getFullYear()) > 4;
  const url = `${data.site.siteMetadata.siteUrl}/blog/${data.post.slug}`;
  const ogTitle = data.post.og_title || data.post.title;
  const ogDescription = data.post.og_description || data.post.excerpt;
  const ogImage = data.post.og_image || data.post.feature_image;

  return (
    <Layout title={data.post.title} description={ogDescription}>
      <GatsbySeo
        openGraph={{
          title: ogTitle,
          description: ogDescription,
          url,
          type: 'article',
          article: {
            publishedTime: data.post.raw_date,
            modifiedTime: data.post.updated_at,
            tags: data.post.tags.map((tag) => tag.name),
          },
          images: [
            {
              url: ogImage,
            },
          ],
        }}
      />
      <BlogPostJsonLd
        url={url}
        title={ogTitle}
        images={[ogImage]}
        dataPublished={data.post.raw_date}
        dateModified={data.post.updated_at}
        authorName={data.post.primary_author.name}
        description={ogDescription}
      />
      <section className="bg-light">
        <Container>
          <h1>{data.post.title}</h1>
          <p className="lead">{data.post.published_at} &bull; {data.post.reading_time} min read &bull; <span className="fw-lighter">by {data.post.primary_author.name}</span></p>
        </Container>
      </section>
      <section className="post">
        <Container>
          {oldPost && <OldPostWarning />}
          <div dangerouslySetInnerHTML={{ __html: data.post.childHtmlRehype.html }} />
        </Container>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    post: ghostPost(id: {eq: $id}) {
      title
      published_at(formatString: "D MMM YYYY")
      raw_date: published_at
      excerpt
      og_title
      og_description
      og_image
      reading_time
      childHtmlRehype {
        html
      }
      slug
      primary_author {
        name
      }
      tags {
        name
      }
      feature_image
      updated_at
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default PostLayout;
