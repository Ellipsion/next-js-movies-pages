import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const senderName = process.env.SENDER_NAME;
const senderAddress = process.env.SENDER_EMAIL;
const serverURL = process.env.SERVER_URL || "http://localhost:3000";

export async function sendVerificationMail(name, email, token) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("No RESEND API KEY in the environment variables.");
    return null;
  }
  if (!senderName || !senderAddress) {
    console.warn(
      "No SENDER_NAME or SENDER_EMAIL in the environment variables."
    );
    return null;
  }
  try {
    const data = await resend.emails.send({
      from: `${senderName} <${senderAddress}>`,
      to: [email],
      subject: "Next.js App Email Verification",
      react: EmailTemplate({ name, token }),
    });
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const EmailTemplate = ({ name, token }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <a href={`${serverURL}/auth/verify/${token}`}>Verify email</a>
  </div>
);
