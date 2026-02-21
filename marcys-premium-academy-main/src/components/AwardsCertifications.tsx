import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import awards1 from '@/assets/award.jpeg';
import awards2 from '@/assets/awards-2.jpg';
import awards3 from '@/assets/trinity.png';
import awards4 from '@/assets/rsl.jpg';

const certifications = [
  {
    name: 'Trinity College London',
    subtitle: 'TCL Certified',
    description: 'Internationally recognized music certification',
    image: awards3, 
  },
  {
    name: 'RockSchool Awards',
    subtitle: 'RSL, London UK',
    description: 'Contemporary music education syllabus',
    image: awards4, 
  },
];


const AwardsCertifications = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      <div className="container-premium relative z-10">
        <SectionHeading
          title="Awards & Certifications"
          subtitle="Internationally recognized excellence in music education"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
              <img
                src={awards1}
                alt="Academy Certifications"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 rounded-xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="premium-card rounded-xl p-6 flex items-start gap-4 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
  <img
    src={cert.image} // ✅ use the card's own image
    alt={cert.name}
    className="w-full h-full object-cover rounded-full"
  />
</div>


                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                    {cert.name}
                  </h4>
                  <p className="text-gold text-sm font-medium mb-2">{cert.subtitle}</p>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-gold/20"
        >
          <img
            src={awards2}
            alt="Academy Awards Collection"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent flex items-center p-8 md:p-12">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Over <span className="text-gold-gradient">1000+ Awards</span>
              </h3>
              <p className="text-muted-foreground max-w-md">
                Our students and academy have been recognized with numerous prestigious awards and achievements.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsCertifications;
