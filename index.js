// Importing required modules using ES6 import syntax
import express from "express";
import mongoose from "mongoose"; // Import Mongoose for MongoDB connection
import userRoutes from "./routes/userroute.js"; // Ensure to add .js extension in ES6
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import dotenv from "dotenv"; // Load environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "https://gregarious-toffee-87b977.netlify.app/#" ||
      origin === "https://gregarious-toffee-87b977.netlify.app/login" ||
      origin === "https://gregarious-toffee-87b977.netlify.app/register" ||
      origin === "http://127.0.0.1:5500"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle OPTIONS requests for preflight checks
app.options("*", cors(corsOptions)); // This allows preflight requests

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/", (req, res) => {
  res.status(200).send("Flowers Website Work Server");
});

// MongoDB connection string
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://usama:usama@cluster0.ze2w4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
