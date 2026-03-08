import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

/* ─── Data ─── */
const TAGLINES = [
  'Aspiring Full-Stack Developer & Software Engineer',
  'Building Scalable Apps · Solving Hard Problems',
  'ReactJS · NodeJS · Spring Boot · DSA',
];

const HERO_WORDS = ['SURYA', 'P'];

/* ─── Split-word clip reveal ─── */
function WordReveal({ words, delay = 0 }: { words: string[]; delay?: number }) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-[0.22em]">
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block" style={{ lineHeight: 1 }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 18,
              delay: delay + wi * 0.15,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Tagline crossfade cycle ─── */
function TaglineCycle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 text-center font-body text-lg md:text-xl"
          style={{ color: '#94a3b8' }}
        >
          {TAGLINES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─── Staggered line wipe (mask-clip style) ─── */
function LineWipe({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.7, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Parallax wrapper ─── */
function ParallaxLayer({ speed, children }: { speed: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);
  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}

/* ─── Hero ─── */
export default function Hero() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Background at 0.4× speed
  const bgY = useTransform(scrollY, [0, 600], [0, -240]);
  // Floating cards at 0.7×
  const floatY = useTransform(scrollY, [0, 600], [0, -420]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#020617' }}
    >
      {/* ─── Canvas bg moves at 0.4× ─── */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <ParticleCanvas section="hero" />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(2, 6, 23,0.55) 70%, rgba(2, 6, 23,0.96) 100%)',
      }} />
      {/* Edge warm glow */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        boxShadow: 'inset 0 0 100px rgba(56, 189, 248,0.05), inset 0 0 50px rgba(59, 130, 246,0.03)',
      }} />

      {/* ─── Main content — foreground at 1.0× ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Micro label — line wipe */}
        {visible && (
          <LineWipe delay={0}>
            <p className="font-mono text-[0.6rem] tracking-[0.45em] uppercase mb-5"
              style={{ color: 'rgba(56, 189, 248,0.55)' }}>
              // Portfolio 2025
            </p>
          </LineWipe>
        )}

        {/* ─── Hero name — split-word spring reveal ─── */}
        {visible && (
          <h1
            className="font-display tracking-wide leading-none mb-5"
            style={{
              fontSize: 'clamp(3.8rem, 10vw, 9rem)',
              background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 40%, #3b82f6 80%, #7dd3fc 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'blue-shimmer 6s ease infinite',
              filter: 'drop-shadow(0 0 32px rgba(56, 189, 248,0.22))',
            }}
          >
            <WordReveal words={HERO_WORDS} delay={0.1} />
          </h1>
        )}

        {/* ─── Tagline crossfade cycle ─── */}
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mb-5"
          >
            <TaglineCycle />
          </motion.div>
        )}

        {/* Status badge */}
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
            style={{ border: '1px solid rgba(56, 189, 248,0.22)', background: 'rgba(56, 189, 248,0.06)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] anim-blue-pulse" />
            <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[#38bdf8]">
              Open to Work
            </span>
          </motion.div>
        )}

        {/* ─── Floating cards — 0.7× parallax ─── */}
        <motion.div style={{ y: floatY }} className="will-change-transform">
          {/* Left code card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -60 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass border-blue rounded-xl p-5 font-mono text-sm w-56 text-left"
            >
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#3b82f6' }}>const</span>{' '}
                <span style={{ color: '#7dd3fc' }}>dev</span>
                <span style={{ color: '#f8fafc' }}> = {'{'}</span>
              </div>
              <div className="pl-4 space-y-0.5 text-xs">
                <div><span style={{ color: '#3b82f6' }}>name</span><span style={{ color: '#f8fafc' }}>: </span><span style={{ color: '#7dd3fc' }}>"Surya"</span><span style={{ color: '#f8fafc' }}>,</span></div>
                <div><span style={{ color: '#3b82f6' }}>role</span><span style={{ color: '#f8fafc' }}>: </span><span style={{ color: '#7dd3fc' }}>"FullStack"</span><span style={{ color: '#f8fafc' }}>,</span></div>
                <div><span style={{ color: '#3b82f6' }}>status</span><span style={{ color: '#f8fafc' }}>: </span><span style={{ color: '#86efac' }}>"Open2Work"</span></div>
              </div>
              <div style={{ color: '#f8fafc' }}>{'}'};</div>
            </motion.div>
          </motion.div>

          {/* Right terminal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 60 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="glass border-blue rounded-xl p-5 font-mono text-sm w-52"
            >
              <div className="flex gap-1.5 mb-3">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map(c => (
                  <span key={c} className={`w-3 h-3 rounded-full ${c}`} />
                ))}
              </div>
              <div className="space-y-1 text-xs" style={{ color: '#94a3b8' }}>
                <div><span style={{ color: '#38bdf8' }}>$</span> npm install success</div>
                <div><span style={{ color: '#86efac' }}>✓</span> Build complete</div>
                <div><span style={{ color: '#7dd3fc' }}>→</span> Ready_</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── Social icons ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          {[
            { icon: Github, label: 'GitHub', href: '#' },
            { icon: Linkedin, label: 'LinkedIn', href: '#' },
            { icon: Mail, label: 'Email', href: '#' },
          ].map((s, i) => (
            <motion.a key={s.label} href={s.href}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + i * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.25, y: -5 }}
              whileTap={{ scale: 0.88 }}
              aria-label={s.label}
              className="p-3 rounded-xl glass border-blue transition-all duration-300"
              style={{ cursor: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 18px rgba(56, 189, 248,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
            >
              <s.icon className="w-5 h-5" style={{ color: '#94a3b8' }} />
            </motion.a>
          ))}
        </motion.div>

        {/* ─── CTAs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden px-8 py-3.5 rounded-xl font-body font-semibold text-sm group"
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #3b82f6)',
              boxShadow: '0 0 28px rgba(56, 189, 248,0.28)',
              color: '#020617',
              cursor: 'none',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7dd3fc, #38bdf8)' }} />
            <span className="relative z-10">View My Work</span>
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden px-8 py-3.5 rounded-xl font-body font-medium text-sm group"
            style={{ border: '1px solid rgba(56, 189, 248,0.22)', color: '#f8fafc', background: 'transparent', cursor: 'none' }}
          >
            <div className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: 'rgba(56, 189, 248,0.07)' }} />
            <span className="relative z-10">Get In Touch</span>
          </motion.button>
        </motion.div>

        {/* Scroll down */}
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0, y: [0, 12, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 1 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          aria-label="Scroll down"
          style={{ color: 'rgba(148, 163, 184,0.4)', cursor: 'none' }}
          className="transition-colors duration-300 hover:text-[#38bdf8]"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}
