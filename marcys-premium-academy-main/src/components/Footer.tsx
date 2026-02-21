import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-gold/10">
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Marcys Academy"
                className="h-14 w-auto object-contain drop-shadow-[0_0_10px_hsl(43_72%_49%/0.3)]"
              />
            </Link>
            <h3 className="font-display text-xl font-bold text-gold-gradient">
              Marcys Academy
            </h3>
            <p className="text-sm text-muted-foreground">
              Western Music | Performance Arts
            </p>
            <p className="text-xs text-muted-foreground">
              (TCL) Trinity College, (RSL) RockSchool Awards, London, UK Syllabus
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-display text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-gold transition-colors duration-300 gold-underline inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-display text-lg font-semibold text-foreground">
              Our Programs
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                'Western Music',
                'Classical Guitar',
                'Piano & Keyboard',
                'Vocals & Drums',
                'Speech & Drama',
                'Public Speaking',
              ].map((service) => (
                <li key={service} className="text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="font-display text-lg font-semibold text-foreground">
              Reach Us
            </h4>

            {/* Western Music */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gold">Western Music</p>
              <a
                href="tel:+919025849150"
                className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91 90258 49150
              </a>
             
            </div>

            {/* Performance Arts */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gold">Performance Arts</p>
              <a
                href="tel:+919840198348"
                className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91-98401983480
              </a>
              
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gold">Reach Out</p>
              
              <a
                href="mailto:contact@marcysacademy.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-gold" />
                contact@marcysacademy.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.facebook.com/marcyschoolofmusic/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/marcysmusica_conservatoire?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@marcysmusicaconservatoire1477?si=KDZNy0-PyqLyqwXO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              >
                <Youtube size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <p>© {currentYear} Marcys Academy of Music & Speech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gold/50">|</span>
            <span>
              Powered by{' '}
              <a
                href="https://zentelait.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                Zenelait Info Tech
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
