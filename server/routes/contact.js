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
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.0441462!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin",
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
