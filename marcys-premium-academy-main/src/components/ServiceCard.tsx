import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  delay?: number;
}

const ServiceCard = ({ title, icon: Icon, delay = 0 }: ServiceCardProps) => {
  const whatsappNumber = '919025849150';
  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in the ${title} program at Marcys Academy. Could you please provide more information?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="premium-card rounded-xl p-6 md:p-8 flex flex-col items-center text-center group"
    >
      {/* Icon Container */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-all duration-500 group-hover:shadow-[0_0_30px_hsl(43_72%_49%/0.3)]">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-gold group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Title */}
      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-5 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>

      {/* Book Now Button */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
        <Button
          variant="gold-outline"
          className="w-full group-hover:bg-gold group-hover:text-background"
        >
          Book Now
        </Button>
      </a>
    </motion.div>
  );
};

export default ServiceCard;
