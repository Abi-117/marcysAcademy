import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Heart, Users, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import WhyChooseUs from "@/components/WhyChooseUs";
import GoogleReviews from "@/components/GoogleReviews";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface Achievement {
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

const iconMap: Record<string, any> = { Target, Heart, Users, Sparkles };

const API_URL = import.meta.env.VITE_API_URL;

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error("Error fetching about:", err));
  }, []);

  if (!about) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-premium relative z-10 text-center">
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Story
          </motion.span>

          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-foreground">About </span>
            <span className="text-gold-gradient gold-glow">
              {about.heroText}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 section-dark">
        <div className="container-premium grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-medium uppercase tracking-wider">
              About
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
              Founder & Lead Educator
            </h2>

            <div className="space-y-4 text-muted-foreground whitespace-pre-line text-justify leading-relaxed">
              <p>{about.story}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {about.heroImage && (
              <div className="flex flex-col items-center space-y-4">
                <div className="aspect-[3/4] w-96 rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
                  <img
                    src={`${API_URL}/uploads/${about.heroImage}`}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gold">
                    Ms. Marceline Samuel
                  </h2>
                  <p className="text-white">
                    Founder and Director of Marcy’s Academy
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <GoogleReviews />
      <Footer />
    </div>
  );
};

export default About;