import * as React from 'react';
import './layout.css';
import '../styles/main.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const Layout = ({ title, description, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle: title
          defaultDescription: description
          siteUrl
          twitterUsername
          ogImage
        }
      }
    }
  `);

  let mainTitle = data.site.siteMetadata.siteTitle;
  let seoTitle = data.site.siteMetadata.siteTitle;
  if (title) {
    mainTitle = `${title} | ${data.site.siteMetadata.siteTitle}`;
    seoTitle = title;
  }

  let seoDescription = description;
  if (!description) {
    seoDescription = data.site.siteMetadata.defaultDescription;
  }

  return (
    <>
      <GatsbySeo
        title={mainTitle}
        description={seoDescription}
        language="en"
        openGraph={{
          url: data.site.siteMetadata.siteUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: data.site.siteMetadata.ogImage,
            },
          ],
          site_name: data.site.siteMetadata.siteTitle,
          locale: 'enGB',
        }}
        twitter={{
          handle: data.site.siteMetadata.twitterUsername,
          site: data.site.siteMetadata.twitterUsername,
          cardType: 'summary_large_image',
        }}
      />

      <div id="site">
        <Navbar bg="primary" variant="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand>{data.site.siteMetadata.siteTitle}</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" activeClassName="active" to="/">Home</Link>
                <Link className="nav-link" activeClassName="active" to="/blog">Blog</Link>
                <Link className="nav-link" activeClassName="active" to="/contact">Contact</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main>
          {children}
        </main>

        <footer className="bg-light">
          <Container className="text-center py-3 fw-lighter">
            <b>{data.site.siteMetadata.siteTitle}</b>.
            The <a href="https://github.com/jake-walker/jakew.me">source code</a> is licensed
            under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL v3.0</a> and
            website content is licensed under <a href="http://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>.
          </Container>
        </footer>
      </div>
    </>
  );
};

export default Layout;
