import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  image: { type: String }, 
}, { timestamps: true });

// This prevents the "Cannot overwrite model once compiled" error
const Program = mongoose.models.Program || mongoose.model("Program", programSchema);

export default mongoose.model("ProgramService", programSchema);