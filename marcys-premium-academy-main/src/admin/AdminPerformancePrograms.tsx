"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

interface PerformanceService {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

const AdminPerformancePrograms = () => {
  const navigate = useNavigate();

  const { data: services = [], refetch } = useQuery({
    queryKey: ["performanceServices"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/performance-services`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API}/api/performance-services/${id}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete performance service", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Performance Programs</h1>
          <Button
            onClick={() => navigate("/admin/performance-services/create")}
            className="bg-blue-500 text-white"
          >
            Add Performance Program
          </Button>
        </div>

        {services.length === 0 && <p>No performance programs found.</p>}

        {services.map((service) => (
          <div key={service._id} className="border p-4 mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{service.title}</h3>
              <p>{service.description}</p>
              {service.image && (
                <img src={service.image} alt={service.title} className="h-24 mt-1 rounded" />
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/performance-services/edit/${service._id}`)}
                className="text-blue-500"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(service._id)}
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

export default AdminPerformancePrograms;
