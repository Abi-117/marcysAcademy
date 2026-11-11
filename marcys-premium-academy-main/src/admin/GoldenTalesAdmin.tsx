
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "./Sidebar";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

interface Benefit {
  icon: string;
  text: string;
}

interface Module {
  icon: string;
  name: string;
  detail: string;
}

interface Program {
  icon: string;
  duration: string;
  sessions: string;
  detail: string;
}

interface GoldenTalesData {
  academyName: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  highlights: string;
  batchLabel: string;
  batchDate: string;
  childrensDayTitle: string;
  childrensDaySubtitle: string;
  benefits: Benefit[];
  modules: Module[];
  programs: Program[];
  locationTitle: string;
  contactText: string;
  phone: string;
}

const initialData: GoldenTalesData = {
  academyName: "",
  heroTitle: "",
  heroSubtitle: "",
  tagline: "",
  highlights: "",
  batchLabel: "",
  batchDate: "",
  childrensDayTitle: "",
  childrensDaySubtitle: "",
  benefits: [],
  modules: [],
  programs: [],
  locationTitle: "",
  contactText: "",
  phone: "",
};

const GoldenTalesAdmin = () => {
  const [data, setData] = useState<GoldenTalesData>(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch content
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/golden-tales`);

        if (!res.ok) {
          throw new Error("Failed to fetch Golden Tales content");
        }

        const result = await res.json();

        setData({
          ...initialData,
          ...result,
          benefits: result.benefits || [],
          modules: result.modules || [],
          programs: result.programs || [],
          // Convert stored ISO date into a datetime-local value
          batchDate: result.batchDate
            ? new Date(result.batchDate).toISOString().slice(0, 16)
            : "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load Golden Tales content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update normal fields
  const updateField = (
    field: keyof GoldenTalesData,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update benefits
  const updateBenefit = (
    index: number,
    field: keyof Benefit,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addBenefit = () => {
    setData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, { icon: "Star", text: "" }],
    }));
  };

  const removeBenefit = (index: number) => {
    setData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  // Update modules
  const updateModule = (
    index: number,
    field: keyof Module,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      modules: prev.modules.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addModule = () => {
    setData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        { icon: "BookOpen", name: "", detail: "" },
      ],
    }));
  };

  const removeModule = (index: number) => {
    setData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  // Update programs
  const updateProgram = (
    index: number,
    field: keyof Program,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      programs: prev.programs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addProgram = () => {
    setData((prev) => ({
      ...prev,
      programs: [
        ...prev.programs,
        {
          icon: "Star",
          duration: "",
          sessions: "",
          detail: "",
        },
      ],
    }));
  };

  const removeProgram = (index: number) => {
    setData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }));
  };

  // Save content
  const handleSave = async () => {
    setSaving(true);

    try {
      const payload = {
        ...data,
        batchDate: data.batchDate
          ? new Date(data.batchDate).toISOString()
          : "",
      };

      const res = await fetch(`${API_URL}/api/golden-tales`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save content");
      }

      const result = await res.json();

      if (result.data) {
        setData((prev) => ({
          ...prev,
          ...result.data,
          batchDate: result.data.batchDate
            ? new Date(result.data.batchDate)
                .toISOString()
                .slice(0, 16)
            : "",
        }));
      }

      toast.success("Golden Tales content saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save Golden Tales content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-16">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        <main className="container-premium py-8 space-y-10">

          <h1 className="text-3xl font-bold text-foreground">
            Golden Tales Admin
          </h1>

          {/* HERO SECTION */}
          <section className="space-y-5 rounded-xl border p-6">
            <h2 className="text-xl font-bold">Hero Banner Settings</h2>

            <Input
              value={data.academyName}
              onChange={(e) => updateField("academyName", e.target.value)}
              placeholder="Academy Name"
            />

            <Input
              value={data.heroTitle}
              onChange={(e) => updateField("heroTitle", e.target.value)}
              placeholder="Hero Title"
            />

            <Input
              value={data.heroSubtitle}
              onChange={(e) => updateField("heroSubtitle", e.target.value)}
              placeholder="Hero Subtitle"
            />

            <Textarea
              value={data.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              placeholder="Tagline"
            />

            <Textarea
              value={data.highlights}
              onChange={(e) => updateField("highlights", e.target.value)}
              placeholder="Highlights"
              rows={3}
            />
          </section>

          {/* BATCH SETTINGS */}
          <section className="space-y-5 rounded-xl border p-6">
            <h2 className="text-xl font-bold">Batch Settings</h2>

            <Input
              value={data.batchLabel}
              onChange={(e) => updateField("batchLabel", e.target.value)}
              placeholder="Batch Label"
            />

            <div>
              <label className="block text-sm mb-2">
                Batch Starting Date & Time
              </label>

              <Input
                type="datetime-local"
                value={data.batchDate}
                onChange={(e) => updateField("batchDate", e.target.value)}
              />
            </div>
          </section>

          {/* CHILDREN'S DAY */}
          <section className="space-y-5 rounded-xl border p-6">
            <h2 className="text-xl font-bold">
              Children's Day Section
            </h2>

            <Input
              value={data.childrensDayTitle}
              onChange={(e) =>
                updateField("childrensDayTitle", e.target.value)
              }
              placeholder="Children's Day Title"
            />

            <Textarea
              value={data.childrensDaySubtitle}
              onChange={(e) =>
                updateField("childrensDaySubtitle", e.target.value)
              }
              placeholder="Children's Day Subtitle"
            />
          </section>

          {/* BENEFITS */}
          <section className="space-y-5 rounded-xl border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Benefits</h2>

              <Button type="button" onClick={addBenefit}>
                + Add Benefit
              </Button>
            </div>

            {data.benefits.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  Benefit {index + 1}
                </h3>

                <Input
                  value={item.icon}
                  onChange={(e) =>
                    updateBenefit(index, "icon", e.target.value)
                  }
                  placeholder="Lucide Icon Name (e.g. Star, Mic2)"
                />

                <Input
                  value={item.text}
                  onChange={(e) =>
                    updateBenefit(index, "text", e.target.value)
                  }
                  placeholder="Benefit Text"
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeBenefit(index)}
                >
                  Remove Benefit
                </Button>
              </div>
            ))}
          </section>

          {/* MODULES */}
          <section className="space-y-5 rounded-xl border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Program Modules</h2>

              <Button type="button" onClick={addModule}>
                + Add Module
              </Button>
            </div>

            {data.modules.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  Module {index + 1}
                </h3>

                <Input
                  value={item.icon}
                  onChange={(e) =>
                    updateModule(index, "icon", e.target.value)
                  }
                  placeholder="Lucide Icon Name"
                />

                <Input
                  value={item.name}
                  onChange={(e) =>
                    updateModule(index, "name", e.target.value)
                  }
                  placeholder="Module Name"
                />

                <Textarea
                  value={item.detail}
                  onChange={(e) =>
                    updateModule(index, "detail", e.target.value)
                  }
                  placeholder="Module Description"
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeModule(index)}
                >
                  Remove Module
                </Button>
              </div>
            ))}
          </section>

          {/* PROGRAM DURATION */}
          <section className="space-y-5 rounded-xl border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">
                Program Duration & Options
              </h2>

              <Button type="button" onClick={addProgram}>
                + Add Program
              </Button>
            </div>

            {data.programs.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  Program {index + 1}
                </h3>

                <Input
                  value={item.icon}
                  onChange={(e) =>
                    updateProgram(index, "icon", e.target.value)
                  }
                  placeholder="Lucide Icon Name"
                />

                <Input
                  value={item.duration}
                  onChange={(e) =>
                    updateProgram(index, "duration", e.target.value)
                  }
                  placeholder="Duration (e.g. 3 Months)"
                />

                <Input
                  value={item.sessions}
                  onChange={(e) =>
                    updateProgram(index, "sessions", e.target.value)
                  }
                  placeholder="Sessions (e.g. 12 Sessions)"
                />

                <Textarea
                  value={item.detail}
                  onChange={(e) =>
                    updateProgram(index, "detail", e.target.value)
                  }
                  placeholder="Program Description"
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeProgram(index)}
                >
                  Remove Program
                </Button>
              </div>
            ))}
          </section>

          {/* CONTACT SETTINGS */}
          <section className="space-y-5 rounded-xl border p-6">
            <h2 className="text-xl font-bold">Location & Contact</h2>

            <Input
              value={data.locationTitle}
              onChange={(e) => updateField("locationTitle", e.target.value)}
              placeholder="Location Title"
            />

            <Input
              value={data.contactText}
              onChange={(e) => updateField("contactText", e.target.value)}
              placeholder="Contact Text"
            />

            <Input
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Contact Phone Number"
            />
          </section>

          {/* SAVE BUTTON */}
          <Button
            onClick={handleSave}
            size="lg"
            className="w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save All Changes"}
          </Button>

        </main>
      </div>
    </div>
  );
};

export default GoldenTalesAdmin;