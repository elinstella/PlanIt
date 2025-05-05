import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Din Gmail-adress
    pass: process.env.EMAIL_PASS, // App-lösenordet från Gmail
  },
});

export const sendEmail = async (email: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Ditt meddelande från vår app",
    text: "Hej! Här kommer ett meddelande från vår app.",
  };

  await transporter.sendMail(mailOptions);
};
