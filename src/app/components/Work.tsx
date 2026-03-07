import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ParticleCanvas from './ParticleCanvas';

const PROJECTS = [
  {
    title: 'Tribetask',
    sub: 'Ongoing',
    desc: 'A real-time collaborative task management platform enabling users to form "Tribes" and manage shared tasks efficiently across teams.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['ReactJS', 'NodeJS', 'WebSockets', 'PostgreSQL'],
    accent: '#f59e0b',
  },
  {
    title: 'Athlixir',
    sub: 'Sports Platform',
    desc: 'A responsive web application for athlete performance tracking, training management, and sports event participation.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['ReactJS', 'NodeJS', 'MongoDB', 'TailwindCSS'],
    accent: '#e07c5c',
  },
  {
    title: 'Price Snapshot',
    sub: 'Price Tracker',
    desc: 'A full-stack web app to track and compare product prices across multiple vendors with lowest-price reports and alerts.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWRnZXJ8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
    accent: '#fcd34d',
  },
];

function Card3D({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width;
    const my = (e.clientY - r.top) / r.height;
    setTilt({ x: (my - 0.5) * -12, y: (mx - 0.5) * 12 });
    setSheen({ x: mx * 100, y: my * 100 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.13, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      className="card-3d relative group rounded-2xl overflow-hidden"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 35px ${project.accent}20`
          : '0 8px 32px rgba(0,0,0,0.4)',
        border: `1px solid ${hovered ? project.accent + '35' : 'rgba(245,158,11,0.06)'}`,
        transition: 'box-shadow 0.4s, border 0.4s',
        background: '#1e1a16',
        cursor: 'none',
      }}
    >
      {/* Glassmorphism torch sheen */}
      <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl" style={{
        background: hovered
          ? `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.055) 0%, transparent 58%)`
          : 'none',
        transition: 'background 0.05s',
      }} />

      {/* Diagonal gloss sweep */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
        <div className="absolute w-[2px] h-[200%] -rotate-[12deg] transition-[left] duration-700"
          style={{
            left: hovered ? '115%' : '-20%', top: '-50%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)',
            filter: 'blur(1px)',
          }} />
      </div>

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div className="w-full h-full transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}>
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, ${project.accent}10, rgba(30,26,22,0.9))` }} />

        {/* Hover buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `${project.accent}10` }}>
          <motion.a href="#" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}
            className="p-3 rounded-lg text-white"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.18)' }}
            aria-label="View live"><ExternalLink size={22} /></motion.a>
          <motion.a href="#" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}
            className="p-3 rounded-lg text-white"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.18)' }}
            aria-label="View code"><Github size={22} /></motion.a>
        </div>
      </div>

      {/* Info */}
      <div className="relative p-7 z-10">
        <div className="absolute right-5 top-4 font-display text-5xl select-none pointer-events-none transition-opacity duration-300"
          style={{ color: project.accent, opacity: hovered ? 0.09 : 0.03 }}>{String(index + 1).padStart(2, '0')}</div>

        <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
          style={{ color: project.accent + 'aa' }}>// {project.sub}</p>

        <h3 className="font-display tracking-wide text-2xl mb-3 transition-colors duration-300"
          style={{ color: hovered ? project.accent : '#fafaf9' }}>{project.title}</h3>

        <p className="font-body text-sm mb-5 leading-7" style={{ color: '#a8a29e' }}>{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full font-mono text-[0.55rem] tracking-[0.12em] uppercase"
              style={{ border: `1px solid ${project.accent}22`, color: 'rgba(168,162,158,0.7)', background: 'transparent' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.15,
        }} />
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="work" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#0e0c0a' }}>

      <ParticleCanvas section="work" />

      {/* Ghost BG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 0 }}>
        <span className="font-display" style={{ fontSize: 'clamp(10rem, 22vw, 20rem)', color: 'rgba(245,158,11,0.022)', lineHeight: 1 }}>
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <p className="font-mono text-[0.6rem] tracking-[0.42em] uppercase mb-4"
            style={{ color: 'rgba(245,158,11,0.55)' }}>// Featured Projects</p>
          <h2 className="font-display tracking-wide leading-[1.1] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #fafaf9, #e07c5c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
            Selected Work
          </h2>
          <p className="font-body text-base max-w-2xl mx-auto" style={{ color: '#a8a29e', lineHeight: 2 }}>
            A collection of projects built with care — real-world solutions, shipped with intention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Card3D key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(224,124,92,0.3), transparent)' }} />
    </section>
  );
}
