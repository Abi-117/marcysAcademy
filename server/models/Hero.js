import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Hero", heroSchema);
