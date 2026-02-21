import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  officeHours: { type: String, required: true },
  whatsappMsg: { type: String, required: true },
  mapUrl: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
