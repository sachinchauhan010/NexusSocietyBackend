import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to Gmail SMTP
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587, // Ensure port is a number
  secure: process.env.SMTP_SECURE === 'true', // Convert string to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMailUser = async (to, subject, text, html) => {
  if (!to || !subject || !text) {
    throw new Error("Missing required fields");
  }

  try {
    const info = await transporter.sendMail({
      from: '"Nexus Society" <noreply@nexussociety.com>',
      to, // Accepts array format
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send emails");
  }
};

export default sendMailUser;
