import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X, CheckCircle2, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ParticleCanvas from './ParticleCanvas';

const PROJECTS = [
  {
    title: 'TribeTask',
    sub: 'February 2026',
    desc: 'A real-time collaborative task management platform enabling users to form "Tribes" and manage shared tasks. Features instantaneous sync, secure session management, and PostgreSQL database logic.',
    longDesc: 'TribeTask was engineered to resolve asynchronous synchronization issues in distributed team workflows. By implementing persistent socket connections, team members can collaborate in real-time, instantly tracking who is working on what without manual refreshes. The system relies on a secure JSON Web Token authentication system integrated with a PostgreSQL backend to manage complex user relationships and group workspaces.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['ReactJS', 'NodeJS', 'WebSockets', 'PostgreSQL', 'JWT/Session'],
    accent: '#38bdf8',
    liveUrl: '#',
    codeUrl: '#',
    architecture: ['React UI Clients', 'WS Gateway (Express)', 'PostgreSQL DB'],
    codeSnippet: `// wsServer.ts - Real-time Collaborative Sync
import { WebSocketServer } from 'ws';
import { verifyToken } from './auth';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  const tribeId = getTribeIdFromURL(req.url);
  joinTribeRoom(tribeId, ws);
  
  ws.on('message', (data) => {
    const taskEvent = JSON.parse(data.toString());
    // Broadcast updates to all other tribe members
    broadcastToTribe(tribeId, taskEvent, ws);
  });
});`
  },
  {
    title: 'CivicBridge AI',
    sub: 'April 2026',
    desc: 'A mobile application that enables automated government form parsing, regional language translation, and interactive voice assistant guidance for multi-lingual explanations.',
    longDesc: 'CivicBridge AI bridges the accessibility gap in regional public administration. The app allows users to photograph complex government documents, parse their fields using Google Gemini AI, translate definitions into regional Indian dialects, and read instructions out loud using text-to-speech. A lightweight FastAPI wrapper ensures high throughput and minimal latency when interacting with LLM pipelines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Expo', 'FastAPI', 'NodeJS', 'Tailwind CSS', 'MongoDB'],
    accent: '#3b82f6',
    liveUrl: '#',
    codeUrl: '#',
    architecture: ['React Native App', 'FastAPI Router', 'Gemini Multimodal API', 'MongoDB Atlas'],
    codeSnippet: `# parser_service.py - OCR & Gemini Analysis
from google import genai
from PIL import Image

async def parse_civic_form(image_path: str, lang: str):
    client = genai.Client()
    img = Image.open(image_path)
    
    prompt = f"""
    Extract all fields from this form as structured JSON.
    For each field, generate a friendly voice explanation in: {lang}.
    """
    
    response = await client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[img, prompt]
    )
    return response.text`
  },
  {
    title: 'Price Comparison Snapshot',
    sub: 'December 2025',
    desc: 'A full-stack web application to track and compare product prices across multiple e-commerce vendors. Implemented structured web scrapers and persistent data storage.',
    longDesc: 'This platform automates consumer price monitoring. Built on Spring Boot, it periodically executes concurrent web-scraping threads to fetch pricing details from target retailers. The comparative matching logic reconciles product naming variations using basic string matching heuristics and stores historical trends in MySQL for simple analytical plotting.',
    image: '/project_thumbnail_concept.png',
    tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
    accent: '#7dd3fc',
    liveUrl: '#',
    codeUrl: '#',
    architecture: ['Thymeleaf Views', 'Spring Boot Core', 'Hibernate ORM', 'MySQL Database'],
    codeSnippet: `// PriceTrackerController.java - Scraper & Comparator
@RestController
@RequestMapping("/api/prices")
public class PriceTrackerController {
    
    @Autowired
    private ScrapingService scrapingService;
    
    @GetMapping("/compare")
    public ResponseEntity<List<PriceMatch>> getComparison(@RequestParam String query) {
        List<ProductSource> sources = scrapingService.fetchFromAllVendors(query);
        return ResponseEntity.ok(
            PriceComparator.rankLowestToHighest(sources)
        );
    }
}`
  },
];

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

function ProjectCard({ 
  project, 
  index, 
  inView, 
  onOpenDetails 
}: { 
  project: typeof PROJECTS[0]; 
  index: number; 
  inView: boolean; 
  onOpenDetails: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width;
    const my = (e.clientY - r.top) / r.height;
    setTilt({ x: (my - 0.5) * -8, y: (mx - 0.5) * 8 });
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
      onClick={onOpenDetails}
      data-hover-label="VIEW"
      className="card-3d relative group rounded-2xl overflow-hidden cursor-none"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 35px ${project.accent}18`
          : '0 8px 32px rgba(0,0,0,0.4)',
        border: '1px solid transparent',
        transition: 'box-shadow 0.4s',
        background: '#0f172a',
      }}
    >
      <BorderTrace active={hovered} color={project.accent} />

      {/* Glassmorphic Sheen Lighting */}
      <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl" style={{
        background: hovered
          ? `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.065) 0%, transparent 60%)`
          : 'none',
      }} />

      {/* Swipe Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
        <div className="absolute w-[2px] h-[200%] -rotate-[12deg] transition-[left] duration-700"
          style={{
            left: hovered ? '115%' : '-20%', top: '-50%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)',
            filter: 'blur(1px)'
          }} />
      </div>

      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <div className="w-full h-full"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 500ms ease-out',
          }}>
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${project.accent}08, rgba(15, 23, 42, 0.95))` }} />

        <GrainOverlay opacity={hovered ? 0.08 : 0} />
      </div>

      {/* Card Info */}
      <div className="relative p-7 z-10">
        <div className="absolute right-5 top-4 font-display text-5xl select-none pointer-events-none"
          style={{ color: project.accent, opacity: hovered ? 0.12 : 0.04, transition: 'opacity 0.3s' }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <p className="font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
          style={{ color: project.accent + 'cc' }}>// {project.sub}</p>

        <h3 className="font-display tracking-wide text-2xl mb-3 text-[#f8fafc]"
          style={{
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.35s ease',
          }}>
          {project.title}
        </h3>

        <p className="font-body text-sm mb-5 leading-7 text-[#94a3b8]">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full font-mono text-[0.55rem] tracking-[0.12em] uppercase"
              style={{ border: `1px solid rgba(56,189,248,0.1)`, color: 'rgba(148, 163, 184, 0.75)', background: 'rgba(15,23,42,0.4)' }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 rounded-full font-mono text-[0.55rem] tracking-[0.12em] uppercase text-sky-400">
              +{project.tags.length - 3} MORE
            </span>
          )}
        </div>
      </div>

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
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  // Scroll parallax for bg
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <section id="work" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#020617' }}>

      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <ParticleCanvas section="work" />
      </motion.div>

      {/* Big Title Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-display tracking-[0.1em]"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', color: 'rgba(56, 189, 248, 0.015)', lineHeight: 1 }}>
          WORK
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[0.6rem] tracking-[0.42em] uppercase"
              style={{ color: 'rgba(56, 189, 248, 0.55)' }}>
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
              A curated list of software systems designed and delivered with operational intent.
            </motion.p>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard 
              key={p.title} 
              project={p} 
              index={i} 
              inView={inView} 
              onOpenDetails={() => setActiveProject(p)}
            />
          ))}
        </div>

        {/* ─── Extra Work Details ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Achievements */}
          <div className="p-8 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(15, 23, 42, 0.55)', border: '1px solid rgba(56, 189, 248, 0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h4 className="font-display tracking-widest uppercase text-sm mb-6 flex items-center gap-3" style={{ color: '#38bdf8' }}>
              <span className="w-8 h-px bg-[#38bdf8]/50" /> Achievements
            </h4>
            <ul className="space-y-6">
              <li className="font-body text-sm relative pl-4 border-l border-[#38bdf8]/20">
                <div className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#38bdf8]/50" />
                <span className="text-[#e2e8f0] font-medium leading-relaxed block">Shortlisted for Eureka! 2025 Zonal Rounds</span>
                <p className="font-mono text-[0.6rem] text-[#94a3b8] mt-2 tracking-widest uppercase">E-Cell, IIT Bombay • 2025</p>
              </li>
              <li className="font-body text-sm relative pl-4 border-l border-[#38bdf8]/20">
                <div className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#38bdf8]/50" />
                <span className="text-[#e2e8f0] font-medium leading-relaxed block">Shortlisted for Smart India Hackathon (SIH)</span>
                <p className="font-mono text-[0.6rem] text-[#94a3b8] mt-2 tracking-widest uppercase">Internal Round Selection • 2025</p>
              </li>
            </ul>
          </div>

          {/* Coding Profiles */}
          <div className="p-8 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(15, 23, 42, 0.55)', border: '1px solid rgba(56, 189, 248, 0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h4 className="font-display tracking-widest uppercase text-sm mb-6 flex items-center gap-3" style={{ color: '#3b82f6' }}>
              <span className="w-8 h-px bg-[#3b82f6]/50" /> Coding Profiles
            </h4>
            <ul className="space-y-5">
              <li className="font-body text-sm flex flex-col p-4 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#e2e8f0] font-semibold text-base">Leetcode</span>
                  <a href="#" className="text-[#3b82f6] hover:text-[#7dd3fc] transition-colors"><ExternalLink size={16} /></a>
                </div>
                <div className="flex flex-col gap-1 text-[#94a3b8] text-xs">
                  <span>Max Rating: <strong className="text-white font-normal">1551</strong></span>
                  <span>Problems Solved: <strong className="text-white font-normal">133</strong></span>
                </div>
              </li>
              <li className="font-body text-sm flex flex-col p-4 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#e2e8f0] font-semibold text-base">Skillrack</span>
                  <a href="#" className="text-[#3b82f6] hover:text-[#7dd3fc] transition-colors"><ExternalLink size={16} /></a>
                </div>
                <div className="flex flex-col gap-1 text-[#94a3b8] text-xs">
                  <span>Problems Solved: <strong className="text-white font-normal">1009</strong></span>
                </div>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="p-8 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(15, 23, 42, 0.55)', border: '1px solid rgba(56, 189, 248, 0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h4 className="font-display tracking-widest uppercase text-sm mb-6 flex items-center gap-3" style={{ color: '#7dd3fc' }}>
              <span className="w-8 h-px bg-[#7dd3fc]/50" /> Certifications
            </h4>
            <ul className="space-y-4">
              <li className="font-body text-sm group/item">
                <span className="text-[#e2e8f0] transition-colors group-hover/item:text-[#7dd3fc]">Mastering Data Structures & Algorithms using C and C++</span>
                <p className="font-mono text-[0.55rem] text-[#94a3b8] mt-1 tracking-[0.2em] uppercase">// Udemy</p>
              </li>
              <div className="w-full h-px bg-white/5" />
              <li className="font-body text-sm group/item">
                <span className="text-[#e2e8f0] transition-colors group-hover/item:text-[#7dd3fc]">ReactJS Masterclass</span>
                <p className="font-mono text-[0.55rem] text-[#94a3b8] mt-1 tracking-[0.2em] uppercase">// Udemy</p>
              </li>
              <div className="w-full h-px bg-white/5" />
              <li className="font-body text-sm group/item">
                <span className="text-[#e2e8f0] transition-colors group-hover/item:text-[#7dd3fc]">Completion Of C++ Training</span>
                <p className="font-mono text-[0.55rem] text-[#94a3b8] mt-1 tracking-[0.2em] uppercase">// IIT Bombay</p>
              </li>
              <div className="w-full h-px bg-white/5" />
              <li className="font-body text-sm group/item">
                <span className="text-[#e2e8f0] transition-colors group-hover/item:text-[#7dd3fc]">Getting Started with Deep Learning</span>
                <p className="font-mono text-[0.55rem] text-[#94a3b8] mt-1 tracking-[0.2em] uppercase">// NVIDIA</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* ─── Immersive Details Modal Overlay ─── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 cursor-none"
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)' }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-5xl h-[88vh] md:h-[80vh] flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
              style={{ background: '#0a0f1d' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                data-hover-label="CLOSE"
                className="absolute right-5 top-5 z-[110] p-2.5 rounded-full border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all bg-slate-900/60"
              >
                <X size={20} />
              </button>

              {/* Left Side: Information */}
              <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs uppercase" style={{ color: activeProject.accent }}>
                      // Project File
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProject.accent }} />
                    <span className="font-mono text-xs text-slate-500 uppercase">{activeProject.sub}</span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white mb-6 uppercase tracking-wide">
                    {activeProject.title}
                  </h3>

                  <div className="font-body text-slate-300 text-sm leading-relaxed space-y-4 mb-8">
                    <p>{activeProject.desc}</p>
                    <p className="text-slate-400">{activeProject.longDesc}</p>
                  </div>

                  {/* Architecture Breakdown */}
                  <div className="mb-8">
                    <h4 className="font-display text-xs tracking-wider uppercase text-slate-400 mb-3 flex items-center gap-2">
                      <Layers size={14} style={{ color: activeProject.accent }} /> Architecture Pipeline
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      {activeProject.architecture.map((node, nIdx) => (
                        <div key={node} className="flex items-center">
                          <span className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 font-mono text-[0.62rem] text-slate-300">
                            {node}
                          </span>
                          {nIdx < activeProject.architecture.length - 1 && (
                            <span className="mx-2 text-slate-600 font-mono text-xs">➔</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons & Stack */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md font-mono text-[0.55rem] tracking-[0.1em] uppercase text-sky-400 bg-sky-950/20 border border-sky-900/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={activeProject.liveUrl}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover-label="LIVE"
                      className="flex-1 py-3 px-5 rounded-xl font-body font-semibold text-xs text-[#020617] flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #38bdf8, #3b82f6)' }}
                    >
                      <ExternalLink size={14} /> Launch Live Demo
                    </motion.a>
                    <motion.a
                      href={activeProject.codeUrl}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover-label="CODE"
                      className="py-3 px-5 rounded-xl font-body font-medium text-xs text-white border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 bg-slate-900"
                    >
                      <Github size={14} /> Source Repository
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Right Side: Mock Code Window */}
              <div className="w-full lg:w-1/2 bg-[#050913] p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
                {/* Visual grid behind code */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(56, 189, 248, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.5) 1px, transparent 1px)',
                    backgroundSize: '2rem 2rem'
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* File Tab Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Terminal size={15} style={{ color: activeProject.accent }} />
                      <span className="font-mono text-xs text-slate-400">source_code_snippet</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                  </div>

                  {/* Preformatted Code Content */}
                  <div className="flex-1 overflow-auto rounded-xl p-5 border border-white/5 bg-[#03060c] font-mono text-[0.72rem] md:text-xs leading-relaxed text-[#94a3b8] custom-scrollbar">
                    <pre className="whitespace-pre-wrap select-all">
                      <code style={{ color: '#bae6fd' }}>
                        {activeProject.codeSnippet}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248,0.3), rgba(59, 130, 246,0.3), transparent)' }} />
    </section>
  );
}
