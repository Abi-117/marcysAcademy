"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: string;
  order: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/services`;

const AdminServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<Service, "_id" | "order">>({
    title: "",
    category: "western",
    description: "",
    image: "",
    icon: "Music",
  });

  const token = localStorage.getItem("adminToken");

  // ================= FETCH SERVICES =================
  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setServices(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        setForm((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= ADD SERVICE =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newService = { ...form, order: services.length };

      const res = await axios.post(API_URL, newService, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices((prev) => [...prev, res.data]);
      setForm({
        title: "",
        category: "western",
        description: "",
        image: "",
        icon: "Music",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create service");
    }
  };

  // ================= DELETE SERVICE =================
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= SAVE ORDER =================
  const saveOrder = async (updatedServices: Service[]) => {
    try {
      const payload = updatedServices.map((s, idx) => ({
        _id: s._id,
        order: idx,
      }));

      await axios.put(
        `${API_URL}/reorder`,
        { services: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Reorder failed", err);
    }
  };

  // ================= MOVE SERVICE =================
  const moveService = (id: string, direction: "up" | "down") => {
    setServices((prev) => {
      const index = prev.findIndex((s) => s._id === id);
      if (index === -1) return prev;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newServices = [...prev];
      [newServices[index], newServices[newIndex]] = [
        newServices[newIndex],
        newServices[index],
      ];

      saveOrder(newServices);
      return newServices;
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            placeholder="Title"
            value={form.title}
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <select
            value={form.category}
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="western">Western</option>
            <option value="performance">Performance</option>
          </select>

          <textarea
            placeholder="Description"
            value={form.description}
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
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
              alt="preview"
              className="w-32 mt-2 rounded"
            />
          )}

          <input
            placeholder="Icon Name"
            value={form.icon}
            className="border p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, icon: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Add Service
          </button>
        </form>

        {/* SERVICES LIST */}
        {loading && <p>Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading &&
          services.map((service, idx) => (
            <div
              key={service._id}
              className="border p-4 mb-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h4 className="font-bold">{service.title}</h4>
                  <p className="text-sm text-gray-600">
                    {service.category}
                  </p>
                  <p className="text-sm max-w-lg">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    moveService(service._id, "up")
                  }
                  disabled={idx === 0}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  ↑
                </button>

                <button
                  onClick={() =>
                    moveService(service._id, "down")
                  }
                  disabled={idx === services.length - 1}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  ↓
                </button>

                <button
                  onClick={() =>
                    handleDelete(service._id)
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminServicesPage;