
import express from "express";
import GoldenTales from "../models/GoldenTales.js";

const router = express.Router();

// GET Golden Tales content
router.get("/", async (req, res) => {
  try {
    let content = await GoldenTales.findOne();

    if (!content) {
      content = await GoldenTales.create({});
    }

    res.json(content);
  } catch (error) {
    console.error("Golden Tales GET error:", error);
    res.status(500).json({
      message: "Failed to fetch Golden Tales content",
    });
  }
});

// UPDATE Golden Tales content
router.put("/", async (req, res) => {
  try {
    let content = await GoldenTales.findOne();

    if (!content) {
      content = new GoldenTales(req.body);
    } else {
      Object.assign(content, req.body);
    }

    await content.save();

    res.json({
      message: "Golden Tales content updated successfully",
      data: content,
    });
  } catch (error) {
    console.error("Golden Tales PUT error:", error);
    res.status(500).json({
      message: "Failed to update Golden Tales content",
    });
  }
});

export default router;
