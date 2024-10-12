import express from "express";
import Cart from "../models/cartmodel.js";
import authenticateToken from "../middleware/authmiddleware.js"; // Import the auth middleware

const router = express.Router();

// Add to Cart (Protected Route)
router.post("/add", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming req.user contains user info from the JWT middleware

  try {
    const cartItem = new Cart({ productId, quantity, userId });
    await cartItem.save(); // Save the cart item in MongoDB
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: "Error adding to cart", error });
  }
});

// Get User Cart Items (Protected Route)
router.get("/user", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Assuming req.user contains user info from the JWT middleware

  try {
    const cartItems = await Cart.find({ userId }); // Use find() to get all cart items for the user
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

export default router;
