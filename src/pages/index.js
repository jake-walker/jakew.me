import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react'
import { Container } from 'react-bootstrap';
import { ArrowRight } from 'react-feather';
import Layout from '../components/layout';
import PostCard from '../components/post-card';

const IndexPage = ({ data }) => {
  return (
    <Layout title="Home">
      <section className="bg-primary text-white text-center main-hero">
        <Container>
          <StaticImage alt="Avatar" src="../images/avatar.png" width={150} height={150} className="m-4 rounded-circle avatar"/>
          <h1>Jake Walker</h1>
        </Container>
      </section>
      <section>
        <Container>
          <p className="lead">
            Hi! I'm Jake Walker, a tech enthusiast and developer living in the United Kingdom.
          </p>
          <p>
            At the moment, I enjoy web development (including frontend and backend) and Python
            development and I am trying to get more into open source software. I also enjoy managing
            a handful of cloud hosted applications a Raspberry Pi home server and other small
            Arduino/Raspberry Pi projects at home. I am currently learning about cyber security.
          </p>
          <p>
            When I was around 7 years old, I started programming, starting off with
            the <a href="http://smallbasic.com/">Small Basic</a> programming language. Ever since I
            have been refining my programming skills by learning more complex languages and by
            creating small applications, websites and more. In 2015, I
            started <a href="https://github.com/jake-walker">my GitHub account</a> and began to
            contribute to open source software and published some of my own projects.
          </p>
        </Container>
      </section>
      <section>
        <Container>
          <h2 className="title">Latest Blog Posts</h2>
          {
            data.allMdx.edges.map(({ node }) => (
              <PostCard key={node.id} post={node}/>
            ))
          }
          <Link to="/blog" className="btn btn-primary float-end"><ArrowRight className="me-1"/> More</Link>
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
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

export default IndexPage
