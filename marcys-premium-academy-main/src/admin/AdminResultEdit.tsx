"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminResultEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchResult = async () => {
      const res = await axios.get(`${API}/api/results/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };

    fetchResult();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put(`${API}/api/results/${id}`, {
      title,
      description,
    });

    navigate("/admin/results");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Result</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <Button type="submit">Update Result</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminResultEdit;
