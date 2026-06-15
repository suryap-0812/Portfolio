import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const s = document.getElementById(NAV_ITEMS[i].id);
        if (s && s.offsetTop <= mid) {
          setActiveTab(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#020617]/90 backdrop-blur-md border-b border-white/5 py-3.5 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-white/0 py-5'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <button
          onClick={() => scrollTo('home')}
          className="text-lg font-display tracking-widest font-bold text-[var(--color-text)] hover:text-sky-400 transition-colors uppercase cursor-none"
          data-hover-label="HOME"
        >
          &lt;SuryaP /&gt;
        </button>
      </div>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-hover-label={item.label.toUpperCase()}
              className="relative py-1 font-mono text-xs md:text-sm tracking-[0.18em] uppercase transition-colors duration-250 cursor-none"
              style={{ color: active ? 'var(--theme-text)' : 'var(--theme-muted)' }}
            >
              <span className="hover:text-[var(--theme-text)] transition-colors duration-200">
                {item.label}
              </span>
              
              {/* Subtle slide underline for active element */}
              {active && (
                <motion.div
                  layoutId="navActiveUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sky-400"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* Theme Toggle Button next to Contact */}
        <button
          onClick={toggleTheme}
          data-hover-label="THEME"
          className="p-2 ml-2 text-[var(--theme-muted)] hover:text-[var(--theme-text)] transition-all cursor-none border border-white/5 theme-border-strong rounded bg-transparent"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-none"
        data-hover-label={isMobile ? "CLOSE" : "MENU"}
      >
        {isMobile ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 bg-[#020617] border-b border-white/5 overflow-hidden md:hidden shadow-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left py-3.5 px-4 font-mono text-xs tracking-[0.15em] uppercase rounded-lg transition-colors ${
                      active 
                        ? 'bg-white/5 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-3.5 px-4 font-mono text-xs tracking-[0.15em] uppercase rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <span>Theme: {theme === 'dark' ? 'Light' : 'Dark'}</span>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
