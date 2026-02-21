import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  interest: String,
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);
