import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';
import gsap from 'gsap';
import NavBackground3D from './NavBackground3D';

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
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // GSAP Active Indicator Animation
  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeTab);
    const activeEl = navRefs.current[activeIndex];
    if (activeEl && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        duration: 0.6,
        ease: "back.out(1.2)"
      });
    }
  }, [activeTab]);

  const scrollTo = (id: string) => {
    setIsMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // GSAP Magnetic Hover Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const el = navRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = navRefs.current[index];
    if (el) {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.4)"
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 pointer-events-none"
    >
      {/* ─── Logo ─── */}
      <div className="w-40 pointer-events-auto">
        <motion.button
          onClick={() => scrollTo('home')}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="text-2xl font-display tracking-wide logo-shimmer transition-transform"
          style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}
        >
          &lt;SuryaP /&gt;
        </motion.button>
      </div>

      {/* ─── Desktop pill nav ─── */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 px-3 py-2.5 rounded-full pointer-events-auto transform-gpu"
        style={{
          background: scrolled ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(56, 189, 248, 0.18)',
          boxShadow: scrolled ? '0 10px 40px -10px rgba(2,6,23,0.8), 0 0 25px rgba(56,189,248,0.15)' : '0 10px 40px -10px rgba(2,6,23,0.5)',
          transition: 'background 0.5s, box-shadow 0.5s',
          minWidth: '460px',
          justifyContent: 'center'
        }}>

        {/* ThreeJS Background inside the pill */}
        <NavBackground3D />

        {/* GSAP Active Tab Indicator */}
        <div
          ref={indicatorRef}
          className="absolute left-0 top-2 bottom-2 rounded-full z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)'
          }}
        />

        {NAV_ITEMS.map((item, i) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              ref={el => { navRefs.current[i] = el; }}
              onClick={() => scrollTo(item.id)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="relative z-10 flex items-center gap-2.5 px-7 py-3 rounded-full overflow-hidden transition-colors duration-300 group"
              style={{ cursor: 'none' }}
            >
              <item.icon className="w-4 h-4 transition-colors duration-300 relative z-10"
                style={{ color: active ? '#7dd3fc' : '#94a3b8' }} />
              <span className="text-[0.68rem] font-mono tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-[#bae6fd] relative z-10"
                style={{ color: active ? '#f8fafc' : '#94a3b8' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-40 hidden md:block pointer-events-none" />

      {/* ─── Mobile ─── */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}
        className="md:hidden p-2 transition-colors pointer-events-auto relative z-50 rounded-full"
        style={{ color: '#94a3b8', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(56, 189, 248,0.2)' }}
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
            className="absolute top-20 left-4 right-4 md:hidden glass border-blue rounded-2xl p-3 pointer-events-auto"
          >
            {NAV_ITEMS.map((item, i) => {
              const active = activeTab === item.id;
              return (
                <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: active ? 'rgba(56, 189, 248,0.1)' : 'transparent', color: active ? '#38bdf8' : '#94a3b8' }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-body text-sm tracking-wide">{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
