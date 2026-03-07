import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    // Check initial theme from localStorage on component mount
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme !== 'light');

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

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
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
        className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent"
      >
        DevPortfolio
      </motion.button>

      {/* Desktop Pill Nav — centred absolutely */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-white/90 dark:bg-[#0d1829]/90 backdrop-blur-md border border-gray-200 dark:border-cyan-500/20 shadow-xl shadow-gray-200/50 dark:shadow-black/40"
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
                  ? 'bg-gray-100 dark:bg-[#162035] border border-gray-200 dark:border-cyan-500/30 text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : ''}`} />
                <span className="text-[10px] font-semibold tracking-widest uppercase">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right — Light/Dark mode toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.4, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        onClick={toggleTheme}
        className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-[#0d1829]/90 border border-gray-200 dark:border-cyan-500/20 text-yellow-500 dark:text-cyan-400 shadow-lg shadow-gray-200/50 dark:shadow-black/40"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* Mobile hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-cyan-600 dark:text-cyan-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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
            className="absolute top-16 left-4 right-4 md:hidden bg-white/95 dark:bg-[#0d1829]/95 backdrop-blur-md border border-gray-200 dark:border-cyan-500/20 rounded-2xl p-3 shadow-2xl shadow-gray-200/50 dark:shadow-black/40"
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
                    ? 'bg-gray-100 dark:bg-[#162035] border border-gray-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-cyan-500/5'
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
