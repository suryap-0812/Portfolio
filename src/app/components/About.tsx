import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Server, Database, Wrench, BookOpen, Trophy } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import Timeline3D from './Timeline3D';

const SKILLS = [
  { icon: Code, title: 'Languages', desc: 'C++, C, Java, JavaScript, HTML, CSS, Python' },
  { icon: Server, title: 'Technologies', desc: 'Spring Boot, NodeJS, Express, ReactJS, TailwindCSS, Django' },
  { icon: Database, title: 'Databases', desc: 'SQL, MongoDB' },
  { icon: Wrench, title: 'Tools', desc: 'Git, GitHub, Postman, Vercel, Docker' },
  { icon: BookOpen, title: 'Core Concepts', desc: 'Data Structures & Algorithms, OOP, DBMS' },
  { icon: Trophy, title: 'Profiles', desc: 'Leetcode: 1551 Max Rating, 133+ solved · Skillrack: 1009 problems' },
];

function Label({ children }: { children: string }) {
  return (
    <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase mb-4 text-slate-500">
      // {children}
    </p>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 bg-[#020617] border-t border-white/5">
      <ParticleCanvas section="about" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <Label>About Me</Label>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Biography
            </h2>
          </div>
          <p className="font-body text-slate-400 text-xs md:text-sm max-w-md text-left leading-relaxed">
            I am a software engineer focused on building robust backends, responsive client UIs, and optimal data structure pipelines.
          </p>
        </div>

        {/* Stats Grid - Editorial Layout */}
        <div className="editorial-grid grid-cols-1 md:grid-cols-3 mb-20">
          {[
            { label: 'Selected Projects', value: '10+' },
            { label: 'Completed Credentials', value: '4' },
            { label: 'Code Challenges Solved', value: '1142+' },
          ].map((s, i) => (
            <div key={i} className="grid-cell flex flex-col justify-center text-left py-8">
              <span className="font-display text-4xl font-black text-white mb-2">{s.value}</span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills Grid - Editorial Layout */}
        <div className="mb-24">
          <div className="text-left mb-8">
            <Label>Skills & Tech Stack</Label>
          </div>

          <div className="editorial-grid grid-cols-1 md:grid-cols-3">
            {SKILLS.map((sk, i) => (
              <div
                key={sk.title}
                data-hover-label={sk.title.toUpperCase()}
                className="grid-cell flex flex-col justify-between group cursor-none hover:bg-white/[0.015] border-t border-white/5 md:border-t-0"
              >
                <div>
                  <sk.icon className="w-5 h-5 text-slate-500 mb-6 group-hover:text-sky-400 transition-colors" />
                  <h3 className="font-display text-lg font-bold text-white mb-2 tracking-wide group-hover:text-sky-400 transition-colors">
                    {sk.title}
                  </h3>
                  <p className="font-body text-slate-400 text-xs leading-relaxed">
                    {sk.desc}
                  </p>
                </div>
                
                <span className="font-mono text-[0.6rem] text-slate-600 block mt-8 select-none">
                  // SECTION_0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline (Vertical block) */}
        <div className="border-t border-white/5 pt-16">
          <Timeline3D />
        </div>

      </div>
    </section>
  );
}
