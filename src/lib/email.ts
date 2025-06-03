import { Resend } from "resend";

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (params: SendEmailParams) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set. Email will not be sent.");
    console.log("---- EMAIL DETAILS (Not Sent) ----");
    console.log("To:", params.to);
    console.log("Subject:", params.subject);
    console.log("Text:", params.text);
    if (params.html) {
      console.log("HTML:", params.html);
    }
    console.log("-----------------------------------");

    return Promise.resolve();
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Petclinic <onboarding@resend.dev>",
      to: params.to,
      subject: params.subject,
      html: params.html || `<p>${params.text}</p>`,
      text: params.text,
    });

    if (error) {
      console.error("Error sending email with Resend:", error);
      console.log("---- EMAIL DETAILS (Resend Failed) ----");
      console.log("To:", params.to);
      console.log("Subject:", params.subject);
      console.log("Text:", params.text);
      if (params.html) {
        console.log("HTML:", params.html);
      }
      console.log("---------------------------------------");
      throw error;
    }

    console.log("Email sent successfully with Resend:", data);
    return data;
  } catch (e) {
    console.error("Exception when trying to send email:", e);

    console.log(`---- EMAIL DETAILS (Exception) ----
To: ${params.to}
Subject: ${params.subject}
Text: ${params.text}
HTML: ${params.html || "N/A"}
-----------------------------------`);
    throw e;
  }
};
