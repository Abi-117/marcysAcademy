import express from "express";
import { getBook, saveBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", saveBook);

export default router;