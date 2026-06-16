const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("=================================");
    console.log("Sending mail...");
    console.log("To:", receiverEmail);
    console.log("Subject:", subject);
    console.log("=================================");

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: receiverEmail,
      subject,
      html: body,
    });

    if (error) {
      console.error("MAIL SEND ERROR:", error);
      throw new Error(error.message || "Failed to send email");
    }

    console.log("MAIL SENT SUCCESSFULLY:", data?.id);
    return data;
  } catch (error) {
    console.error("MAIL SEND ERROR:", error);
    throw error;
  }
};
