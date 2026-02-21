import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    text: 'Best music academy in Chennai! My daughter has learned piano here and the progress is incredible. The teachers are patient and highly skilled.',
    date: '2 weeks ago',
  },
  {
    name: 'Rajesh Kumar',
    rating: 5,
    text: 'Excellent vocal training. The Trinity certification program is world-class. Highly recommend for anyone serious about music.',
    date: '1 month ago',
  },
  {
    name: 'Anita Menon',
    rating: 5,
    text: 'The speech and drama program transformed my son\'s confidence. He now speaks confidently in public. Thank you Marcys Academy!',
    date: '3 weeks ago',
  },
  {
    name: 'Vikram Patel',
    rating: 5,
    text: 'Professional drum lessons with modern equipment. My instructor is phenomenal. The academy atmosphere is truly premium.',
    date: '1 week ago',
  },
];

const GoogleReviews = () => {
  const overallRating = 4.9;
  const totalReviews = 127;

  return (
    <section className="py-24 section-dark">
      <div className="container-premium">
        <SectionHeading
          title="What Our Students Say"
          subtitle="Real reviews from our music family"
        />

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
        >
          <div className="text-center">
            <div className="font-display text-6xl font-bold text-gold-gradient mb-2">
              {overallRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-gold fill-gold"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Based on {totalReviews} Google Reviews
            </p>
          </div>
          <div className="hidden md:block w-px h-20 bg-gold/20" />
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-foreground font-medium">Google Reviews</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card rounded-2xl p-6 md:p-8 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/20 group-hover:text-gold/40 transition-colors duration-300" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold font-semibold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{review.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
