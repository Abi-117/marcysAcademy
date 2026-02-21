import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

interface Value {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

interface Achievement {
  _id?: string;
  value: string;
  label: string;
}

interface AboutData {
  heroText: string;
  heroImage: string;
  story: string;
  mission: string;
  vision: string;
  values: Value[];
  achievements: Achievement[];
}

const AdminAboutPage = () => {
  const [about, setAbout] = useState<AboutData>({
    heroText: "",
    heroImage: "",
    story: "",
    mission: "",
    vision: "",
    values: [],
    achievements: [],
  });

  const [newValue, setNewValue] = useState<Value>({
    icon: "Target",
    title: "",
    description: "",
  });

  const [newAchievement, setNewAchievement] = useState<Achievement>({
    value: "",
    label: "",
  });

  const [heroFile, setHeroFile] = useState<File | null>(null);

  /* ================= FETCH ABOUT ================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/about`)
      .then((res) => res.data && setAbout(res.data))
      .catch((err) =>
        console.error("Failed to fetch About data:", err)
      );
  }, []);

  /* ================= SAVE ABOUT ================= */
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("heroText", about.heroText);
      formData.append("story", about.story);
      formData.append("mission", about.mission);
      formData.append("vision", about.vision);
      formData.append("values", JSON.stringify(about.values));
      formData.append(
        "achievements",
        JSON.stringify(about.achievements)
      );

      if (heroFile) formData.append("heroImage", heroFile);

      const res = await axios.post(
        `${API_URL}/api/about`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAbout(res.data);
      alert("Saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Try again.");
    }
  };

  /* ================= ADD VALUE ================= */
  const handleAddValue = () => {
    if (!newValue.title || !newValue.description)
      return alert("Title & description required");

    setAbout({
      ...about,
      values: [...about.values, newValue],
    });

    setNewValue({
      icon: "Target",
      title: "",
      description: "",
    });
  };

  /* ================= DELETE VALUE ================= */
  const handleDeleteValue = async (id?: string) => {
    if (!id) return;

    try {
      await axios.delete(
        `${API_URL}/api/about/value/${id}`
      );

      setAbout({
        ...about,
        values: about.values.filter(
          (v) => v._id !== id
        ),
      });
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= ADD ACHIEVEMENT ================= */
  const handleAddAchievement = () => {
    if (!newAchievement.value || !newAchievement.label)
      return alert("Both fields required");

    setAbout({
      ...about,
      achievements: [
        ...about.achievements,
        newAchievement,
      ],
    });

    setNewAchievement({ value: "", label: "" });
  };

  /* ================= DELETE ACHIEVEMENT ================= */
  const handleDeleteAchievement = async (
    id?: string
  ) => {
    if (!id) return;

    try {
      await axios.delete(
        `${API_URL}/api/about/achievement/${id}`
      );

      setAbout({
        ...about,
        achievements:
          about.achievements.filter(
            (a) => a._id !== id
          ),
      });
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          Edit About Page
        </h1>

        {/* HERO TEXT */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Hero Text
          </label>
          <input
            className="border w-full p-2 rounded"
            value={about.heroText}
            onChange={(e) =>
              setAbout({
                ...about,
                heroText: e.target.value,
              })
            }
          />
        </div>

        {/* HERO IMAGE */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Hero Image
          </label>

          <input
            type="file"
            onChange={(e) =>
              setHeroFile(
                e.target.files?.[0] || null
              )
            }
          />

          {about.heroImage && (
            <img
              src={`${API_URL}/uploads/${about.heroImage}`}
              className="w-48 mt-2 rounded"
              alt="Hero"
            />
          )}
        </div>

        {/* Story */}
        <textarea
          className="border w-full p-2 rounded mb-4"
          value={about.story}
          onChange={(e) =>
            setAbout({
              ...about,
              story: e.target.value,
            })
          }
        />

        {/* Mission */}
        <textarea
          className="border w-full p-2 rounded mb-4"
          value={about.mission}
          onChange={(e) =>
            setAbout({
              ...about,
              mission: e.target.value,
            })
          }
        />

        {/* Vision */}
        <textarea
          className="border w-full p-2 rounded mb-6"
          value={about.vision}
          onChange={(e) =>
            setAbout({
              ...about,
              vision: e.target.value,
            })
          }
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default AdminAboutPage;