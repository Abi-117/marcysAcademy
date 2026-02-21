import mongoose from "mongoose";

const performanceServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const PerformanceService = mongoose.model(
  "PerformanceService",
  performanceServiceSchema
);

export default PerformanceService;
