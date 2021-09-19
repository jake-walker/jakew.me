import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Alert, Form, Button } from 'react-bootstrap';
import { CheckCircle, Send } from 'react-feather';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xzbyovoa');

  if (state.succeeded) {
    return (
      <Alert variant="success">
        <CheckCircle className="me-2"/>
        Thanks for the message! I'll be in touch soon.
      </Alert>
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name"/>
        <ValidationError prefix="Name" field="name" errors={state.errors}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="_replyto" required/>
        <ValidationError prefix="Email address" field="_replyto" errors={state.errors}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={5} name="message" required/>
        <ValidationError prefix="Message" field="message" errors={state.errors}/>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={state.submitting}>
        <Send className="me-1"/> Submit
      </Button>
    </Form>
  )
}
