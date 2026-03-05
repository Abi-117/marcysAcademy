import express from "express";
import PerformanceService from "../models/Performance.js";

const router = express.Router();

// GET all performance services
router.get("/", async (req, res) => {
  try {
    const services = await PerformanceService.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await PerformanceService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE service
router.post("/", async (req, res) => {
  try {
    const service = new PerformanceService(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE service
router.put("/:id", async (req, res) => {
  try {
    const service = await PerformanceService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    const service = await PerformanceService.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const service = await PerformanceService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
