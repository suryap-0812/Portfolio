import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-black/90 backdrop-blur-lg border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
            DevPortfolio
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 3.3 }}
                whileHover="hovered"
                whileTap={{ scale: 0.92 }}
                className="relative group flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {/* Glow background pill on hover */}
                <motion.span
                  variants={{
                    hovered: { opacity: 1, scale: 1 },
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-cyan-500/10 to-purple-600/10 border border-cyan-500/20"
                />

                {/* Icon with float + glow on hover */}
                <motion.div
                  variants={{
                    hovered: {
                      y: -3,
                      scale: 1.25,
                      filter: 'drop-shadow(0 0 8px #06b6d4)',
                    },
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 },
                  }}
                  className="relative z-10"
                >
                  <item.icon className="w-7 h-7" />
                </motion.div>

                {/* Label */}
                <motion.span
                  variants={{
                    hovered: { color: '#22d3ee', y: -1 },
                  }}
                  initial={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 text-[11px] font-semibold tracking-widest uppercase text-gray-300"
                >
                  {item.label}
                </motion.span>

                {/* Bottom gradient line */}
                <motion.span
                  variants={{ hovered: { scaleX: 1, opacity: 1 } }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 origin-center"
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-cyan-400 hover:text-purple-400 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-2 py-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isMobileMenuOpen
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
              >
                <item.icon className="w-6 h-6" />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
