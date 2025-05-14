import { defineAction, ActionError } from "astro:actions";
import sanitizeHtml from "sanitize-html";
import { z } from "astro:schema";

async function validateTurnstileToken(turnstileSecretKey: string, turnstileToken: string, ip: string): Promise<boolean> {
  const formData = new FormData();
  formData.append('secret', turnstileSecretKey);
  formData.append('response', turnstileToken);
  formData.append('remoteip', ip);

  console.log(`Sending challenge (secret=${turnstileSecretKey}, res=${turnstileToken}, ip=${ip})`);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    body: formData,
    method: 'POST'
  });

  const outcome = await result.json() as any;

  console.log(`Got Turnstile response: ${JSON.stringify(outcome)}`);

  return outcome.success as boolean;
}

export const server = {
  submitContact: defineAction({
    accept: 'form',
    input: z.object({
      "name": z.string().trim().min(1, { message: "Your name is required" }),
      "email": z.string().trim().email({ message: "Your email must be valid" }).min(1, { message: "Your email is required" }),
      "message": z.string().trim().min(20, { message: "Your message must be more than 20 characters" }),
      "cf-turnstile-response": z.string()
    }),
    handler: async ({ name, email, message, "cf-turnstile-response": turnstileToken }, { request }) => {
      const ip = request.headers.get("cf-connecting-ip");

      console.log(`Got request IP of ${ip}`);

      if (!(await validateTurnstileToken(import.meta.env.TURNSTILE_SECRET_KEY, turnstileToken, ip))) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid CAPTCHA"
        });
      }

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        body: JSON.stringify({
          sender: {
            name: name,
            email: import.meta.env.NOTIFICATION_SENDER
          },
          to: [
            {
              email: import.meta.env.NOTIFICATION_RECIPIENT_EMAIL,
              name: import.meta.env.NOTIFICATION_RECIPIENT_NAME
            }
          ],
          replyTo: {
            email: email
          },
          subject: "New Contact Form Submission",
          htmlContent: `<html><head></head><body><p>Hello ${import.meta.env.NOTIFICATION_RECIPIENT_NAME},</p><p>You have a new enquiry form submission on your website:</p><p><ul><li>Name: ${sanitizeHtml(name)}</li><li>Email: ${sanitizeHtml(email)}</li><li>Message: ${sanitizeHtml(message)}</li></p></body></html>`
        }),
        headers: {
          "Accept": "application/json",
          "Api-Key": import.meta.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      });

      if (res.status < 200 || res.status >= 300) {
        console.error(`Failed to send email (status ${res.status}):`, await res.text());
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send message"
        });
      }

      return "Message sent!";
    }
  })
}
