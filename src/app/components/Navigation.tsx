import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3"
    >
      {/* Logo */}
      <motion.button
        onClick={() => handleNavClick('home')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent"
      >
        DevPortfolio
      </motion.button>

      {/* Desktop Pill Nav — centred absolutely */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-[#0d1829]/90 backdrop-blur-md border border-cyan-500/20 shadow-xl shadow-black/40"
        >
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            return (
              <motion.div
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 3.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 cursor-pointer ${isActive
                  ? 'bg-[#162035] border border-cyan-500/30 text-white'
                  : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
                <span className="text-[10px] font-semibold tracking-widest uppercase">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right — Settings icon (theme placeholder) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.4, duration: 0.4 }}
        whileHover={{ rotate: 60, scale: 1.1 }}
        className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-[#0d1829]/90 border border-cyan-500/20 text-cyan-400 shadow-lg"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Mobile hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-cyan-400 hover:text-purple-400 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 md:hidden bg-[#0d1829]/95 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-3 shadow-2xl"
          >
            {navItems.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-[#162035] border border-cyan-500/30 text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
