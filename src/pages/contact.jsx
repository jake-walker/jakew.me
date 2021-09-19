import * as React from 'react';
import { Container, Button } from 'react-bootstrap';
import {
  Mail, Linkedin, GitHub, Twitter, Key, Package, Video, Gitlab,
} from 'react-feather';
import Layout from '../components/layout';
import ContactForm from '../components/contact';

const SocialLinks = [
  {
    icon: <Mail />,
    name: 'Email',
    link: 'mailto:hi@jakew.me',
  },
  {
    icon: <Linkedin />,
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jake-walker1/',
  },
  {
    icon: <GitHub />,
    name: 'GitHub',
    link: 'https://github.com/jake-walker',
  },
  {
    icon: <Gitlab />,
    name: 'GitLab',
    link: 'https://gitlab.com/_jakew',
  },
  {
    icon: <Twitter />,
    name: 'Twitter',
    link: 'https://twitter.com/_jakewalker1',
  },
  {
    icon: <Key />,
    name: 'Keybase',
    link: 'https://keybase.io/jakew',
  },
  {
    icon: <Package />,
    name: 'NPM',
    link: 'https://www.npmjs.com/~jakew',
  },
  {
    icon: <Package />,
    name: 'PyPI',
    link: 'https://pypi.org/user/jakew1',
  },
  {
    icon: <Video />,
    name: 'asciinema',
    link: 'https://asciinema.org/~jakew',
  },
];

const ContactPage = () => (
  <Layout title="Contact">
    <section>
      <Container>
        <h1 className="title">Contact</h1>
        <ContactForm />
      </Container>
    </section>

    <section>
      <Container>
        <h1 className="title">Socials</h1>
        {
            SocialLinks.map((link) => (
              <Button key={link.name} variant="primary" href={link.link} className="me-2 mb-2">
                <span className="me-1">{link.icon}</span> {link.name}
              </Button>
            ))
          }
      </Container>
    </section>
  </Layout>
);

export default ContactPage;
