import express from "express";
import IndexModel from "../models/IndexModel.js";

const router = express.Router();

// GET Index data
router.get("/", async (req, res) => {
  try {
    const indexData = await IndexModel.findOne({});
    res.json(indexData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST / UPDATE Index data
router.post("/", async (req, res) => {
  try {
    let indexData = await IndexModel.findOne({});
    if (!indexData) indexData = new IndexModel(req.body);
    else Object.assign(indexData, req.body);

    await indexData.save();
    res.json(indexData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
