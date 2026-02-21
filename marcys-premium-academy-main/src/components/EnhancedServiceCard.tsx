import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EnhancedServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  delay?: number;
  buttonText?: string;
}

const EnhancedServiceCard = ({ title, description, icon: Icon, image, delay = 0 }: EnhancedServiceCardProps) => {
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
      className="premium-card rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/30 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-500">
          <Icon className="w-6 h-6 text-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
          {description}
        </p>
        
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="gold-outline"
            className="w-full group-hover:bg-gold group-hover:text-background transition-all duration-300"
          >
            Book Now
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default EnhancedServiceCard;
