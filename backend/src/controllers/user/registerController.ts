// import { Request, Response } from "express";
// import User, { IUser } from "../../models/user/User"; // Ensure IUser is exported
// import bcrypt from "bcryptjs";
// import { validationResult } from "express-validator";
// import { createToken } from "../../services/user/authService";
// import { Document } from "mongoose";
// import nodemailer from "nodemailer";


// const verificationCodes = new Map(); // Store codes temporarily


// // Define the extended user document type
// type UserDocument = Document & IUser;

// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ message: "E-post används redan" });
//       return;
//     }

//     console.log("🔹 Hashar lösenordet...");
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("✅ Hashat lösenord:", hashedPassword);

//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = createToken(user._id.toString());
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Serverfel vid registrering" });
//   }
// };
import { Request, Response } from "express";
import User from "../../models/user/User";
import bcrypt from "bcryptjs";
import { createToken } from "../../services/user/authService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Ladda .env-variabler

const verificationCodes = new Map(); // Store codes temporarily

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Funktion för att validera lösenord (utan specialtecken)
const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Lösenordet måste vara minst 8 tecken långt";
  }
  if (!/[A-Z]/.test(password)) {
    return "Lösenordet måste innehålla minst en stor bokstav";
  }
  if (!/[0-9]/.test(password)) {
    return "Lösenordet måste innehålla minst en siffra";
  }
  return null;
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  console.log("📨 Försöker registrera användare:", { name, email });

  // Kontrollera lösenordet
  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400).json({ message: passwordError });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "E-post används redan" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, verificationCode);
    console.log("📧 Genererad verifieringskod:", verificationCode);

    console.log("📤 Skickar e-post till:", email);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifieringskod",
      text: `Din verifieringskod är: ${verificationCode}`,
    });

    console.log("✅ E-post skickad!");
    res.status(200).json({ message: "Verifieringskod skickad" });
  } catch (error) {
    console.error("❌ Serverfel vid registrering:", error);
    res.status(500).json({ message: "Serverfel vid registrering" });
  }
};



export const verifyEmailCode = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, code } = req.body;

  console.log("🔍 Inkommande data till verifyEmailCode:", req.body);

  // Kontrollera lösenordet
  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400).json({ message: passwordError });
    return;
  }

  try {
    if (verificationCodes.get(email) !== code) {
      res.status(400).json({ message: "Felaktig kod" });
      return;
    }
    
    verificationCodes.delete(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    console.error("❌ Serverfel vid verifiering:", error);
    res.status(500).json({ message: "Serverfel vid verifiering" });
  }
};