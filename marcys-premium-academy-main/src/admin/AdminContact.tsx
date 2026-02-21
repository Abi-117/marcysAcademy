"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "./Sidebar";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const ContactAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [description, setDescription] = useState("");

  /* ================= FETCH CONTACT ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contact`);
        if (!res.ok) throw new Error("Failed to fetch contact info");

        const data = await res.json();

        setPhone(data.phone || "");
        setEmail(data.email || "");
        setOfficeHours(data.officeHours || "");
        setWhatsappMsg(data.whatsappMsg || "");
        setMapUrl(data.mapUrl || "");
        setDescription(data.description || "");
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= SAVE CONTACT ================= */
  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          email,
          officeHours,
          whatsappMsg,
          mapUrl,
          description,
        }),
      });

      if (!res.ok) throw new Error("Failed to save contact info");

      toast.success("Contact info saved successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error saving contact info");
    } finally {
      setSaving(false);
    }
  };

  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  if (loading) return <p className="text-center py-16">Loading...</p>;
  if (error)
    return <p className="text-center py-16 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <main className="container-premium py-16 space-y-12">
          <h1 className="text-3xl font-bold text-foreground">
            Contact Page Admin
          </h1>

          {/* Contact Info */}
          <section className="space-y-6">
            <h2 className="font-semibold text-xl">Contact Info</h2>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <Input
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
              placeholder="Office hours"
            />
          </section>

          {/* WhatsApp */}
          <section className="space-y-6">
            <h2 className="font-semibold text-xl">WhatsApp</h2>
            <Textarea
              value={whatsappMsg}
              onChange={(e) => setWhatsappMsg(e.target.value)}
              placeholder="WhatsApp default message"
            />
            <p className="text-sm text-muted-foreground">
              Preview Link:{" "}
              <a
                href={whatsappLink}
                target="_blank"
                className="text-gold underline"
              >
                Open WhatsApp
              </a>
            </p>
          </section>

          {/* Map */}
          <section className="space-y-6">
            <h2 className="font-semibold text-xl">Map</h2>
            <Textarea
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
              placeholder="Google Maps embed URL"
            />
          </section>

          {/* Description */}
          <section className="space-y-6">
            <h2 className="font-semibold text-xl">
              Description / Courses
            </h2>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Courses or description"
              rows={5}
            />
          </section>

          <Button
            onClick={handleSave}
            size="lg"
            className="w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </main>
      </div>
    </div>
  );
};

export default ContactAdmin;