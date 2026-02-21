"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Sidebar from "./Sidebar";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

const EnquiryAdmin = () => {
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/enquiry");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return <p className="text-center py-16">Loading enquiries...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <main className="container-premium py-16 space-y-8">
          <h1 className="text-3xl font-bold text-foreground">Enquiries</h1>

          {enquiries.length === 0 ? (
            <p>No enquiries yet.</p>
          ) : (
            <div className="space-y-4">
              {enquiries.map((e) => (
                <div key={e._id} className="border p-4 rounded-lg bg-background/80">
                  <p><strong>Name:</strong> {e.name}</p>
                  <p><strong>Email:</strong> {e.email}</p>
                  <p><strong>Phone:</strong> {e.phone || "-"}</p>
                  <p><strong>Message:</strong> {e.message}</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnquiryAdmin;
