import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Skapa en typ som inkluderar userId
interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Åtkomst nekad. Ingen token tillhandahållen." });
    return; // Viktigt! Avslutar funktionen korrekt
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded.userId) {
      res.status(401).json({ message: "Ogiltig token: userId saknas." });
      return; // Viktigt! Annars körs next()
    }

    req.userId = decoded.userId; // Lägg till userId på AuthRequest
    next();
  } catch (error) {
    res.status(401).json({ message: "Ogiltig token." });
    return; // Viktigt! Förhindrar att next() körs efter ett fel
  }
};

export default authMiddleware;
