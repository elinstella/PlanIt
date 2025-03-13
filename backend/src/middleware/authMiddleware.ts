import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Extends the Request object to include the authenticated user's ID.
 */
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

/**
 * Middleware to authenticate requests using a JWT token.
 * If the token is valid, the user's ID is added to the request object.
 * @param req - Incoming request object
 * @param res - Response object
 * @param next - Next function to proceed to the next middleware
 */
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = { id: decoded.userId };
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
