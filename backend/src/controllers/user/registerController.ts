import { Request, Response } from "express";
import User from "../../models/user/User";
import bcrypt from "bcryptjs";
import { createToken } from "../../services/user/authService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const verificationCodes = new Map(); // Temporary storage for verification codes

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Validates the password based on length, uppercase, and numeric requirements.
 * @param password - The password to validate
 * @returns Error message if invalid, otherwise null
 */
const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  return null;
};

/**
 * Handles user registration by validating the password, checking for existing email,
 * hashing the password, generating a verification code, and sending it via email.
 * @param req - Express request object
 * @param res - Express response object
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Validate the password
  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400).json({ message: passwordError });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, verificationCode);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    });

    res.status(200).json({ message: "Verification code sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
  }
};

/**
 * Verifies the email verification code and creates a new user if the code is correct.
 * @param req - Express request object
 * @param res - Express response object
 */
export const verifyEmailCode = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, code } = req.body;

  // Validate the password
  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400).json({ message: passwordError });
    return;
  }

  try {
    if (verificationCodes.get(email) !== code) {
      res.status(400).json({ message: "Invalid verification code." });
      return;
    }

    verificationCodes.delete(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error during verification." });
  }
};
