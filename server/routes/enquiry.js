import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

// POST /api/enquiry - create new enquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const enquiry = await Enquiry.create({ name, email, phone, message });
    res.json(enquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/enquiry - fetch all enquiries (for admin)
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
