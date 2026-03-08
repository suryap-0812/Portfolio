import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Code, Server, Database, Wrench, BookOpen, Trophy } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const SKILLS = [
  { icon: Code, title: 'Languages', desc: 'C++, C, Java, JavaScript, HTML, CSS, Python', color: '#38bdf8' },
  { icon: Server, title: 'Technologies', desc: 'Spring Boot, NodeJS, Express, ReactJS, TailwindCSS, Django', color: '#3b82f6' },
  { icon: Database, title: 'Databases', desc: 'SQL, MongoDB, PostgreSQL', color: '#7dd3fc' },
  { icon: Wrench, title: 'Tools', desc: 'Git, GitHub, Postman, Vercel, Docker', color: '#38bdf8' },
  { icon: BookOpen, title: 'Core Concepts', desc: 'Data Structures & Algorithms, OOP, DBMS', color: '#3b82f6' },
  { icon: Trophy, title: 'Profiles', desc: 'Leetcode: 1484 Max Rating, 125+ solved · Skillrack: 1009+ problems', color: '#7dd3fc' },
];

const ACHIEVEMENTS = [
  { year: '2025', role: 'Eureka! 2025 Zonal Rounds Shortlist', org: 'E-Cell, IIT Bombay' },
  { year: '2025', role: 'Smart India Hackathon (SIH) Shortlist', org: 'Internal Round Selection' },
  { year: '2025', role: 'Mastering DSA using C/C++', org: 'Udemy Certification' },
  { year: '2025', role: 'Deep Learning Specialization', org: 'NVIDIA Certification' },
  { year: '2024', role: 'ReactJS Masterclass', org: 'Udemy Certification' },
  { year: '2024', role: 'Completion Of C++ Training', org: 'IIT Bombay Certification' },
];

function Label({ children }: { children: string }) {
  return (
    <p className="font-mono text-[0.6rem] tracking-[0.42em] uppercase mb-4" style={{ color: 'rgba(56, 189, 248,0.55)' }}>
      // {children}
    </p>
  );
}

/* ─── Mask-clip line wipe ─── */
function MaskWipe({ children, delay = 0, inView }: { children: React.ReactNode; delay?: number; inView: boolean }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={inView ? { y: '0%' } : { y: '100%' }}
        transition={{ duration: 0.65, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Scroll parallax for bg canvas
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']); // foreground = normal

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#0f172a' }}>

      {/* Canvas at 0.4× pull-back via bgY */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <ParticleCanvas section="about" />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248,0.3), rgba(59, 130, 246,0.25), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ─── Header — line wipe ─── */}
        <div className="text-center mb-20">
          <MaskWipe delay={0} inView={inView}><Label>About Me</Label></MaskWipe>
          <MaskWipe delay={0.08} inView={inView}>
            <h2 className="font-display tracking-wide leading-[1.1] mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                background: 'linear-gradient(135deg, #f8fafc, #38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
              Crafted With Code
            </h2>
          </MaskWipe>
          <MaskWipe delay={0.16} inView={inView}>
            <p className="font-body text-base max-w-2xl mx-auto" style={{ color: '#94a3b8', lineHeight: 2 }}>
              I'm a passionate developer with a strong foundation in full-stack web development,
              data structures, and algorithms — dedicated to building robust, scalable applications.
            </p>
          </MaskWipe>
        </div>

        {/* ─── Stats ─── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid grid-cols-3 gap-px mb-20 rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(56, 189, 248,0.08)' }}>
          {[
            { label: 'Projects Built', value: '10+' },
            { label: 'Certifications', value: '6' },
            { label: 'Problems Solved', value: '1009+' },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32 + i * 0.08, duration: 0.55 }}
              className="py-8 text-center glass">
              <div className="font-display text-3xl mb-1" style={{
                background: 'linear-gradient(135deg, #38bdf8, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.value}</div>
              <div className="font-mono text-[0.56rem] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(148, 163, 184,0.45)' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Skills ─── */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <MaskWipe delay={0.35} inView={inView}><Label>Skills & Stack</Label></MaskWipe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(56, 189, 248,0.04)' }}>
            {SKILLS.map((sk, i) => (
              <motion.div key={sk.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.38 + i * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group relative p-8 glass overflow-hidden"
                style={{ cursor: 'none' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${sk.color}12, transparent 70%)` }} />
                <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.45 }}
                  className="absolute top-0 left-0 right-0 h-px origin-left"
                  style={{ background: `linear-gradient(90deg, ${sk.color}, transparent)` }} />

                <div className="w-12 h-12 mb-5 rounded-lg flex items-center justify-center relative overflow-hidden tag-blue"
                  style={{ border: `1px solid ${sk.color}28` }}>
                  <sk.icon className="w-6 h-6 relative z-10" style={{ color: sk.color }} />
                </div>

                <h3 className="font-display tracking-wide text-lg mb-2" style={{ color: '#f8fafc' }}>{sk.title}</h3>
                <p className="font-body text-sm" style={{ color: '#94a3b8', lineHeight: 1.9 }}>{sk.desc}</p>

                <div className="absolute right-4 bottom-4 font-display text-6xl select-none pointer-events-none transition-opacity duration-300 opacity-[0.03] group-hover:opacity-[0.07]"
                  style={{ color: sk.color }}>{String(i + 1).padStart(2, '0')}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Achievements — staggered line wipes ─── */}
        <div>
          <div className="text-center mb-10">
            <MaskWipe delay={0.6} inView={inView}><Label>Achievements & Certifications</Label></MaskWipe>
            <MaskWipe delay={0.65} inView={inView}>
              <h3 className="font-display tracking-wide text-2xl" style={{ color: '#f8fafc' }}>Timeline</h3>
            </MaskWipe>
          </div>

          <div className="space-y-6">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.div
                    whileHover={{ x: 10, transition: { duration: 0.18 } }}
                    className="flex items-start gap-6 group"
                    style={{ cursor: 'none' }}
                  >
                    <div className="flex-shrink-0 w-20 font-mono text-[0.6rem] tracking-[0.28em] uppercase pt-1"
                      style={{ color: 'rgba(56, 189, 248,0.4)' }}>{a.year}</div>
                    <div className="flex-1 relative pl-6 pb-6"
                      style={{ borderLeft: '1px solid rgba(56, 189, 248,0.1)' }}>
                      <div className="absolute left-0 top-1.5 w-3 h-3 -translate-x-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                        style={{ background: '#38bdf8', boxShadow: '0 0 8px rgba(56, 189, 248,0.55)' }} />
                      <h4 className="font-body font-semibold text-lg mb-1 transition-colors duration-300 group-hover:text-[#38bdf8]"
                        style={{ color: '#f8fafc' }}>{a.role}</h4>
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase"
                        style={{ color: 'rgba(148, 163, 184,0.45)' }}>{a.org}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246,0.3), rgba(56, 189, 248,0.3), transparent)' }} />
    </section>
  );
}
