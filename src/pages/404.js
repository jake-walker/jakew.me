import { Link } from "gatsby"
import * as React from "react"
import { Container } from "react-bootstrap"
import Layout from "../components/layout"

const NotFoundPage = () => {
  return (
    <Layout title="Not Found">
      <section>
        <Container>
          <h1 className="title">404</h1>
          <p className="lead">
            Whoops, you've hit a dead end. Would you like to go back <Link to="/">home</Link>?
          </p>
        </Container>
      </section>
    </Layout>
  )
}

export default NotFoundPage
