import express from "express";
import Hero from "../models/Lead.js";
import { getAll, createOne, updateOne, deleteOne } from "../controllers/crudController.js";

const router = express.Router();

router.get("/", getAll(Hero));
router.post("/", createOne(Hero));


export default router;
