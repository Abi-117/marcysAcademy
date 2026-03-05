import mongoose from "mongoose";

const AwardCertificationSchema = new mongoose.Schema(
  {
    name: String,
    subtitle: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("AwardCertification", AwardCertificationSchema);