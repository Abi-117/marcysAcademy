import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Gallery from "../models/Gallery.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


// ✅ CREATE IMAGE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "gallery" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newItem = await Gallery.create({
          title: req.body.title,
          category: req.body.category,
          image: result.secure_url
        });

        res.json(newItem);
      }
    );

    result.end(req.file.buffer);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ GET ALL
router.get("/", async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  res.json(items);
});


// ✅ DELETE
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
