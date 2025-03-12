import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createToken } from "../services/authService";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Felaktig e-post eller lösenord" });
      return;
    }

    const token = createToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Serverfel" });
  }
};
