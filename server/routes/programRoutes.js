import express from "express";
import Program from "../models/Program.js";

const router = express.Router();

/* ======================
GET ALL PROGRAMS
====================== */
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
GET SINGLE PROGRAM (EDIT)
====================== */
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
CREATE PROGRAM
====================== */
router.post("/", async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
UPDATE PROGRAM
====================== */
router.put("/:id", async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
DELETE PROGRAM
====================== */
router.delete("/:id", async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;