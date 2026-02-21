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

import servicesHero from "@/assets/services-hero.jpg";
import serviceDrama from "@/assets/service-drama.jpg";
import servicePiano from "@/assets/service-piano.jpg";

interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: string;
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

const fetchServices = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/services");

    if (response.data?.data) return response.data.data;
    if (Array.isArray(response.data)) return response.data;
    return [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const Services = () => {
  const { data, isLoading, isError } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const services = Array.isArray(data) ? data : [];

  if (isLoading)
    return <div className="text-center py-32 text-xl">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-32 text-xl text-red-500">
        Error loading services
      </div>
    );

  const westernMusicServices = services.filter(
    (s) => s.category === "western"
  );
  const performanceServices = services.filter(
    (s) => s.category === "performance"
  );

  const getImageUrl = (image: string) => {
    if (!image) return "";
    return image.startsWith("http")
      ? image
      : `http://localhost:5000/${image}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white overflow-x-hidden">
      <Navbar />
      <FloatingWhatsApp />

      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-28 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesHero}
            alt="Services"
            className="w-full h-full object-cover opacity-20 scale-110"
          />
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
            Explore Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Programs
            </span>
          </motion.h1>
        </div>
      </section>

      {/* ================= WESTERN MUSIC ================= */}
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

      {/* ================= PERFORMANCE ================= */}
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

      {/* ================= TEACHERS TRAINING ================= */}
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
                <h3 className="text-3xl font-bold mb-6">
                  Teachers Training Exclusive
                </h3>
                <p className="text-gray-300 mb-6">
                  At Marcy Academy, our Teachers Training Exclusive program is specially designed for aspiring and existing music educators who want to enhance their teaching skills and professional standards...
                </p>
                <p className="text-gray-300 mb-6">
                  We provide hands-on training, practical demonstrations, and certification guidance...
                </p>
                <p className="text-gray-300">
                  Through this exclusive training, participants gain clarity, confidence...
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden border border-gold/20 shadow-xl">
                <img
                  src={servicePiano}
                  alt="Teachers Training"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SIGNATURE PROGRAM ================= */}
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
              <div className="rounded-3xl overflow-hidden border border-gold/20 shadow-xl">
                <img
                  src={serviceDrama}
                  alt="Signature Program"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Marcy’s Academy Signature Program
                </h3>
                <p className="text-gray-300 mb-6">
                  Marcy’s Academy Signature Program is our specially designed, result-oriented music training program...
                </p>
                <p className="text-gray-300 mb-6">
                  Students receive personalized attention, systematic progression...
                </p>
                <p className="text-gray-300">
                  Our Signature Program is ideal for students who want serious, professional-level training...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;