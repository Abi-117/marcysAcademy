import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Music,
  Star,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/new.jpeg";
import { Button } from "@/components/ui/button";
import AwardsCertifications from "@/components/AwardsCertifications";
import HeroSlider from "@/components/HeroSlider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const API_URL = import.meta.env.VITE_API_URL;

// Map icon names to components
const iconMap: Record<string, any> = {
  Users,
  Award,
  Music,
  Star,
  MessageCircle,
  ArrowRight,
};

const Index = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/index`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Index fetch error:", err);
        setData(null);
      });
  }, []);

  const whatsappLink =
    "https://wa.me/919025849150?text=" +
    encodeURIComponent(
      "Hello! I would like to learn more about Marcys Academy."
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider />

        <div className="relative z-10 container-premium pt-24">
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6">
            {data.heroText}
          </span>

          <h1 className="font-display text-5xl font-bold mb-4">
            {data.heroSubText}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
          >
            Transform your passion into artistry at Marcys Academy of Music &
            Speech. Expert training in Western Music and Performance Arts.
          </motion.p>

          <Link to="/services">
            <button className="bg-gold px-4 py-2 rounded">
              {data.heroCTA}
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container-premium grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats?.map((s: any, i: number) => {
            const Icon = iconMap[s.icon] || Users;

            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gold" />
                </div>

                <div className="font-bold text-3xl text-gold-gradient mb-2">
                  {s.value}
                </div>

                <div className="text-muted-foreground text-sm">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AwardsCertifications />

      {/* About Section */}
      <section className="py-24 section-dark">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-medium uppercase tracking-wider">
                {data.aboutTitle}
              </h2>

              <h3 className="font-display text-gold text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                {data.aboutSubTitle}
              </h3>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {data.aboutDescription}
              </p>

              <ul className="list-disc pl-5 space-y-3 mb-8">
                {data.aboutPoints?.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <Link to="/about">
                <Button variant="gold-outline" size="lg" className="group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
              <img
                src={aboutHero}
                alt="Music training at Marcys Academy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">{data.ctaTitle}</h2>
        <p className="mb-4">{data.ctaDescription}</p>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <button className="bg-gold px-6 py-3 rounded">
            {data.ctaButtonText}
          </button>
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Index;