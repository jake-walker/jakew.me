import * as React from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import Layout from '../components/layout';
import { Mail, Linkedin, GitHub, Twitter, Key, Package, Video, Gitlab, Send } from 'react-feather';

const SocialLinks = [
  {
    icon: <Mail/>,
    name: "Email",
    link: "mailto:hi@jakew.me"
  },
  {
    icon: <Linkedin/>,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/jake-walker1/"
  },
  {
    icon: <GitHub/>,
    name: "GitHub",
    link: "https://github.com/jake-walker"
  },
  {
    icon: <Gitlab/>,
    name: "GitLab",
    link: "https://gitlab.com/_jakew"
  },
  {
    icon: <Twitter/>,
    name: "Twitter",
    link: "https://twitter.com/_jakewalker1"
  },
  {
    icon: <Key/>,
    name: "Keybase",
    link: "https://keybase.io/jakew"
  },
  {
    icon: <Package/>,
    name: "NPM",
    link: "https://www.npmjs.com/~jakew"
  },
  {
    icon: <Package/>,
    name: "PyPI",
    link: "https://pypi.org/user/jakew1"
  },
  {
    icon: <Video/>,
    name: "asciinema",
    link: "https://asciinema.org/~jakew"
  }
]

const ContactPage = () => {
  return (
    <Layout title="Contact">
      <section>
        <Container>
          <h1 className="title">Contact</h1>
          <Form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
            <input type="hidden" name="bot-field"/>
            <input type="hidden" name="form-name" value="contact"/>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} name="message"/>
            </Form.Group>

            <Button variant="primary" type="submit">
              <Send className="me-1"/> Submit
            </Button>
          </Form>
        </Container>
      </section>

      <section>
        <Container>
          <h1 className="title">Socials</h1>
          {
            SocialLinks.map(link => (
              <Button key={link.name} variant="primary" href={link.link} className="me-2 mb-2">
                <span className="me-1">{link.icon}</span> {link.name}
              </Button>
            ))
          }
        </Container>
      </section>
    </Layout>
  )
}

export default ContactPage
