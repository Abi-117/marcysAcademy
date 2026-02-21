"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const API = import.meta.env.VITE_API_URL;

const AdminTestimonialCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${API}/api/testimonials`, { name, message });
    navigate("/admin/testimonials");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
      <h1 className="text-3xl mb-6">Add Testimonial</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Message"
          className="w-full border p-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Create
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminTestimonialCreate;
