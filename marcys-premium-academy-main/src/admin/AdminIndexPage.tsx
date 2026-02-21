import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

interface Stat {
  _id?: string;
  icon: string;
  value: string;
  label: string;
}

interface IndexData {
  heroText: string;
  heroSubText: string;
  heroCTA: string;
  stats: Stat[];
  aboutTitle: string;
  aboutSubTitle: string;
  aboutDescription: string;
  aboutPoints: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

const AdminIndexPage = () => {
  const [indexData, setIndexData] = useState<IndexData>({
    heroText: "",
    heroSubText: "",
    heroCTA: "",
    stats: [],
    aboutTitle: "",
    aboutSubTitle: "",
    aboutDescription: "",
    aboutPoints: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonText: "",
  });

  const [newStat, setNewStat] = useState<Stat>({
    icon: "",
    value: "",
    label: "",
  });

  const [newAboutPoint, setNewAboutPoint] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/index`);
        if (res.data) setIndexData(res.data);
      } catch (err) {
        console.error("Failed to fetch index data:", err);
      }
    };
    fetchData();
  }, []);

  /* ================= ADD STAT ================= */
  const addStat = () => {
    if (!newStat.icon || !newStat.value || !newStat.label) return;
    setIndexData({
      ...indexData,
      stats: [...indexData.stats, newStat],
    });
    setNewStat({ icon: "", value: "", label: "" });
  };

  /* ================= DELETE STAT ================= */
  const deleteStat = (index: number) => {
    setIndexData({
      ...indexData,
      stats: indexData.stats.filter((_, i) => i !== index),
    });
  };

  /* ================= ABOUT POINT ================= */
  const addAboutPoint = () => {
    if (!newAboutPoint) return;
    setIndexData({
      ...indexData,
      aboutPoints: [...indexData.aboutPoints, newAboutPoint],
    });
    setNewAboutPoint("");
  };

  const deleteAboutPoint = (index: number) => {
    setIndexData({
      ...indexData,
      aboutPoints: indexData.aboutPoints.filter((_, i) => i !== index),
    });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/index`,
        indexData
      );
      setIndexData(res.data);
      alert("Saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          Admin - Home Page Content
        </h1>

        {/* HERO */}
        <div className="mb-4">
          <label>Hero Text</label>
          <input
            className="border text-black w-full p-2 rounded mb-2"
            value={indexData.heroText}
            onChange={(e) =>
              setIndexData({ ...indexData, heroText: e.target.value })
            }
          />

          <label>Hero SubText</label>
          <input
            className="border text-black w-full p-2 rounded mb-2"
            value={indexData.heroSubText}
            onChange={(e) =>
              setIndexData({ ...indexData, heroSubText: e.target.value })
            }
          />

          <label>Hero CTA Text</label>
          <input
            className="border text-black w-full p-2 rounded"
            value={indexData.heroCTA}
            onChange={(e) =>
              setIndexData({ ...indexData, heroCTA: e.target.value })
            }
          />
        </div>

        {/* STATS */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Stats</h2>

          {indexData.stats.map((s, i) => (
            <div
              key={i}
              className="flex justify-between text-black items-center bg-gray-100 p-2 rounded mb-1"
            >
              <span>
                {s.icon} | {s.value} | {s.label}
              </span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteStat(i)}
              >
                Delete
              </button>
            </div>
          ))}

          <div className="mt-2 space-y-2">
            <input
              placeholder="Icon name"
              className="border text-black p-2 rounded w-full"
              value={newStat.icon}
              onChange={(e) =>
                setNewStat({ ...newStat, icon: e.target.value })
              }
            />
            <input
              placeholder="Value"
              className="border text-black p-2 rounded w-full"
              value={newStat.value}
              onChange={(e) =>
                setNewStat({ ...newStat, value: e.target.value })
              }
            />
            <input
              placeholder="Label"
              className="border text-black p-2 rounded w-full"
              value={newStat.label}
              onChange={(e) =>
                setNewStat({ ...newStat, label: e.target.value })
              }
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={addStat}
            >
              Add Stat
            </button>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">About Section</h2>

          <input
            className="border w-full p-2 rounded mb-2"
            placeholder="Title"
            value={indexData.aboutTitle}
            onChange={(e) =>
              setIndexData({ ...indexData, aboutTitle: e.target.value })
            }
          />

          <input
            className="border w-full p-2 rounded mb-2"
            placeholder="SubTitle"
            value={indexData.aboutSubTitle}
            onChange={(e) =>
              setIndexData({ ...indexData, aboutSubTitle: e.target.value })
            }
          />

          <textarea
            className="border w-full p-2 rounded mb-2"
            placeholder="Description"
            value={indexData.aboutDescription}
            onChange={(e) =>
              setIndexData({
                ...indexData,
                aboutDescription: e.target.value,
              })
            }
          />

          {indexData.aboutPoints.map((p, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
            >
              <span>{p}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteAboutPoint(i)}
              >
                Delete
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              placeholder="New About Point"
              className="border p-2 rounded w-full"
              value={newAboutPoint}
              onChange={(e) => setNewAboutPoint(e.target.value)}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={addAboutPoint}
            >
              Add
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">CTA Section</h2>

          <input
            className="border w-full p-2 rounded mb-2"
            placeholder="Title"
            value={indexData.ctaTitle}
            onChange={(e) =>
              setIndexData({ ...indexData, ctaTitle: e.target.value })
            }
          />

          <textarea
            className="border w-full p-2 rounded mb-2"
            placeholder="Description"
            value={indexData.ctaDescription}
            onChange={(e) =>
              setIndexData({
                ...indexData,
                ctaDescription: e.target.value,
              })
            }
          />

          <input
            className="border w-full p-2 rounded"
            placeholder="Button Text"
            value={indexData.ctaButtonText}
            onChange={(e) =>
              setIndexData({
                ...indexData,
                ctaButtonText: e.target.value,
              })
            }
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default AdminIndexPage;