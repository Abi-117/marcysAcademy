import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image as ImageIcon } from "lucide-react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const API_URL = import.meta.env.VITE_API_URL;

type MediaItem = {
  _id: string;
  title: string;
  category: string;
  image: string;
  type: "image" | "video";
  videoUrl?: string;
};

const Gallery = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    axios
      .get(`${API_URL}/api/gallery`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("Gallery fetch error:", err);
        setItems([]);
      });
  }, []);

  // ✅ DYNAMIC CATEGORIES
  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  // ✅ FILTER
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // ✅ IMAGE URL FIX (Important for Render)
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <FloatingWhatsApp />

      {/* HERO */}
      <section className="relative pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-muted-foreground">
          Capturing the magic of music & performance
        </p>
      </section>

      {/* CATEGORY FILTER */}
      <section className="py-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === category
                  ? "bg-gold text-black"
                  : "bg-gold/10 text-gold border border-gold/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative aspect-square overflow-hidden rounded-xl border cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">
                    {item.type === "video" ? (
                      <Play className="w-4 h-4 text-white" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className="absolute bottom-0 w-full bg-black/60 text-white p-3 text-sm">
                    <span className="block text-gold text-xs mb-1">
                      {item.category}
                    </span>
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setSelectedItem(null)}
            >
              <X size={30} />
            </button>

            {selectedItem.type === "video" ? (
              <video
                src={selectedItem.videoUrl?.startsWith("http")
                  ? selectedItem.videoUrl
                  : `${API_URL}/${selectedItem.videoUrl}`}
                controls
                className="max-h-[85vh] rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={getImageUrl(selectedItem.image)}
                alt={selectedItem.title}
                className="max-h-[85vh] rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;