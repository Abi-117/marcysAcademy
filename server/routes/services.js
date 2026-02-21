import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 }); // 🔹 sort by order
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE service
router.post("/", async (req, res) => {
  try {
    // Find current max order
    const lastService = await Service.findOne().sort({ order: -1 });
    const order = lastService ? lastService.order + 1 : 0;

    const service = new Service({ ...req.body, order });
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create service" });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted", service: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// REORDER SERVICES
// REORDER SERVICES
router.put("/reorder", async (req, res) => {
  try {
    const { services } = req.body; // [{ _id, order }, ...]
    if (!Array.isArray(services)) return res.status(400).json({ message: "Invalid data" });

    const bulkOps = services.map((s) => ({
      updateOne: {
        filter: { _id: s._id },
        update: { $set: { order: s.order } },
      },
    }));

    await Service.bulkWrite(bulkOps);
    res.json({ message: "Order updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
