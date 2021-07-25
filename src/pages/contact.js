import * as React from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import Layout from '../components/layout';

const SocialLinks = [
  {
    name: "Email",
    link: "mailto:hi@jakew.me"
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/jake-walker1/"
  },
  {
    name: "GitHub",
    link: "https://github.com/jake-walker"
  },
  {
    name: "GitLab",
    link: "https://gitlab.com/_jakew"
  },
  {
    name: "Twitter",
    link: "https://twitter.com/_jakewalker1"
  },
  {
    name: "Keybase",
    link: "https://keybase.io/jakew"
  },
  {
    name: "NPM",
    link: "https://www.npmjs.com/~jakew"
  },
  {
    name: "PyPI",
    link: "https://pypi.org/user/jakew1"
  },
  {
    name: "asciinema",
    link: "https://asciinema.org/~jakew"
  }
]

const ContactPage = () => {
  return (
    <Layout title="Contact">
      <section>
        <Container>
          <h1>Contact</h1>
          <Form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
            <input type="hidden" name="bot-field"/>
            <input type="hidden" name="form-name" value="contact"/>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </section>

      <section>
        <Container>
          <h1>Socials</h1>
          {
            SocialLinks.map(link => (
              <Button key={link.name} variant="primary" href={link.link} className="me-2">
                {link.name}
              </Button>
            ))
          }
        </Container>
      </section>
    </Layout>
  )
}

export default ContactPage
