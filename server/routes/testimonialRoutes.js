import express from "express";
import Testimonial from "../models/Testimonial.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} from "../controllers/crudController.js";

const router = express.Router();

router.get("/", getAll(Testimonial));
router.get("/:id", getOne(Testimonial));
router.post("/", createOne(Testimonial));
router.put("/:id", updateOne(Testimonial));
router.delete("/:id", deleteOne(Testimonial));

export default router;
