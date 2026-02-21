"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminTestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axios.get(`${API}/api/testimonials/${id}`);
        setName(res.data.name);
        setMessage(res.data.message);
      } catch (err) {
        console.error("Failed to fetch testimonial", err);
        alert("Failed to fetch data. Check console.");
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(`${API}/api/testimonials/${id}`, { name, message });
      navigate("/admin/testimonials");
    } catch (err) {
      console.error("Failed to update testimonial", err);
      alert("Update failed. Check console for details.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Testimonial</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <Button type="submit">Update Testimonial</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminTestimonialEdit;
