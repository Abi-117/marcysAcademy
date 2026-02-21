"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminPerformanceServiceCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // ----------------- IMAGE UPLOAD -----------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error("Cloudinary cloud name is missing!");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setImage(data.secure_url);
      } else {
        alert("Image upload failed. Check your Cloudinary settings.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  // ----------------- FORM SUBMIT -----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    try {
      await axios.post(`${API}/api/performance-services`, {
        title,
        description,
        image,
      });

      navigate("/admin/performance-services");
    } catch (err) {
      console.error("Failed to create service", err);
      alert("Create failed. See console for details.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Add Performance Service</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* TITLE */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          {/* IMAGE UPLOAD */}
          <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <p className="text-blue-500">Uploading image...</p>}
            {image && <img src={image} alt="preview" className="w-32 mt-2 rounded" />}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={uploading}
            className="relative z-10"
          >
            {uploading ? "Uploading..." : "Create Service"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPerformanceServiceCreate;
