"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

interface Award {
  _id?: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

const AdminAwardsPage = () => {

  const [awards, setAwards] = useState<Award[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [form, setForm] = useState<Award>({
    name: "",
    subtitle: "",
    description: "",
    image: ""
  });

  const [uploading, setUploading] = useState(false);

  // ================= FETCH DATA =================

  const fetchAwards = async () => {
    try {
      const res = await axios.get(`${API}/api/awards`);

      setAwards(res.data.certifications || []);
      setGalleryImages(res.data.images || []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // ================= CLOUDINARY IMAGE UPLOAD =================

  const uploadToCloudinary = async (file: File) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    return data.secure_url;
  };

  // ================= AWARD IMAGE UPLOAD =================

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files?.[0]) return;

    setUploading(true);

    const url = await uploadToCloudinary(e.target.files[0]);

    setForm({ ...form, image: url });

    setUploading(false);
  };

  // ================= MULTIPLE GALLERY SELECT =================

  const handleGallerySelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setSelectedImages(files);
  };

  // ================= MULTIPLE IMAGE UPLOAD =================

  const handleGalleryUpload = async () => {

    if (selectedImages.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {

      const url = await uploadToCloudinary(file);

      uploadedUrls.push(url);

    }

    await axios.post(`${API}/api/awards/gallery`, {
      images: uploadedUrls
    });

    setSelectedImages([]);

    fetchAwards();

    setUploading(false);
  };

  // ================= DELETE GALLERY IMAGE =================

  const deleteGalleryImage = async (img: string) => {

    await axios.post(`${API}/api/awards/gallery/delete`, {
      image: img
    });

    fetchAwards();
  };

  // ================= CREATE / UPDATE =================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(`${API}/api/awards/${editingId}`, form);

      } else {

        await axios.post(`${API}/api/awards`, form);

      }

      setForm({
        name: "",
        subtitle: "",
        description: "",
        image: ""
      });

      setEditingId(null);

      fetchAwards();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================

  const handleEdit = (award: Award) => {

    setForm({
      name: award.name,
      subtitle: award.subtitle,
      description: award.description,
      image: award.image
    });

    setEditingId(award._id || null);
  };

  // ================= DELETE =================

  const handleDelete = async (id: string) => {

    await axios.delete(`${API}/api/awards/${id}`);

    fetchAwards();
  };

  return (

    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* ================= GALLERY ================= */}

        <h2 className="text-2xl font-bold mb-4">
          Awards Gallery Images
        </h2>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleGallerySelect}
        />

        <Button
          onClick={handleGalleryUpload}
          className="mt-3"
        >
          Upload Images
        </Button>

        {/* PREVIEW */}

        <div className="grid grid-cols-4 gap-4 mt-6">

          {galleryImages.map((img, i) => (

            <div key={i} className="relative">

              <img
                src={img}
                className="w-full h-28 object-cover rounded"
              />

              <Button
                size="sm"
                className="absolute top-1 right-1 bg-red-500"
                onClick={() => deleteGalleryImage(img)}
              >
                Delete
              </Button>

            </div>

          ))}

        </div>

        {/* ================= FORM ================= */}

        <h1 className="text-3xl font-bold mt-10 mb-6">
          Awards & Certifications
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-10"
        >

          <input
            type="text"
            placeholder="Award Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) =>
              setForm({ ...form, subtitle: e.target.value })
            }
            className="w-full p-3 border rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
            className="w-full p-3 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {uploading && <p>Uploading...</p>}

          {form.image && (

            <img
              src={form.image}
              className="w-24 rounded"
            />

          )}

          <Button type="submit">

            {editingId
              ? "Update Award"
              : "Create Award"}

          </Button>

        </form>

        {/* ================= LIST ================= */}

        <div className="space-y-4">

          {awards.map((award) => (

            <div
              key={award._id}
              className="border p-4 flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

                {award.image && (

                  <img
                    src={award.image}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                )}

                <div>

                  <h3 className="font-bold">
                    {award.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {award.subtitle}
                  </p>

                </div>

              </div>

              <div className="flex gap-2">

                <Button
                  variant="outline"
                  onClick={() =>
                    handleEdit(award)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDelete(award._id!)
                  }
                >
                  Delete
                </Button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminAwardsPage;