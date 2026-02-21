"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API = import.meta.env.VITE_API_URL;

interface HeroSlide {
  _id?: string;
  title: string;
  subtitle: string;
  image: string;
}

const HeroSlidesAdmin = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<HeroSlide>({ title: "", subtitle: "", image: "" });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(`${API}/api/heroes`);
      setSlides(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch slides", err);
    }
  };

  const startEdit = (slide: HeroSlide) => {
    setEditingId(slide._id!);
    setForm({ title: slide.title, subtitle: slide.subtitle, image: slide.image });
  };

  const saveSlide = async () => {
    try {
      if (editingId) {
        // update existing
        await axios.put(`${API}/api/heroes/${editingId}`, form);
      } else {
        // add new
        await axios.post(`${API}/api/heroes`, form);
      }
      setForm({ title: "", subtitle: "", image: "" });
      setEditingId(null);
      fetchSlides();
    } catch (err) {
      console.error("Failed to save slide", err);
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      await axios.delete(`${API}/api/heroes/${id}`);
      fetchSlides();
    } catch (err) {
      console.error("Failed to delete slide", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Hero Slides Admin</h1>

        {/* Add / Edit Form */}
        <div className="mb-8 border p-6 rounded-lg bg-background-secondary max-w-2xl">
          <h2 className="text-2xl mb-4">{editingId ? "Edit Slide" : "Add New Slide"}</h2>

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-3 p-3 rounded border"
          />

          <input
            type="text"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full mb-3 p-3 rounded border"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full mb-3 p-3 rounded border"
          />

          <button
            onClick={saveSlide}
            className="bg-blue-600 text-white px-6 py-2 rounded mr-2"
          >
            {editingId ? "Save Changes" : "Add Slide"}
          </button>

          {editingId && (
            <button
              onClick={() => { setEditingId(null); setForm({ title: "", subtitle: "", image: "" }); }}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Slides List */}
        <div>
          {slides.map((slide) => (
            <div
              key={slide._id}
              className="border p-4 mb-4 flex justify-between items-center rounded-lg"
            >
              <div>
                <h3 className="font-bold">{slide.title}</h3>
                <p className="text-muted-foreground">{slide.subtitle}</p>
                <img src={slide.image} alt={slide.title} className="h-24 mt-2 rounded" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(slide)}
                  className="text-blue-500 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSlide(slide._id!)}
                  className="text-red-500 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlidesAdmin;
