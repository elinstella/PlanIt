import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter object using the Gmail service with credentials from environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (email: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to PlanIt – Your New To-Do App!",
    text: `Hi there!

Welcome to PlanIt – the smarter way to stay organized.
With PlanIt, you can easily create, manage, and track your tasks all in one place. Whether it's daily chores or long-term goals, our app helps you stay focused and in control.

You're now subscribed and ready to get started. Let’s make things happen – one task at a time!`,
  };

  await transporter.sendMail(mailOptions);
};
