import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import Hero3DScene from './Hero3DScene';

const TAGLINES = [
  'Full Stack Developer Intern · Sri Eshwar College of Engineering',
  'Building Scalable Systems · Solving Complex Algorithms',
  'ReactJS · NodeJS · Spring Boot · PostgreSQL · DSA',
];

const HERO_WORDS = ['SURYA', 'P'];

function WordReveal({ words, delay = 0 }: { words: string[]; delay?: number }) {
  return (
    <span className="flex flex-wrap gap-[0.2em] justify-start">
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block" style={{ lineHeight: 1 }}>
          <motion.span
            className="inline-block font-display font-black tracking-tighter"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 85,
              damping: 18,
              delay: delay + wi * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TaglineCycle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-14 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 text-left font-body text-sm md:text-base leading-relaxed text-slate-400"
        >
          {TAGLINES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#020617]">
      {/* Background blueprint grid overlay */}
      <ParticleCanvas section="hero" />

      {/* Main Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Typography & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left py-12">
          
          {/* Status badge */}
          {visible && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#38bdf8]/15 bg-[#38bdf8]/5 w-fit mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#38bdf8]">
                Open to Opportunities
              </span>
            </motion.div>
          )} 
 
          {/* Name Display */}
          {visible && (
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] text-white leading-[0.9] mb-6 tracking-tighter">
              <WordReveal words={HERO_WORDS} delay={0.1} />
            </h1>
          )}

          {/* Tagline */}
          {visible && (
            <div className="mb-6 max-w-lg">
              <TaglineCycle />
            </div>
          )}

          {/* Call to Actions */}
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                data-hover-label="WORK"
                className="px-8 py-3.5 rounded-md font-mono text-xs md:text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-slate-200 transition-colors cursor-none"
              >
                View Selected Work
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-hover-label="TALK"
                className="px-8 py-3.5 rounded-md font-mono text-xs md:text-sm tracking-[0.2em] uppercase border border-white/10 hover:border-white/30 text-white transition-colors cursor-none"
              >
                Get In Touch
              </button>
            </motion.div>
          )}

          {/* Social connections */}
          {visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-5"
            >
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-slate-500">// Connect</span>
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Mail, label: 'Email', href: 'mailto:surya.p2024cse@sece.ac.in' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-hover-label={s.label.toUpperCase()}
                  className="text-slate-400 hover:text-white transition-colors cursor-none"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Column: 3D Geometries viewport inside a clean bordered frame */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[65vh] relative rounded-lg overflow-hidden border border-white/5 bg-slate-950/20 backdrop-blur-sm">
          {/* Internal corner ticks to make it look like a tech layout frame */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />

          {/* The actual 3D glass shape viewport */}
          <div className="absolute inset-0">
            <Hero3DScene />
          </div>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-slate-500 hover:text-white transition-colors cursor-none animate-bounce"
          data-hover-label="SCROLL"
        >
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
