import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '@/assets/logo.png';
import zenelaitLogo from "@/assets/logo - zen.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-gold/10">
      <div className="container-premium py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

    {/* Brand */}
    <div className="space-y-4">
      <img src={logo} alt="Marcys Academy" className="h-14 w-auto" />
      <h3 className="font-display text-2xl font-bold text-gold-gradient">
        Marcys Academy
      </h3>
      <p className="text-sm text-muted-foreground">
        Western Music | Performance Arts
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        (TCL) Trinity College, (RSL) RockSchool Awards, London, UK Syllabus
      </p>
    </div>

    {/* Quick Links */}
    <div className="space-y-4">
      <h4 className="footer-title">Quick Links</h4>
      <ul className="space-y-3 text-muted-foreground">
        {['Home','About','Services','Gallery','Contact'].map(link => (
          <li key={link}>
            <Link
              to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              className="hover:text-gold transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Western Music */}
    <div className="space-y-4">
      <h4 className="footer-title">Western Music</h4>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {[
          'Guitar','Piano','Singing','Drums',
          'Electric Guitar','Keyboard','Violin','Ukulele',
          'Bass Guitar','Classical Guitar','Acoustic Guitar',
          'Music Theory','Music Production'
        ].map(item => (
          <span key={item} className="hover:text-gold transition-colors cursor-pointer">
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* Performance Arts */}
    <div className="space-y-4">
      <h4 className="footer-title">Performance Arts</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {[
          'Speech & Drama',
          'Musical Theatre',
          'Public Speaking Skill',
          'Communication Skill',
          'Acting Skills',
          'Screen Acting'
        ].map(item => (
          <li key={item} className="hover:text-gold transition-colors cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Reach Us */}
    <div className="space-y-6">
      <h4 className="footer-title">Reach Us</h4>

      <div className="space-y-3">
        <p className="text-gold font-semibold text-sm">Western Music</p>
        <p className="text-muted-foreground text-sm">+91 90258 49150</p>
      </div>

      <div className="space-y-3">
        <p className="text-gold font-semibold text-sm">Performance Arts</p>
        <p className="text-muted-foreground text-sm">+91 98401 983480</p>
      </div>

      <div className="space-y-3">
        <p className="text-gold font-semibold text-sm">Reach Out</p>
        <p className="text-muted-foreground text-sm">
          contact@marcysacademy.com
        </p>
      </div>
    </div>

  </div>
  {/* Bottom Bar */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  viewport={{ once: true }}
  className="mt-14 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
>
  {/* Left Side */}
  <p>
    © {currentYear} Marcys Academy of Music & Speech. All rights reserved.
  </p>

  {/* Right Side */}
  <div className="flex items-center gap-3">
    <span>Developed by</span>

    <a
      href="https://zenelaitinfotech.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 group"
    >
      <img
        src={zenelaitLogo}
        alt="Zenelait Info Tech"
        className="h-14 w-28 object-contain bg-white group-hover:scale-105 transition-transform duration-300 rounded-2xl"
      />
    </a>
  </div>
</motion.div>
</div>
    </footer>
  );
};

export default Footer;
