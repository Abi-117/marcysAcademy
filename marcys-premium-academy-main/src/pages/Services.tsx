"use client";

import { motion } from "framer-motion";
import {
  Music,
  Guitar,
  Piano,
  Mic,
  Drum,
  Theater,
  Users,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import EnhancedServiceCard from "@/components/EnhancedServiceCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { API_BASE, SERVER_BASE } from "../config";

import servicesHero from "@/assets/services-hero.jpg";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: string;
}

interface ProgramSection {
  title: string;
  paragraphs: string[];
  image: string;
}

const iconMap: Record<string, any> = {
  Mic,
  Guitar,
  Piano,
  Drum,
  Music,
  Theater,
  Users,
  Sparkles,
  Volume2,
};

// Fetch Services
const fetchServices = async () => {
  const res = await axios.get(`${API_BASE}/services`);
  return res.data?.data || res.data || [];
};

// Fetch Program Section
const fetchProgramSection = async (section: string): Promise<ProgramSection> => {
  try {
    const res = await axios.get(`${API_BASE}/program/${section}`);
    return res.data || { title: "", paragraphs: [], image: "" };
  } catch {
    return { title: "", paragraphs: [], image: "" };
  }
};

const Services = () => {
  const { data: servicesData, isLoading: servicesLoading, isError: servicesError } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: teachersTraining, isLoading: teachersLoading } = useQuery<ProgramSection>({
    queryKey: ["program", "teachers"],
    queryFn: () => fetchProgramSection("teachers"),
  });

  const { data: signatureProgram, isLoading: signatureLoading } = useQuery<ProgramSection>({
    queryKey: ["program", "signature"],
    queryFn: () => fetchProgramSection("signature"),
  });

  const services = Array.isArray(servicesData) ? servicesData : [];
  const westernMusicServices = services.filter(s => s.category === "western");
  const performanceServices = services.filter(s => s.category === "performance");

  const getImageUrl = (image: string) => {
    if (!image) return "";
    return image.startsWith("http") ? image : `${SERVER_BASE}/${image}`;
  };

  if (servicesLoading || teachersLoading || signatureLoading)
    return <div className="text-center py-32 text-xl">Loading...</div>;

  if (servicesError)
    return <div className="text-center py-32 text-xl text-red-500">Error loading services</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white overflow-x-hidden">
      <Navbar />
      <FloatingWhatsApp />

      {/* HERO */}
      <section className="relative pt-40 pb-28 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={servicesHero} alt="Services" className="w-full h-full object-cover opacity-20 scale-110" />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-3 rounded-full bg-gold/10 border border-gold/40 text-gold text-sm tracking-wide mb-6"
          >
            Our Programs
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Explore Our <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Programs</span>
          </motion.h1>
        </div>
      </section>

      {/* WESTERN MUSIC */}
      <section className="py-24">
        <div className="container-premium">
          <SectionHeading
            title="Western Music"
            subtitle="Children-focused International Curriculum Programs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {westernMusicServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Music;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <EnhancedServiceCard
                    title={service.title}
                    icon={IconComponent}
                    image={getImageUrl(service.image)}
                    description={service.description}
                    buttonText="Book Now"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="py-24 bg-[#111]">
        <div className="container-premium">
          <SectionHeading
            title="Performance Arts"
            subtitle="Stage Confidence, Communication & Acting Mastery"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {performanceServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Music;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <EnhancedServiceCard
                    title={service.title}
                    icon={IconComponent}
                    image={getImageUrl(service.image)}
                    description={service.description}
                    buttonText="Book Now"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* TEACHERS TRAINING */}
      {teachersTraining && (
        <section className="py-24">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-16 shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl text-gold-gradient font-bold mb-6">{teachersTraining.title}</h3>
                  {teachersTraining?.paragraphs?.map((p, i) => (
                    <p key={i} className="text-gray-300 mb-6">{p}</p>
                  ))}
                </div>
                {teachersTraining.image && (
                  <div className="rounded-3xl overflow-hidden border border-gold/20 shadow-xl">
                    <img
                      src={getImageUrl(teachersTraining.image)}
                      alt={teachersTraining.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SIGNATURE PROGRAM */}
      {signatureProgram && (
        <section className="py-24 bg-[#111]">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-16 shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {signatureProgram.image && (
                  <div className="rounded-3xl overflow-hidden border border-gold/20 shadow-xl">
                    <img
                      src={getImageUrl(signatureProgram.image)}
                      alt={signatureProgram.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-3xl text-gold-gradient font-bold mb-6">{signatureProgram.title}</h3>
                  {signatureProgram?.paragraphs?.map((p, i) => (
                    <p key={i} className="text-gray-300 mb-6">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Services;