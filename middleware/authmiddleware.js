// Importing JWT
import jwt from "jsonwebtoken";

// Auth Middleware to check JWT Token
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ message: "Access denied, token missing" });

  try {
    // Verifying token
    const verified = jwt.verify(token, "secretKey"); // Use environment variable for the secret in production
    req.user = verified; // Attach user information to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Export default or named export if there are other middleware functions
export default authenticateToken;
