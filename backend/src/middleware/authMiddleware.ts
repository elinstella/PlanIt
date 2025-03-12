import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with a specific user type if needed
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return; // Ensure function exits after sending response
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach decoded user data to the request

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
    return; // Exit function to satisfy TypeScript
  }
};

export default authMiddleware;
