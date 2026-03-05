"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "./SectionHeading";

const API = import.meta.env.VITE_API_URL;

interface Certification {
  _id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

const AwardsCertifications = () => {

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  // FETCH DATA
  useEffect(() => {

    const fetchAwards = async () => {

      try {

        const res = await axios.get(`${API}/api/awards`);

        setCertifications(res.data.certifications || []);
        setImages(res.data.images || []);

      } catch (err) {
        console.error("Failed to fetch awards", err);
      }

    };

    fetchAwards();

  }, []);

  // AUTO SLIDER
  useEffect(() => {

    if (images.length === 0) return;

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 3000); // 3 seconds

    return () => clearInterval(interval);

  }, [images]);

  return (
    <section className="py-24 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

      <div className="container-premium relative z-10">

        <SectionHeading
          title="Awards & Certifications"
          subtitle="Internationally recognized excellence in music education"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

          {/* LEFT IMAGE SLIDER */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="overflow-hidden flex justify-center items-center">

              {images.length > 0 && (

                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Academy Certifications"
                  className="w-full sm:w-auto h-64 sm:h-96 object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

              )}

            </div>

          </motion.div>

          {/* RIGHT SIDE CARDS */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            {certifications.map((cert) => (

              <div
                key={cert._id}
                className="premium-card rounded-xl p-6 flex items-start gap-4 group hover:border-gold/30 transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">

                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover rounded-full"
                  />

                </div>

                <div>

                  <h4 className="font-display text-xl font-semibold text-foreground mb-1">
                    {cert.name}
                  </h4>

                  <p className="text-gold text-sm font-medium mb-2">
                    {cert.subtitle}
                  </p>

                  <p className="text-muted-foreground">
                    {cert.description}
                  </p>

                </div>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default AwardsCertifications;