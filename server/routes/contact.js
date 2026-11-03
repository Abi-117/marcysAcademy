import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// GET contact info
router.get("/", async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      // If no contact exists, create a default one
      contact = await Contact.create({
        phone: "+91-9025849150",
        email: "marcysacademy@gmail.com",
        officeHours: "Mon-Sat: 9AM-8PM | Sun: 10AM-5PM",
        whatsappMsg: "Hello! I would like to learn more about Marcys Academy.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.2476356854904!2d80.24514417359114!3d13.08182491245498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e0008922d3%3A0xdaf61cba0ca4cec9!2sMarcys%20Academy%20of%20Music%20and%20Speech!5e1!3m2!1sen!2sin!4v1793712093599!5m2!1sen!2sin",
        description: "Classical Guitar | Guitar | Piano | Keyboard | Ukulele | Drums | Vocals | Theory of Music\nPublic Speaking Skills | Communication Skills | Acting Skills | Speech & Drama",
      });
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update contact info
router.put("/", async (req, res) => {
  try {
    const { phone, email, officeHours, whatsappMsg, mapUrl, description } = req.body;

    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact({ phone, email, officeHours, whatsappMsg, mapUrl, description });
    } else {
      contact.phone = phone;
      contact.email = email;
      contact.officeHours = officeHours;
      contact.whatsappMsg = whatsappMsg;
      contact.mapUrl = mapUrl;
      contact.description = description;
    }

    await contact.save();
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
