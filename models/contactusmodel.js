import mongoose from "mongoose";

// Define the ContactUs schema
const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the ContactUs model
const ContactUs = mongoose.model("ContactUs", contactUsSchema);

// Export the ContactUs model
export default ContactUs;
