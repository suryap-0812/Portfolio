import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Server, Database, Wrench, BookOpen, Trophy } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import Timeline3D from './Timeline3D';

const SKILLS = [
  { icon: Code, title: 'Languages', desc: 'C++, C, Java, JavaScript, HTML, CSS, Python', coord: 'SYS.SRC: LAN' },
  { icon: Server, title: 'Technologies', desc: 'Spring Boot, NodeJS, Express, ReactJS, TailwindCSS, Django', coord: 'SYS.SRC: TEC' },
  { icon: Database, title: 'Databases', desc: 'SQL, MongoDB', coord: 'SYS.SRC: DBS' },
  { icon: Wrench, title: 'Tools', desc: 'Git, GitHub, Postman, Docker', coord: 'SYS.SRC: TLS' },
  { icon: BookOpen, title: 'Core Concepts', desc: 'Data Structures & Algorithms, OOP, DBMS', coord: 'SYS.SRC: DYN' },
  { icon: Trophy, title: 'Profiles', desc: 'Leetcode: 1551 Max Rating, 133 solved · Skillrack: 1009 solved', coord: 'SYS.SRC: PRF' },
];

function Label({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 bg-sky-400" />
      <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-sky-400/80">
        {children}
      </p>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 theme-bg border-t theme-border overflow-hidden">
      {/* Blueprint background grid */}
      <ParticleCanvas section="about" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block with HUD diagnostic stats */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-12">
          <div className="text-left max-w-2xl">
            <Label>SYSTEM DIAGNOSTICS // BIOGRAPHY</Label>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
              BIO_STRUCT
            </h2>
            <p className="font-body text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
              I am a software engineer studying Computer Science at Sri Eshwar College of Engineering (2024-2028). 
              Recently, I worked as a Full Stack Intern at Aptitude Guru Hem, where I developed an integrated 
              role-based College ERP platform supporting online UPI payments and automated attendance flows.
            </p>
          </div>

          <div className="flex flex-col text-left font-mono text-xs text-slate-500 tracking-wider space-y-2 border-l border-white/10 pl-6 min-w-[240px]">
            <div>[ USER_ID: SURYA_P ]</div>
            <div>[ STATUS: ONLINE_ACTIVE ]</div>
            <div>[ ACADEMICS: Sri Eshwar CoE (24-28) ]</div>
            <div>[ ROLE: Full Stack Intern ]</div>
          </div>
        </div>

        {/* Stats Grid - 3-Column Tactical Hologram Panels */}
        <div className="editorial-grid grid-cols-1 md:grid-cols-3 mb-24">
          {[
            { label: 'SELECTED SYSTEMS BUILT', value: '10+', ref: 'REF: SYS.0' },
            { label: 'COMPLETED CREDENTIALS', value: '04', ref: 'REF: CRE.0' },
            { label: 'CODING CHALLENGES', value: '1142+', ref: 'REF: DSA.0' },
          ].map((s, i) => (
            <div key={i} className="grid-cell hud-brackets hud-scanline flex flex-col justify-between text-left py-8 min-h-36 hover:bg-sky-950/5 transition-colors">
              <div className="flex justify-between items-center font-mono text-xs text-slate-500">
                <span>{s.ref}</span>
                <span className="text-sky-400/50">[ STATUS: OK ]</span>
              </div>
              <div className="font-display text-5xl md:text-6xl font-black text-white tracking-tight my-4">{s.value}</div>
              <div className="font-mono text-xs tracking-[0.15em] uppercase text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skills Grid - 3-Column Tactical Hologram Grid */}
        <div className="mb-24">
          <div className="text-left mb-8">
            <Label>SYSTEM MODULES // SKILLS & TECH STACK</Label>
          </div>

          <div className="editorial-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((sk, i) => (
              <div
                key={sk.title}
                data-hover-label={sk.title.toUpperCase()}
                className="grid-cell hud-brackets hud-scanline flex flex-col justify-between group cursor-none hover:bg-sky-950/5 min-h-[240px]"
              >
                {/* Top status headers */}
                <div className="flex justify-between items-center font-mono text-xs text-slate-500 mb-6">
                  <span>{sk.coord}</span>
                  <span className="text-sky-400/55 group-hover:text-sky-400 transition-colors">
                    [ ACTIVE.MOD ]
                  </span>
                </div>

                {/* Skill Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <sk.icon className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-sky-400 transition-colors">
                      {sk.title}
                    </h3>
                  </div>
                  <p className="font-body text-slate-350 text-sm leading-relaxed">
                    {sk.desc}
                  </p>
                </div>
                
                {/* Bottom coordinates */}
                <div className="flex justify-between items-center font-mono text-xs text-slate-600 mt-8">
                  <span>// SECTION_0{i + 1}</span>
                  <span>[ CH_{i * 12 + 104} ]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline block */}
        <div className="border-t border-white/5 pt-16">
          <Timeline3D />
        </div>

      </div>
    </section>
  );
}
