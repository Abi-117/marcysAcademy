import mongoose from "mongoose";

const valueSchema = new mongoose.Schema({
  icon: String, // store icon name, e.g., "Target"
  title: String,
  description: String,
});

const achievementSchema = new mongoose.Schema({
  value: String,
  label: String,
});

const aboutSchema = new mongoose.Schema(
  {
    heroText: String,
    heroImage: String,
    story: String,
    mission: String,
    vision: String,
    values: [valueSchema],
    achievements: [achievementSchema],
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
