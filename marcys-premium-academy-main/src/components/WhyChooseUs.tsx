import { motion } from 'framer-motion';
import { Award, Users, Clock, Star, Shield, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';

const reasons = [
  {
    icon: Award,
    title: 'Internationally Certified',
    description: 'Trinity College London & RockSchool UK certified programs',
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description: 'Trained professionals with years of teaching experience',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Learn at your convenience with adaptable class timings',
  },
  {
    icon: Star,
    title: '100% Success Rate',
    description: 'Every student passes their international certification exams',
  },
  {
  icon: Shield,
  title: 'Flexible Learning Options',
  description: 'Choose between Group Batch sessions for collaborative learning or Individual Batch training for one-on-one focused mentorship.',
},
  {
    icon: Sparkles,
    title: 'Modern Curriculum',
    description: 'Blend of classical techniques and contemporary teaching methods',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 section-dark">
      <div className="container-premium">
        <SectionHeading
          title="Why Choose Marcys Academy?"
          subtitle="Excellence in music education that sets us apart"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card rounded-2xl p-8 group hover:border-gold/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 group-hover:shadow-[0_0_30px_hsl(43_72%_49%/0.3)] transition-all duration-500">
                <reason.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                {reason.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
