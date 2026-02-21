import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 }, // 🔹 new field for ordering
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
