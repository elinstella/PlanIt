import { Request, Response } from "express";
import User, { IUser } from "../../models/user/User"; // Ensure IUser is exported
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createToken } from "../../services/user/authService";
import { Document } from "mongoose";

// Define the extended user document type
type UserDocument = Document & IUser;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "E-post används redan" });
      return;
    }

    console.log("🔹 Hashar lösenordet...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Hashat lösenord:", hashedPassword);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Serverfel vid registrering" });
  }
};
