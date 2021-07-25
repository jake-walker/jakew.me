import * as React from 'react';
import './layout.css';
import '../styles/main.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { graphql, Link, useStaticQuery } from 'gatsby';

const Layout = ({ title, description, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <meta charSet="utf-8"/>
      <title>{title} | {data.site.siteMetadata.title}</title>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand>{data.site.siteMetadata.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav"/>
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
    </>
  )
}

export default Layout
