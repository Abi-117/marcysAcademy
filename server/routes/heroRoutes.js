import express from "express";
import Hero from "../models/Hero.js";
import { getAll, createOne, updateOne, deleteOne } from "../controllers/crudController.js";

const router = express.Router();

router.get("/", getAll(Hero));
router.post("/", createOne(Hero));
router.put("/:id", updateOne(Hero));
router.delete("/:id", deleteOne(Hero));

export default router;
