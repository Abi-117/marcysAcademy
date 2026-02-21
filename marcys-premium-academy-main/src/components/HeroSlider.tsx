import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import heroBg from '@/assets/hero-bg.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import hero4 from '@/assets/hero-4.jpg';

const heroImages = [heroBg, hero2, hero3, hero4];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={heroImages[currentIndex]}
          alt="Marcys Academy"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'w-8 bg-gold shadow-[0_0_10px_hsl(43_72%_49%/0.5)]'
                : 'bg-gold/30 hover:bg-gold/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
