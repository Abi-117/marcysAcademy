import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  image: String,
  amazonLink: String,
},
{ timestamps: true }
);

export default mongoose.model("Book", bookSchema);