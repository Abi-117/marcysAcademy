"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Guitar,
  Piano,
  Drum,
  Mic2,
  Sparkles,
  Users,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SectionHeading from "@/components/SectionHeading";
import EnhancedServiceCard from "@/components/EnhancedServiceCard";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

const whatsappLink =
  "https://wa.me/919025849150?text=" +
  encodeURIComponent("Hello! I want to know more about Marcys Academy programs.");

const Overview = () => {
  const [index, setIndex] = useState(0);

  /* ---------------- HERO SLIDER ---------------- */
  const { data: heroes = [], isLoading: heroesLoading } = useQuery({
    queryKey: ["heroes"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/heroes`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  useEffect(() => {
    if (heroes.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroes]);

  /* ---------------- PROGRAMS ---------------- */
  const { data: musicPrograms = [], isLoading: musicLoading } = useQuery({
    queryKey: ["musicPrograms"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/programs`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const { data: performancePrograms = [], isLoading: perfLoading } = useQuery({
    queryKey: ["performancePrograms"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/performance-services`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const { data: testimonials = [], isLoading: testLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/testimonials`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const { data: results = [], isLoading: resultsLoading } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/results`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/leads`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const iconMap: Record<string, any> = {
    Singing: Mic2,
    "Classical Guitar": Guitar,
    Drums: Drum,
    Piano: Piano,
    Violin: Music,
    Acting: Sparkles,
    Drama: Sparkles,
    "Musical Theatre": Sparkles,
    "Screen Acting": Users,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white overflow-x-hidden">
      <Navbar />
      <FloatingWhatsApp />

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {heroesLoading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          <AnimatePresence mode="wait">
            {heroes[index] && (
              <motion.img
                key={heroes[index]._id}
                src={heroes[index].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
            )}
          </AnimatePresence>
        )}

        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Where Talent Meets Excellence
          </motion.h1>

          <h2 className="text-3xl font-display text-gold mb-6 tracking-wide">
            Marcys Academy
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            World-class music training, performance arts & communication coaching.
            Internationally certified. Locally celebrated.
          </p>

          <div className="flex justify-center gap-6">
            <a href={whatsappLink} target="_blank">
              <Button size="lg" className="px-10 py-6 text-lg">
                Get Started
              </Button>
            </a>
            <a href={whatsappLink} target="_blank">
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg">
                Book Now
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 mt-10">
            <div className="glass px-5 py-3 rounded-full">⭐ 4.9 Google Rating</div>
            <div className="glass px-5 py-3 rounded-full">Trusted by 500+ Families</div>
            <div className="glass px-5 py-3 rounded-full">Trinity & RockSchool Certified</div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="py-24">
        <div className="container-premium">
          <SectionHeading title="Programs We Offer" />

          <div className="mt-20 space-y-16">
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-8 w-max"
            >
              {[...musicPrograms, ...musicPrograms].map((service: any, i) => (
                <div key={i} className="min-w-[300px]">
                  <EnhancedServiceCard
                    title={service.title}
                    icon={iconMap[service.title] || Music}
                    image={service.image}
                    description={service.description || "Professional structured training."}
                    buttonText="Book Now"
                  />
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ x: ["-100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-8 w-max"
            >
              {[...performancePrograms, ...performancePrograms].map((service: any, i) => (
                <div key={i} className="min-w-[300px]">
                  <EnhancedServiceCard
                    title={service.title}
                    icon={iconMap[service.title] || Sparkles}
                    image={service.image}
                    description={service.description || "Confidence & stage mastery programs."}
                    buttonText="Book Now"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-[#111]">
        <div className="container-premium">
          <SectionHeading title="What Our Community Says" />

          <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-5xl mx-auto">
            {testimonials.map((t: any) => (
              <motion.div
                key={t._id || t.name}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl"
              >
                {t.image && (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                )}
                <p className="text-gray-300 text-lg mb-4">"{t.message}"</p>
                <p className="font-semibold text-gold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="py-24 text-center">
        <div className="container-premium grid md:grid-cols-4 gap-12">
          {results.map((r: any) => (
            <motion.div
              key={r._id}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white/5 rounded-2xl border border-white/10"
            >
              <h3 className="text-4xl font-bold text-gold mb-3">{r.title}</h3>
              <p className="text-gray-400">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 bg-gradient-to-r from-gold/20 via-black to-gold/20 text-center">
        <div className="container-premium">
          <h2 className="text-5xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-gray-300 mb-10 text-lg">
            Limited Slots Available — Enroll Before They're Gone
          </p>
          <a href={whatsappLink} target="_blank">
            <Button size="lg" className="px-12 py-6 text-lg">
              Book Free Consultation
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Overview;