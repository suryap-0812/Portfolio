import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; item: string }[]>([]);
  const rid = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const s = document.getElementById(NAV_ITEMS[i].id);
        if (s && s.offsetTop <= mid) { setActiveTab(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addRipple = (e: React.MouseEvent, item: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = rid.current++;
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, item }]);
    setTimeout(() => setRipples(r => r.filter(r2 => r2.id !== id)), 600);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 2.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: scrolled ? 'rgba(14,12,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.07)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s',
      }}
    >
      {/* ─── Logo ─── */}
      <motion.button
        onClick={() => scrollTo('home')}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        className="text-xl font-display tracking-wide logo-shimmer"
      >
        &lt;SuryaP /&gt;
      </motion.button>

      {/* ─── Desktop pill nav ─── */}
      <div className="hidden md:flex items-center gap-1 px-3 py-2 rounded-2xl glass border-warm">
        {NAV_ITEMS.map((item, i) => {
          const active = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={e => { scrollTo(item.id); addRipple(e, item.id); }}
              onMouseEnter={e => addRipple(e, item.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 + i * 0.07 }}
              className="relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: active ? 'rgba(245,158,11,0.09)' : 'transparent',
                border: active ? '1px solid rgba(245,158,11,0.22)' : '1px solid transparent',
              }}
            >
              {ripples.filter(r => r.item === item.id).map(r => (
                <span key={r.id} className="absolute rounded-full pointer-events-none"
                  style={{
                    left: r.x - 4, top: r.y - 4, width: 8, height: 8,
                    background: 'rgba(245,158,11,0.7)',
                    boxShadow: '0 0 10px rgba(245,158,11,0.6)',
                    animation: 'ripple-out 0.6s ease-out both',
                  }}
                />
              ))}
              <item.icon className="w-4 h-4 transition-colors duration-300"
                style={{ color: active ? '#f59e0b' : '#a8a29e' }} />
              <span className="text-[0.58rem] font-mono tracking-[0.12em] uppercase transition-colors duration-300"
                style={{ color: active ? '#f59e0b' : '#a8a29e' }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ─── Mobile ─── */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}
        className="md:hidden p-2 transition-colors"
        style={{ color: '#a8a29e' }}
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 md:hidden glass border-warm rounded-2xl p-3"
          >
            {NAV_ITEMS.map((item, i) => {
              const active = activeTab === item.id;
              return (
                <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: active ? 'rgba(245,158,11,0.08)' : 'transparent', color: active ? '#f59e0b' : '#a8a29e' }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-body text-sm tracking-wide">{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes ripple-out { to { transform: scale(14); opacity: 0; } }`}</style>
    </motion.header>
  );
}
