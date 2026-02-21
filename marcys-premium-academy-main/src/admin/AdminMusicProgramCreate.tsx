"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminMusicProgramCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImage(data.secure_url);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload image");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API}/api/programs`,
        { title, description, image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      navigate("/admin/programs");
    } catch (err) {
      console.error("Failed to create program", err);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Add Music Program</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {uploading && <p>Uploading image...</p>}

          {image && (
            <img
              src={image}
              alt="preview"
              className="w-32 mt-2 rounded shadow"
            />
          )}

          <Button type="submit" disabled={loading || uploading}>
            {loading ? "Creating..." : "Create Program"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminMusicProgramCreate;