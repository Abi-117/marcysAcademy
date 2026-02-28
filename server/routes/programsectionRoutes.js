import express from "express";
import Program from "../models/Programs.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/:section", async (req, res) => {
  try {
    const program = await Program.findOne({ section: req.params.section });
    res.json(program || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:section", upload.single("image"), async (req, res) => {
  try {
    const { title, paragraphs } = req.body;

    let parsedParagraphs = [];
    try {
      parsedParagraphs = paragraphs ? JSON.parse(paragraphs) : [];
    } catch {}

    const updateData = {
      title,
      paragraphs: parsedParagraphs,
      section: req.params.section, // IMPORTANT!
    };

    if (req.file && req.file.path) updateData.image = req.file.path;

    const program = await Program.findOneAndUpdate(
      { section: req.params.section },
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;