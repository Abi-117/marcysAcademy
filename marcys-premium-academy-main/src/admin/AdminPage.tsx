"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import Section from "./Section";

const API = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const navigate = useNavigate();

  /* ---------------- QUERIES ---------------- */

  const { data: heroes = [], refetch: refetchHeroes } = useQuery({
    queryKey: ["heroes"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/heroes`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: programs = [], refetch: refetchPrograms } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/programs`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: performanceServices = [], refetch: refetchPerformance } = useQuery({
    queryKey: ["performanceServices"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/performance-services`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: testimonials = [], refetch: refetchTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/testimonials`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: results = [], refetch: refetchResults } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/results`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/leads`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-10">Overview Dashboard</h1>

        {/* ================= HERO SECTION ================= */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Hero Slides</h2>

          <Button
            onClick={() => navigate("/admin/hero/create")}
            className="bg-blue-500 text-white"
          >
            Add Hero Slide
          </Button>
        </div>

        {heroes.map((hero: any) => (
          <div
            key={hero._id}
            className="border p-4 mb-3 flex justify-between items-center rounded"
          >
            <div>
              <h3 className="font-bold">{hero.title}</h3>
              <p className="text-muted-foreground">
                {hero.subtitle}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() =>
                  navigate(`/admin/hero/edit/${hero._id}`)
                }
                variant="outline"
                className="text-blue-500"
              >
                Edit
              </Button>

              <Button
                onClick={async () => {
                  await axios.delete(
                    `${API}/api/heroes/${hero._id}`
                  );
                  refetchHeroes();
                }}
                variant="outline"
                className="text-red-500"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

        {/* ================= REUSABLE SECTIONS ================= */}

        <Section
          title="Music Programs"
          data={programs}
          api="programs"
          refresh={refetchPrograms}
          apiUrl={API}
          navigate={navigate}
          createPath="/admin/programs/create"
        />

        <Section
          title="Performance Programs"
          data={performanceServices}
          api="performance-services"
          refresh={refetchPerformance}
          apiUrl={API}
          navigate={navigate}
          createPath="/admin/performance-services/create"
        />

        <Section
          title="Testimonials"
          data={testimonials}
          api="testimonials"
          refresh={refetchTestimonials}
          apiUrl={API}
          navigate={navigate}
          createPath="/admin/testimonials/create"
        />

        <Section
          title="Results"
          data={results}
          api="results"
          refresh={refetchResults}
          apiUrl={API}
          navigate={navigate}
          createPath="/admin/results/create"
        />

        {/* ================= LEADS ================= */}
        <h2 className="text-2xl mt-12 mb-4">Leads</h2>

        {leads.length === 0 && (
          <p className="text-gray-400">No leads found.</p>
        )}

        {leads.map((l: any) => (
          <div
            key={l._id}
            className="border p-4 mb-3 rounded"
          >
            {l.name} - {l.phone} - {l.interest}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
