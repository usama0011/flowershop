import express from "express";
import ContactUs from "../models/contactusmodel.js"; // The MongoDB ContactUs model

const router = express.Router();

// Create a new contact entry (POST /api/contact)
router.post("/", async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  try {
    const contact = new ContactUs({
      name,
      email,
      phoneNumber,
      message,
    });

    await contact.save(); // Save the contact in MongoDB
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Error creating contact entry", error });
  }
});

// Get all contact entries (GET /api/contact)
router.get("/", async (req, res) => {
  try {
    // Fetch all contact entries, selecting only specific fields
    const contacts = await ContactUs.find(
      {},
      "name email phoneNumber message createdAt _id"
    );
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact entries", error });
  }
});

// Get a specific contact entry by ID (GET /api/contact/:id)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the contact entry by ID in MongoDB
    const contact = await ContactUs.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact entry not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact entry", error });
  }
});

// Update a contact entry by ID (PUT /api/contact/:id)
router.put("/:id", async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  const { id } = req.params;

  try {
    // Find the contact entry by ID and update
    const updatedContact = await ContactUs.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, message },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact entry not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: "Error updating contact entry", error });
  }
});

// Delete a contact entry by ID (DELETE /api/contact/:id)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the contact entry by ID and delete
    const deletedContact = await ContactUs.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact entry not found" });
    }

    res.status(200).json({ message: "Contact entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact entry", error });
  }
});

export default router;
