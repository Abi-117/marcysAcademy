import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
  title: String,
  subtitle: String,
  description: String,
  image: String,
  amazonLink: String,
},
{ timestamps: true }
);

export default mongoose.model("Book", bookSchema);