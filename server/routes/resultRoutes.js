import express from "express";
import Result from "../models/Result.js";
import {
  getOneResult,
  createResult,
  updateResult,
  deleteResult,
} from "../controllers/crudController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Result.find().sort({ createdAt: -1 });
  res.json(data);
});

router.get("/:id", getOneResult(Result));
router.post("/", createResult(Result));
router.put("/:id", updateResult(Result));
router.delete("/:id", deleteResult(Result));

export default router;
