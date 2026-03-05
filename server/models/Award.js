import mongoose from "mongoose";

const AwardsSchema = new mongoose.Schema({

  images: [String]

});

export default mongoose.model("Awards", AwardsSchema);