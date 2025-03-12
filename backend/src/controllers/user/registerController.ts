import { Request, Response } from "express";
import { User } from "../../models/user/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createToken } from "../../services/user/authService";

// Här använder vi Promise<void> som returtyp
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "E-post används redan" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Serverfel" });
  }
};
