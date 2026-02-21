import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);
