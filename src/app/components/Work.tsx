import { motion, useInView, useScroll, useTransform } from 'motion/react';
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
    accent: '#38bdf8',
  },
  {
    title: 'Athlixir',
    sub: 'Sports Platform',
    desc: 'A responsive web application for athlete performance tracking, training management, and streamlined sports event participation.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['ReactJS', 'NodeJS', 'MongoDB', 'TailwindCSS'],
    accent: '#3b82f6',
  },
  {
    title: 'Price Snapshot',
    sub: 'Price Tracker',
    desc: 'A full-stack web app to track and compare product prices across multiple vendors with lowest-price reports and alerts.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWRnZXJ8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
    accent: '#7dd3fc',
  },
];

/* Grain SVG filter for noise overlay */
const GRAIN_ID = 'card-grain';

function GrainOverlay({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl z-30"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        mixBlendMode: 'overlay',
        transition: 'opacity 0.4s ease',
      }}
    />
  );
}

/* ─── SVG border trace ─── */
function BorderTrace({ active, color }: { active: boolean; color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-40"
      style={{ overflow: 'visible' }}
    >
      <rect
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx="16" ry="16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeDashoffset={active ? 0 : 1000}
        style={{ transition: active ? 'stroke-dashoffset 0.6s ease' : 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  );
}

/* ─── Project card with all hover VFX ─── */
function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width;
    const my = (e.clientY - r.top) / r.height;
    setTilt({ x: (my - 0.5) * -10, y: (mx - 0.5) * 10 });
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
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 35px ${project.accent}22`
          : '0 8px 32px rgba(0,0,0,0.4)',
        border: '1px solid transparent',
        transition: 'box-shadow 0.4s',
        background: '#1e293b',
        cursor: 'none',
      }}
    >
      {/* SVG border trace on hover */}
      <BorderTrace active={hovered} color={project.accent} />

      {/* Glassmorphism torch sheen */}
      <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl" style={{
        background: hovered
          ? `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.055) 0%, transparent 58%)`
          : 'none',
      }} />

      {/* Diagonal gloss sweep */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
        <div className="absolute w-[2px] h-[200%] -rotate-[12deg] transition-[left] duration-700"
          style={{
            left: hovered ? '115%' : '-20%', top: '-50%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)',
            filter: 'blur(1px)'
          }} />
      </div>

      {/* ─── Thumbnail ─── */}
      <div className="relative h-52 overflow-hidden">
        {/* Image scales to 1.06× on hover */}
        <div className="w-full h-full"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 500ms ease-out',
          }}>
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${project.accent}10, rgba(30, 41, 59,0.9))` }} />

        {/* Grain texture overlay fades in at 8% on hover */}
        <GrainOverlay opacity={hovered ? 0.08 : 0} />

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 z-20"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', background: `${project.accent}10` }}>
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

      {/* ─── Card info ─── */}
      <div className="relative p-7 z-10">
        <div className="absolute right-5 top-4 font-display text-5xl select-none pointer-events-none"
          style={{ color: project.accent, opacity: hovered ? 0.09 : 0.03, transition: 'opacity 0.3s' }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
          style={{ color: project.accent + 'aa' }}>// {project.sub}</p>

        {/* Title slides up 8px + letter-spacing increases on hover */}
        <h3 className="font-display tracking-wide text-2xl mb-3"
          style={{
            color: hovered ? project.accent : '#f8fafc',
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
            letterSpacing: hovered ? '0.03em' : '0',
            transition: 'color 0.3s, transform 0.35s ease, letter-spacing 0.35s ease',
          }}>
          {project.title}
        </h3>

        <p className="font-body text-sm mb-5 leading-7" style={{ color: '#94a3b8' }}>{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full font-mono text-[0.55rem] tracking-[0.12em] uppercase"
              style={{ border: `1px solid ${project.accent}22`, color: 'rgba(148, 163, 184,0.7)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom warm neon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.15,
          transition: 'opacity 0.3s',
        }} />
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Scroll parallax for bg
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <section id="work" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#020617' }}>

      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <ParticleCanvas section="work" />
      </motion.div>

      {/* Ghost WORK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-display"
          style={{ fontSize: 'clamp(10rem, 22vw, 20rem)', color: 'rgba(56, 189, 248,0.022)', lineHeight: 1 }}>
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header — line wipes */}
        <div className="text-center mb-20">
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[0.6rem] tracking-[0.42em] uppercase"
              style={{ color: 'rgba(56, 189, 248,0.55)' }}>
              // Featured Projects
            </motion.p>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="font-display tracking-wide leading-[1.1]"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                background: 'linear-gradient(135deg, #f8fafc, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
              Selected Work
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
              className="font-body text-base max-w-2xl mx-auto"
              style={{ color: '#94a3b8', lineHeight: 2 }}>
              A collection of projects built with care — real-world solutions, shipped with intention.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248,0.3), rgba(59, 130, 246,0.3), transparent)' }} />
    </section>
  );
}
