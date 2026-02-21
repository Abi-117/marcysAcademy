import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

const AdminGallery = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Performance");
  const [image, setImage] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]);

  /* ================= FETCH GALLERY ================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setItems(res.data || []);
    } catch (err) {
      console.error("Error fetching gallery items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ================= UPLOAD ================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Title and image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setCategory("Performance");
      setImage(null);
      fetchItems();
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/gallery/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  /* ================= IMAGE URL FIX ================= */
  const getImageUrl = (img: string) => {
    if (!img) return "";
    return img.startsWith("http") ? img : `${API_URL}/${img}`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl mb-4">Upload Gallery Image</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <button className="bg-black text-white px-4 py-2">
            Upload
          </button>
        </form>

        <div className="grid grid-cols-3 gap-4 mt-10">
          {items.map((item) => (
            <div key={item._id} className="border p-2 relative">
              <img
                src={getImageUrl(item.image)}
                className="w-full h-48 object-cover"
              />
              <p className="mt-2 font-semibold">{item.title}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;