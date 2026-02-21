"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contact`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setContactData(data);
      } catch (err) {
        console.error("Contact fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading)
    return <p className="text-center py-16">Loading...</p>;

  if (!contactData)
    return (
      <p className="text-center py-16 text-red-500">
        Failed to load contact info
      </p>
    );

  const whatsappLink = `https://wa.me/${contactData.phone.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(contactData.whatsappMsg)}`;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <FloatingWhatsApp />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6">
              Get in Touch
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Contact </span>
              <span className="text-gold-gradient gold-glow">Us</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Ready to start your musical journey? Reach out to us today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 section-dark">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Marcys Academy of Music & Speech
                </h2>
                <p className="text-gold font-medium mb-2">
                  Western Music | Performance Arts
                </p>
                <p className="text-muted-foreground text-sm">
                  (TCL) Trinity College, (RSL) RockSchool Awards, London, UK Syllabus
                </p>
              </div>

              <div className="space-y-2 text-muted-foreground mb-8">
                {contactData.description
                  ?.split("\n")
                  .map((line: string, idx: number) => (
                    <p key={idx}>{line}</p>
                  ))}
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${contactData.phone}`}
                  className="premium-card rounded-xl p-5 flex items-center gap-4 group block"
                >
                  <Phone className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Call Us
                    </div>
                    <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                      {contactData.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${contactData.email}`}
                  className="premium-card rounded-xl p-5 flex items-center gap-4 group block"
                >
                  <Mail className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Email Us
                    </div>
                    <div className="font-medium text-foreground group-hover:text-gold transition-colors">
                      {contactData.email}
                    </div>
                  </div>
                </a>

                <div className="premium-card rounded-xl p-5 flex items-center gap-4">
                  <Clock className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Office Hours
                    </div>
                    <div className="font-medium text-foreground">
                      {contactData.officeHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="xl" className="w-full">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Map */}
              <div className="pt-4">
                <div className="aspect-video rounded-2xl overflow-hidden border border-gold/20">
                  <iframe
                    src={contactData.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "250px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Marcys Academy Location"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;