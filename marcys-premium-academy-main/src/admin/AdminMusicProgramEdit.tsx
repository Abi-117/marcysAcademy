"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminMusicProgramEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`${API}/api/programs/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImage(res.data.image || "");
      } catch (err) {
        console.error("Failed to fetch program", err);
      }
    };
    fetchProgram();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) setImage(data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/programs/${id}`, { title, description, image });
      navigate("/admin/programs");
    } catch (err) {
      console.error("Failed to update program", err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Music Program</h1>
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
          {image && <img src={image} alt="preview" className="w-32 mt-2" />}

          <Button type="submit">Update Program</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminMusicProgramEdit;
