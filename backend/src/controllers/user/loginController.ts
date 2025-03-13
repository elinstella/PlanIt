import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createToken } from "../../services/user/authService";
import User from "../../models/user/User";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  console.log("🔹 Login request received:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    console.log("🔹 Söker efter användare med email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Användaren hittades inte i databasen:", email);
      res.status(400).json({ message: "Felaktig e-post eller lösenord" });
      return;
    }

    console.log("✅ Användare hittad i databasen:", user);
    console.log("🔹 Användarens lagrade hashade lösenord:", user.password);
    console.log("🔹 Jämför med inskickat lösenord:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 bcrypt.compare result:", isMatch);

    if (!isMatch) {
      console.log("❌ Lösenordet matchar inte!");
      res.status(400).json({ message: "Felaktig e-post eller lösenord" });
      return;
    }

    console.log("✅ Lösenordet är korrekt!");
    const token = createToken(user._id.toString());

    console.log("🔹 Skickar tillbaka token:", token);
    console.log("✅ Token skapad vid inloggning:", token);
    res.json({ token });
  } catch (error) {
    console.error("❌ Serverfel vid inloggning:", error);
    res.status(500).json({ message: "Serverfel vid inloggning" });
  }
};
