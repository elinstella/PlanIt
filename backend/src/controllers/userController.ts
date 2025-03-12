import { Request, Response } from "express";
import { User } from "../models/User";

// Utöka Request-typen för att inkludera userId
interface AuthRequest extends Request {
  userId?: string;
}

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Ej auktoriserad" });
      return; // Viktigt! Avsluta funktionen här
    }

    const user = await User.findById(req.userId).select("-password"); // Fix: använd AuthRequest med userId
    if (!user) {
      res.status(404).json({ message: "Användare hittades inte" });
      return; // Avsluta funktionen om användaren inte hittas
    }

    res.json(user); // Skicka svaret utan att returnera något
  } catch (error) {
    res.status(500).json({ message: "Serverfel" });
  }
};
