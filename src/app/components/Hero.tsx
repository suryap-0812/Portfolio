import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const TAGLINE = 'Aspiring Full-Stack Developer & Software Engineer';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0e0c0a' }}
    >
      {/* Warm particle + nebula canvas */}
      <ParticleCanvas section="hero" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(14,12,10,0.55) 70%, rgba(14,12,10,0.96) 100%)',
        zIndex: 1,
      }} />

      {/* Warm edge glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 100px rgba(245,158,11,0.06), inset 0 0 50px rgba(224,124,92,0.04)',
        zIndex: 1,
      }} />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Micro label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[0.6rem] tracking-[0.45em] uppercase mb-5"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          // Portfolio 2025
        </motion.p>

        {/* ─── Name — warm gradient, smooth fade up ─── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-wide leading-none mb-5"
          style={{
            fontSize: 'clamp(3.8rem, 10vw, 9rem)',
            background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 40%, #e07c5c 80%, #fcd34d 100%)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'warm-shimmer 6s ease infinite',
            filter: 'drop-shadow(0 0 32px rgba(245,158,11,0.22))',
          }}
        >
          Surya P
        </motion.h1>

        {/* ─── Tagline ─── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-body font-light text-xl md:text-2xl mb-5"
          style={{ color: '#a8a29e', lineHeight: 1.6 }}
        >
          {TAGLINE}
        </motion.h2>

        {/* ─── Status badge ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ border: '1px solid rgba(245,158,11,0.22)', background: 'rgba(245,158,11,0.06)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] anim-warm-pulse" />
          <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[#f59e0b]">
            Open to Work
          </span>
        </motion.div>

        {/* ─── Floating code card (left) ─── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -60 }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass border-warm rounded-xl p-5 font-mono text-sm w-56 text-left">
            <div style={{ color: '#f59e0b' }}>
              <span style={{ color: '#e07c5c' }}>const</span>{' '}
              <span style={{ color: '#fcd34d' }}>dev</span>
              <span style={{ color: '#fafaf9' }}> = {'{'}</span>
            </div>
            <div className="pl-4 space-y-0.5 text-xs">
              <div><span style={{ color: '#e07c5c' }}>name</span><span style={{ color: '#fafaf9' }}>: </span><span style={{ color: '#fcd34d' }}>"Surya"</span><span style={{ color: '#fafaf9' }}>,</span></div>
              <div><span style={{ color: '#e07c5c' }}>role</span><span style={{ color: '#fafaf9' }}>: </span><span style={{ color: '#fcd34d' }}>"FullStack"</span><span style={{ color: '#fafaf9' }}>,</span></div>
              <div><span style={{ color: '#e07c5c' }}>status</span><span style={{ color: '#fafaf9' }}>: </span><span style={{ color: '#86efac' }}>"Open2Work"</span></div>
            </div>
            <div style={{ color: '#fafaf9' }}>{'}'};</div>
          </motion.div>
        </motion.div>

        {/* ─── Floating terminal (right) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 60 }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="glass border-warm rounded-xl p-5 font-mono text-sm w-52">
            <div className="flex gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="space-y-1 text-xs" style={{ color: '#a8a29e' }}>
              <div><span style={{ color: '#f59e0b' }}>$</span> npm install success</div>
              <div><span style={{ color: '#86efac' }}>✓</span> Build complete</div>
              <div><span style={{ color: '#fcd34d' }}>→</span> Ready_</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Social icons ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          {[
            { icon: Github, label: 'GitHub', href: '#' },
            { icon: Linkedin, label: 'LinkedIn', href: '#' },
            { icon: Mail, label: 'Email', href: '#' },
          ].map((s, i) => (
            <motion.a key={s.label} href={s.href}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.2, y: -4 }} whileTap={{ scale: 0.9 }}
              aria-label={s.label}
              className="p-3 rounded-xl glass border-warm transition-all duration-300"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 18px rgba(245,158,11,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
            >
              <s.icon className="w-5 h-5" style={{ color: '#a8a29e' }} />
            </motion.a>
          ))}
        </motion.div>

        {/* ─── CTAs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-3.5 rounded-xl font-body font-semibold text-sm text-[#0e0c0a] group"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #e07c5c)',
              boxShadow: '0 0 28px rgba(245,158,11,0.28)',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
            <span className="relative z-10">View My Work</span>
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-3.5 rounded-xl font-body font-medium text-sm group"
            style={{ border: '1px solid rgba(245,158,11,0.22)', color: '#fafaf9', background: 'transparent' }}
          >
            <div className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: 'rgba(245,158,11,0.07)' }} />
            <span className="relative z-10">Get In Touch</span>
          </motion.button>
        </motion.div>

        {/* Scroll down */}
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0, y: [0, 12, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          aria-label="Scroll down"
          style={{ color: 'rgba(168,162,158,0.4)' }}
          className="transition-colors duration-300 hover:text-[#f59e0b]"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}
