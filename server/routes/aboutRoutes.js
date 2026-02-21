import express from "express";
import multer from "multer";
import About from "../models/About.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET About (only one document)
router.get("/", async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = new About();
    await about.save();
  }
  res.json(about);
});

// POST About (save all)
router.post("/", upload.single("heroImage"), async (req, res) => {
  const { heroText, story, mission, vision, values, achievements } = req.body;
  let about = await About.findOne();
  if (!about) about = new About();

  about.heroText = heroText;
  about.story = story;
  about.mission = mission;
  about.vision = vision;
  about.values = JSON.parse(values || "[]");
  about.achievements = JSON.parse(achievements || "[]");

  if (req.file) about.heroImage = req.file.filename;

  await about.save();
  res.json(about);
});

// DELETE Value by ID
router.delete("/value/:id", async (req, res) => {
  const about = await About.findOne();
  if (!about) return res.status(404).json({ message: "Not found" });

  about.values = about.values.filter((v) => v._id.toString() !== req.params.id);
  await about.save();
  res.json({ success: true });
});

// DELETE Achievement by ID
router.delete("/achievement/:id", async (req, res) => {
  const about = await About.findOne();
  if (!about) return res.status(404).json({ message: "Not found" });

  about.achievements = about.achievements.filter((a) => a._id.toString() !== req.params.id);
  await about.save();
  res.json({ success: true });
});

export default router;
