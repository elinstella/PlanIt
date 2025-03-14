import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for user authentication.
 * @param userId - The user's ID
 * @returns A signed JWT token
 */
export const createToken = (userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  console.log("🔑 JWT Token Created:", token); // ✅ Log the generated token
  return token;
};
