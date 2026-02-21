"use client";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminResults = () => {
  const navigate = useNavigate();

  const { data: results = [], refetch } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/results`);
      return res.data;
    },
  });

  const handleDelete = async (id: string) => {
    await axios.delete(`${API}/api/results/${id}`);
    refetch();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Results</h1>
          <Button onClick={() => navigate("/admin/results/create")}>
            Add Result
          </Button>
        </div>

        {results.map((result: any) => (
          <div
            key={result._id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{result.title}</h3>
              <p>{result.description}</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/admin/results/edit/${result._id}`)
                }
              >
                Edit
              </Button>

              <Button
                variant="outline"
                onClick={() => handleDelete(result._id)}
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

export default AdminResults;
