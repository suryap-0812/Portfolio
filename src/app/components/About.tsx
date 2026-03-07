import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Server, Database, Wrench, BookOpen, Trophy } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const SKILLS = [
  { icon: Code, title: 'Languages', desc: 'C++, C, Java, JavaScript, HTML, CSS, Python', color: '#f59e0b' },
  { icon: Server, title: 'Technologies', desc: 'Spring Boot, NodeJS, Express, ReactJS, TailwindCSS, Django', color: '#e07c5c' },
  { icon: Database, title: 'Databases', desc: 'SQL, MongoDB, PostgreSQL', color: '#fcd34d' },
  { icon: Wrench, title: 'Tools', desc: 'Git, GitHub, Postman, Vercel, Docker', color: '#f59e0b' },
  { icon: BookOpen, title: 'Core Concepts', desc: 'Data Structures & Algorithms, OOP, DBMS', color: '#e07c5c' },
  { icon: Trophy, title: 'Profiles', desc: 'Leetcode: 1484 Max Rating, 125+ solved · Skillrack: 1009+ problems', color: '#fcd34d' },
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
    <p className="font-mono text-[0.6rem] tracking-[0.42em] uppercase mb-4" style={{ color: 'rgba(245,158,11,0.55)' }}>
      // {children}
    </p>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#161210' }}>

      <ParticleCanvas section="about" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(224,124,92,0.25), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ─── Header ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-20">
          <Label>About Me</Label>
          <h2 className="font-display tracking-wide leading-[1.1] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #fafaf9, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
            Crafted With Code
          </h2>
          <p className="font-body text-base max-w-2xl mx-auto" style={{ color: '#a8a29e', lineHeight: 2 }}>
            I'm a passionate developer with a strong foundation in full-stack web development, data
            structures, and algorithms — dedicated to building robust, scalable applications.
          </p>
        </motion.div>

        {/* ─── Stats ─── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="grid grid-cols-3 gap-px mb-20 rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(245,158,11,0.08)' }}>
          {[
            { label: 'Projects Built', value: '10+' },
            { label: 'Certifications', value: '6' },
            { label: 'Problems Solved', value: '1009+' },
          ].map((s, i) => (
            <div key={i} className="py-8 text-center glass">
              <div className="font-display text-3xl mb-1" style={{
                background: 'linear-gradient(135deg, #f59e0b, #e07c5c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.value}</div>
              <div className="font-mono text-[0.56rem] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(168,162,158,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ─── Skills ─── */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }} className="text-center mb-10">
            <Label>Skills & Stack</Label>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(245,158,11,0.04)' }}>
            {SKILLS.map((sk, i) => (
              <motion.div key={sk.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className="group relative p-8 glass overflow-hidden"
                style={{ cursor: 'none' }}
              >
                {/* Warm sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${sk.color}12, transparent 70%)` }} />

                {/* Top streak */}
                <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.5 }}
                  className="absolute top-0 left-0 right-0 h-px origin-left"
                  style={{ background: `linear-gradient(90deg, ${sk.color}, transparent)` }} />

                {/* Icon */}
                <div className="w-12 h-12 mb-5 rounded-lg flex items-center justify-center relative overflow-hidden tag-warm"
                  style={{ border: `1px solid ${sk.color}28` }}>
                  <sk.icon className="w-6 h-6 relative z-10" style={{ color: sk.color }} />
                </div>

                <h3 className="font-display tracking-wide text-lg mb-2" style={{ color: '#fafaf9' }}>{sk.title}</h3>
                <p className="font-body text-sm" style={{ color: '#a8a29e', lineHeight: 1.9 }}>{sk.desc}</p>

                {/* Ghost number */}
                <div className="absolute right-4 bottom-4 font-display text-6xl select-none pointer-events-none transition-opacity duration-300 opacity-[0.03] group-hover:opacity-[0.07]"
                  style={{ color: sk.color }}>{String(i + 1).padStart(2, '0')}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Achievements ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7 }}>
          <div className="text-center mb-10">
            <Label>Achievements & Certifications</Label>
            <h3 className="font-display tracking-wide text-2xl" style={{ color: '#fafaf9' }}>Timeline</h3>
          </div>

          <div className="space-y-6">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.85 + i * 0.11, duration: 0.5 }}
                whileHover={{ x: 10, transition: { duration: 0.18 } }}
                className="flex items-start gap-6 group"
                style={{ cursor: 'none' }}
              >
                <div className="flex-shrink-0 w-20 font-mono text-[0.6rem] tracking-[0.28em] uppercase pt-1"
                  style={{ color: 'rgba(245,158,11,0.4)' }}>{a.year}</div>

                <div className="flex-1 relative pl-6 pb-6"
                  style={{ borderLeft: '1px solid rgba(245,158,11,0.1)' }}>
                  <div className="absolute left-0 top-1.5 w-3 h-3 -translate-x-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.55)' }} />
                  <h4 className="font-body font-semibold text-lg mb-1 transition-colors duration-300 group-hover:text-[#f59e0b]"
                    style={{ color: '#fafaf9' }}>{a.role}</h4>
                  <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase"
                    style={{ color: 'rgba(168,162,158,0.45)' }}>{a.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(224,124,92,0.3), rgba(245,158,11,0.3), transparent)' }} />
    </section>
  );
}
