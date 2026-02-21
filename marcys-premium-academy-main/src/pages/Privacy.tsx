import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-gold-gradient gold-glow">
              Privacy Policy
            </h1>

            <div className="prose prose-invert prose-gold max-w-none space-y-6 text-muted-foreground">
              <p>
                At Marcys Academy of Music & Speech, we are committed to protecting your privacy. 
                This Privacy Policy outlines how we collect, use, and safeguard your personal information.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email address, phone number, 
                and any other information you provide when you contact us or enroll in our programs.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To communicate with you about our programs</li>
                <li>To send you relevant updates and promotional materials</li>
                <li>To respond to your inquiries</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gold">
                Email: marcysacademy@gmail.com<br />
                Phone: +91-9025849150
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
