import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/music.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Overview", path: "/overview" }, 
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const whatsappLink =
    "https://wa.me/919025849150?text=" +
    encodeURIComponent(
      "Hello! I would like to book a session at Marcys Academy."
    );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white
        ${isScrolled ? "shadow-md border-b border-black/5" : ""}
      `}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="Marcys Academy"
              className="h-14 md:h-20 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="hidden sm:block">
              <h1 className="font-display text-lg md:text-2xl font-bold text-gold">
                Marcys Academy
              </h1>
              <p className="text-xs text-black/60">Music & Speech</p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
  {navLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300
        ${
          location.pathname === link.path
            ? "text-[#FFD700]"      // bright gold for active link
            : "text-black hover:text-[#ffd500]" // hover bright gold
        }
      `}
    >
      {link.name}
    </Link>
  ))}

  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="ml-4"
  >
    <Button className="bg-[#FFD700] hover:bg-[#ffbf00] text-black" size="lg">
      <MessageCircle className="w-4 h-4" />
      Book Now
    </Button>
  </a>
</div>


          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gold hover:bg-gold/10 rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-black/5"
          >
            <div className="container-premium py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium
                      ${
                        location.pathname === link.path
                          ? "text-gold bg-gold/10"
                          : "text-black hover:text-gold hover:bg-gold/5"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="gold" size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    Book Now
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
