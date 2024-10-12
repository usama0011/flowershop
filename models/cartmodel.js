import mongoose from "mongoose";
import User from "../models/usermodel.js"; // Import the User model

// Define the Cart schema
const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

// Export the Cart model
export default Cart;
