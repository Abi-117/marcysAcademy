import express from "express";

import {
  getAwards,
  createAward,
  updateAward,
  deleteAward,
  uploadImages,
  addGalleryImages,
  deleteGalleryImage,
} from "../controllers/awardController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAwards);

router.post("/", createAward);

router.put("/:id", updateAward);

router.delete("/:id", deleteAward);

router.post("/upload", upload.array("images", 10), uploadImages);

// router.get("/images", getImages);

router.post("/gallery", addGalleryImages);
router.post("/gallery/delete", deleteGalleryImage);

export default router;