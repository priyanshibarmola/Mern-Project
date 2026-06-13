const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("MAIL SERVER ERROR:", error);
  } else {
    console.log("MAIL SERVER READY");
  }
});

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("=================================");
    console.log("Sending mail...");
    console.log("From:", process.env.EMAIL);
    console.log("To:", receiverEmail);
    console.log("Subject:", subject);
    console.log("=================================");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject,
      html: body,
    });

    console.log("MAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("MAIL SEND ERROR:");
    console.error(error);
    throw error;
  }
};
