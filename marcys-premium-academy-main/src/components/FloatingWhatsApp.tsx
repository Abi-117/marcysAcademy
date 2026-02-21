import { motion } from "framer-motion";

const FloatingWhatsApp = () => {
  const whatsappLink =
    "https://wa.me/919025849150?text=" +
    encodeURIComponent(
      "Hello! I would like to learn more about Marcys Academy."
    );

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Glow */}
      <span className="absolute inset-0 rounded-full bg-[#D4AF37] blur-2xl opacity-40 group-hover:opacity-70 transition duration-300" />

      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          x: [0, -2, 2, -2, 2, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="relative flex items-center justify-center w-20 h-20 rounded-full bg-black shadow-2xl"
      >
        {/* Proper Gold SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10"
          fill="url(#goldGradient)"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
          <path d="M12 2C6.48 2 2 6.03 2 11.05c0 1.78.5 3.44 1.37 4.88L2 22l6.3-1.64c1.38.37 2.84.57 4.35.57 5.52 0 10-4.03 10-9S17.52 2 12 2zm5.52 12.62c-.23.65-1.33 1.24-1.84 1.31-.48.07-1.08.1-1.74-.11-.4-.12-.92-.3-1.59-.59-2.79-1.2-4.6-3.98-4.74-4.16-.14-.18-1.14-1.52-1.14-2.9 0-1.38.72-2.05.98-2.33.26-.28.56-.35.74-.35.19 0 .37.01.53.02.17.01.39-.06.61.46.23.52.78 1.8.85 1.93.07.14.12.3.02.49-.1.19-.15.3-.29.47-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.74-.86.94-1.16.19-.3.39-.25.65-.15.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.11.07.65-.16 1.3z" />
        </svg>
      </motion.div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
