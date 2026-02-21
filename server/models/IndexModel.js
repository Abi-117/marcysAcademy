import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  icon: String, // store icon name as string (e.g., "Users")
  value: String,
  label: String,
});

const IndexSchema = new mongoose.Schema({
  heroText: String,
  heroSubText: String,
  heroCTA: String,
  stats: [StatSchema],
  aboutTitle: String,
  aboutSubTitle: String,
  aboutDescription: String,
  aboutPoints: [String],
  ctaTitle: String,
  ctaDescription: String,
  ctaButtonText: String,
});

export default mongoose.model("Index", IndexSchema);
