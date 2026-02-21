"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const AdminTestimonials = () => {
  const navigate = useNavigate();

  const { data: testimonials = [], refetch } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/testimonials`);
      return res.data;
    },
  });

  const handleDelete = async (id: string) => {
    await axios.delete(`${API}/api/testimonials/${id}`);
    refetch();
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl">Testimonials</h1>
        <button
          onClick={() => navigate("/admin/testimonials/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {testimonials.map((t: any) => (
        <div key={t._id} className="border p-4 mb-3">
          <h3 className="font-bold">{t.name}</h3>
          <p>{t.message}</p>

          <div className="mt-3 space-x-3">
            <button
              onClick={() => navigate(`/admin/testimonials/edit/${t._id}`)}
              className="text-blue-500"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(t._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTestimonials;
