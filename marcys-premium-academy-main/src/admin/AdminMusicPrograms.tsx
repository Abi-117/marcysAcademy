"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

interface Program {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

const AdminMusicPrograms = () => {
  const navigate = useNavigate();

  const { data: programs = [], refetch } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/programs`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API}/api/programs/${id}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete program", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Music Programs</h1>
          <Button
            onClick={() => navigate("/admin/programs/create")}
            className="bg-blue-500 text-white"
          >
            Add Music Program
          </Button>
        </div>

        {programs.length === 0 && <p>No programs found.</p>}

        {programs.map((program) => (
          <div key={program._id} className="border p-4 mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{program.title}</h3>
              <p>{program.description}</p>
              {program.image && (
                <img src={program.image} alt={program.title} className="h-24 mt-1 rounded" />
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/programs/edit/${program._id}`)}
                className="text-blue-500"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(program._id)}
                className="text-red-500"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMusicPrograms;
