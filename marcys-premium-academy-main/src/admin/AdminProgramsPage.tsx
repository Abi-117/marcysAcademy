"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const SERVER_BASE = import.meta.env.VITE_SERVER_BASE || "http://localhost:5000";

interface ProgramSection {
  title: string;
  paragraphs: string[];
  image: string;
  file: File | null;
}

const AdminProgramsPage = () => {
  const [teachersTraining, setTeachersTraining] = useState<ProgramSection>({
    title: "",
    paragraphs: ["", "", ""],
    image: "",
    file: null,
  });

  const [signatureProgram, setSignatureProgram] = useState<ProgramSection>({
    title: "",
    paragraphs: ["", "", ""],
    image: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH DATA FROM DB
  const fetchPrograms = async () => {
    try {
      const teachersRes = await axios.get(`${API_BASE}/program/teachers`);
      const signatureRes = await axios.get(`${API_BASE}/program/signature`);

      if (teachersRes.data && teachersRes.data.title) {
        setTeachersTraining({
          title: teachersRes.data.title,
          paragraphs: teachersRes.data.paragraphs || ["", "", ""],
          image: teachersRes.data.image
            ? `${SERVER_BASE}/${teachersRes.data.image}`
            : "",
          file: null,
        });
      }

      if (signatureRes.data && signatureRes.data.title) {
        setSignatureProgram({
          title: signatureRes.data.title,
          paragraphs: signatureRes.data.paragraphs || ["", "", ""],
          image: signatureRes.data.image
            ? `${SERVER_BASE}/${signatureRes.data.image}`
            : "",
          file: null,
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // ✅ TEXT CHANGE
  const handleChangeText = (
    section: "teachers" | "signature",
    index: number,
    value: string
  ) => {
    const target =
      section === "teachers" ? teachersTraining : signatureProgram;

    const newParagraphs = [...target.paragraphs];
    newParagraphs[index] = value;

    section === "teachers"
      ? setTeachersTraining({ ...target, paragraphs: newParagraphs })
      : setSignatureProgram({ ...target, paragraphs: newParagraphs });
  };

  // ✅ TITLE CHANGE
  const handleChangeTitle = (
    section: "teachers" | "signature",
    value: string
  ) => {
    section === "teachers"
      ? setTeachersTraining({ ...teachersTraining, title: value })
      : setSignatureProgram({ ...signatureProgram, title: value });
  };

  // ✅ IMAGE CHANGE
  const handleChangeImage = (
    section: "teachers" | "signature",
    file: File
  ) => {
    const previewUrl = URL.createObjectURL(file);

    section === "teachers"
      ? setTeachersTraining({
          ...teachersTraining,
          image: previewUrl,
          file,
        })
      : setSignatureProgram({
          ...signatureProgram,
          image: previewUrl,
          file,
        });
  };

  // ✅ UPLOAD FUNCTION
  const uploadSection = async (
    sectionData: ProgramSection,
    sectionName: "teachers" | "signature"
  ) => {
    const formData = new FormData();
    formData.append("title", sectionData.title);
    formData.append("paragraphs", JSON.stringify(sectionData.paragraphs));
    if (sectionData.file) {
      formData.append("image", sectionData.file);
    }

    return axios.put(`${API_BASE}/program/${sectionName}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // ✅ SAVE BUTTON
  const handleSave = async () => {
    setLoading(true);
    try {
      await uploadSection(teachersTraining, "teachers");
      await uploadSection(signatureProgram, "signature");

      await fetchPrograms(); // reload fresh DB data

      alert("Content saved successfully!");
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(
        `Failed: ${
          err.response?.data?.message || "Internal Server Error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 space-y-10">
      {/* Teachers Section */}
      <div className="p-6 border rounded-lg space-y-4">
        <h2 className="text-xl font-bold">
          Teachers Training Exclusive
        </h2>

        <Input
          value={teachersTraining.title}
          onChange={(e) =>
            handleChangeTitle("teachers", e.target.value)
          }
          placeholder="Title"
        />

        {teachersTraining.paragraphs.map((p, i) => (
          <Textarea
            key={i}
            value={p}
            onChange={(e) =>
              handleChangeText("teachers", i, e.target.value)
            }
            placeholder={`Paragraph ${i + 1}`}
          />
        ))}

        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            handleChangeImage("teachers", e.target.files[0])
          }
        />

        {teachersTraining.image && (
          <img
            src={teachersTraining.image}
            alt="Preview"
            className="w-60 rounded"
          />
        )}
      </div>

      {/* Signature Section */}
      <div className="p-6 border rounded-lg space-y-4">
        <h2 className="text-xl font-bold">
          Marcy’s Academy Signature Program
        </h2>

        <Input
          value={signatureProgram.title}
          onChange={(e) =>
            handleChangeTitle("signature", e.target.value)
          }
          placeholder="Title"
        />

        {signatureProgram.paragraphs.map((p, i) => (
          <Textarea
            key={i}
            value={p}
            onChange={(e) =>
              handleChangeText("signature", i, e.target.value)
            }
            placeholder={`Paragraph ${i + 1}`}
          />
        ))}

        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            handleChangeImage("signature", e.target.files[0])
          }
        />

        {signatureProgram.image && (
          <img
            src={signatureProgram.image}
            alt="Preview"
            className="w-60 rounded"
          />
        )}
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save All"}
      </Button>
    </div>
  );
};

export default AdminProgramsPage;