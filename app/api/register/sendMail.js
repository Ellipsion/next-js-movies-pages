import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const senderName = process.env.SENDER_NAME;
const senderAddress = process.env.SENDER_EMAIL;

export default async function sendVerificationMail(name, email, token) {
  if (!senderName || !senderAddress) {
    throw new Error("No email environment variables");
  }
  try {
    const data = await resend.emails.send({
      from: `${senderName} <${senderAddress}>`,
      to: [email],
      subject: "Next.js App Email Verification",
      react: EmailTemplate({ name, token }),
    });
    console.log("Mail sent to", email);
    return data;
  } catch (error) {
    return { error };
  }
}

const EmailTemplate = ({ name, token }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <a href={`http://localhost:3000/auth/verify/${token}`}>Verify email</a>
  </div>
);
