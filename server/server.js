import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";


import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import indexRouter from "./routes/indexRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import servicesRouter from "./routes/services.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import contactRoutes from "./routes/contact.js";
import enquiryRoutes from "./routes/enquiry.js";
import performanceServicesRoutes from "./routes/performance.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/index", indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/about", aboutRoutes);

app.use("/api/services", servicesRouter);
app.use("/api/gallery", galleryRoutes);
app.use("/api/heroes", heroRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/performance-services", performanceServicesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
