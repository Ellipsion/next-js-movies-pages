import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "Ellipsion <verify@ellipsion.tech>",
      to: ["ashishskyblue@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}

const EmailTemplate = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
