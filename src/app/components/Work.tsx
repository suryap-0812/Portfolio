import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X, Layers, Terminal } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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

function ProjectCell({ 
  project, 
  index, 
  onOpenDetails 
}: { 
  project: typeof PROJECTS[0]; 
  index: number; 
  onOpenDetails: () => void;
}) {
  return (
    <div
      onClick={onOpenDetails}
      data-hover-label="VIEW"
      className="grid-cell flex flex-col justify-between group cursor-none hover:bg-white/[0.02] border-t border-white/5 md:border-t-0"
    >
      <div>
        {/* Index & Year */}
        <div className="flex justify-between items-center mb-6 font-mono text-[0.6rem] text-slate-500 uppercase tracking-widest">
          <span>// {project.sub}</span>
          <span>[ {String(index + 1).padStart(2, '0')} ]</span>
        </div>

        {/* Flat Thumbnail Frame */}
        <div className="relative h-44 w-full mb-6 overflow-hidden border border-white/5 bg-slate-950">
          <ImageWithFallback 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-95 transition-all duration-500" 
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl text-white font-bold mb-3 tracking-wide group-hover:text-sky-400 transition-colors">
          {project.title}
        </h3>

        {/* Desc */}
        <p className="font-body text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
          {project.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="font-mono text-[0.55rem] uppercase text-slate-500 tracking-wider">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="work" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 bg-[#020617] border-t border-white/5">
      <ParticleCanvas section="work" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Structured Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-slate-500 block mb-2">
              // INDEX OF PROJECTS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Selected Work
            </h2>
          </div>
          <p className="font-body text-slate-400 text-xs md:text-sm max-w-md text-left leading-relaxed">
            A structured index of software systems designed and delivered with strict engineering and architecture goals.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="editorial-grid grid-cols-1 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCell 
              key={p.title} 
              project={p} 
              index={i} 
              onOpenDetails={() => setActiveProject(p)}
            />
          ))}
        </div>

        {/* ─── Extra Details / Achievements ─── */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 border-t border-white/5">
          {/* Column 1: Achievements */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5 text-left">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-[#38bdf8] uppercase block mb-6">
              // Achievements
            </span>
            <ul className="space-y-6">
              <li>
                <h4 className="font-display text-sm font-bold text-white mb-1">
                  Eureka! 2025 Zonal Rounds
                </h4>
                <p className="font-body text-[0.7rem] text-slate-400">
                  Shortlisted for regional selection phases, hosted by E-Cell, IIT Bombay.
                </p>
              </li>
              <li>
                <h4 className="font-display text-sm font-bold text-white mb-1">
                  Smart India Hackathon (SIH)
                </h4>
                <p className="font-body text-[0.7rem] text-slate-400">
                  Selected in internal campus rounds for final submissions.
                </p>
              </li>
            </ul>
          </div>

          {/* Column 2: Profiles */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5 text-left">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-[#3b82f6] uppercase block mb-6">
              // Coding Profiles
            </span>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="p-4 border border-white/5 hover:border-white/20 bg-slate-950/40 rounded transition-colors text-left cursor-none" data-hover-label="LEETCODE">
                <span className="font-display text-xs font-bold text-white block mb-1">Leetcode</span>
                <span className="font-mono text-[0.55rem] text-slate-500">1551 Rating / 133 Solved</span>
              </a>
              <a href="#" className="p-4 border border-white/5 hover:border-white/20 bg-slate-950/40 rounded transition-colors text-left cursor-none" data-hover-label="SKILLRACK">
                <span className="font-display text-xs font-bold text-white block mb-1">Skillrack</span>
                <span className="font-mono text-[0.55rem] text-slate-500">1009 Problems Solved</span>
              </a>
            </div>
          </div>

          {/* Column 3: Certifications */}
          <div className="p-8 text-left">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-sky-400 uppercase block mb-6">
              // Selected Credentials
            </span>
            <ul className="space-y-3 font-body text-xs text-slate-400">
              <li className="flex justify-between">
                <span>Data Structures & Algorithms</span>
                <span className="font-mono text-[0.55rem] text-slate-600">Udemy</span>
              </li>
              <li className="flex justify-between">
                <span>ReactJS Masterclass</span>
                <span className="font-mono text-[0.55rem] text-slate-600">Udemy</span>
              </li>
              <li className="flex justify-between">
                <span>C++ Training Completion</span>
                <span className="font-mono text-[0.55rem] text-slate-600">IIT Bombay</span>
              </li>
              <li className="flex justify-between">
                <span>Deep Learning Basics</span>
                <span className="font-mono text-[0.55rem] text-slate-600">NVIDIA</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* ─── Immersive Details Modal Overlay ─── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 cursor-none"
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)' }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl h-[88vh] md:h-[80vh] flex flex-col lg:flex-row border border-white/5 shadow-2xl"
              style={{ background: '#020617' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                data-hover-label="CLOSE"
                className="absolute right-5 top-5 z-[110] p-2.5 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-all bg-[#020617] cursor-none"
              >
                <X size={18} />
              </button>

              {/* Left Side: Information */}
              <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs uppercase" style={{ color: activeProject.accent }}>
                      // Project Details
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProject.accent }} />
                    <span className="font-mono text-xs text-slate-500 uppercase">{activeProject.sub}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-6 tracking-wide">
                    {activeProject.title}
                  </h3>

                  <div className="font-body text-slate-300 text-xs md:text-sm leading-relaxed space-y-4 mb-8">
                    <p>{activeProject.desc}</p>
                    <p className="text-slate-400">{activeProject.longDesc}</p>
                  </div>

                  {/* Architecture Breakdown */}
                  <div className="mb-8">
                    <h4 className="font-display text-xs tracking-wider uppercase text-slate-400 mb-3 flex items-center gap-2">
                      <Layers size={12} style={{ color: activeProject.accent }} /> System Pipeline
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      {activeProject.architecture.map((node, nIdx) => (
                        <div key={node} className="flex items-center">
                          <span className="px-3 py-1.5 border border-white/5 bg-slate-950/80 font-mono text-[0.6rem] text-slate-300">
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
                      <span key={tag} className="px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.1em] uppercase text-sky-400 bg-sky-950/20 border border-sky-900/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={activeProject.liveUrl}
                      data-hover-label="LIVE"
                      className="flex-1 py-3 px-5 text-center font-mono text-[0.62rem] tracking-widest uppercase text-[#020617] bg-white hover:bg-slate-200 transition-colors cursor-none"
                    >
                      Launch Demo
                    </a>
                    <a
                      href={activeProject.codeUrl}
                      data-hover-label="CODE"
                      className="py-3 px-5 font-mono text-[0.62rem] tracking-widest uppercase text-white border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 bg-slate-900/50 cursor-none"
                    >
                      <Github size={12} /> Source Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Code Window */}
              <div className="w-full lg:w-1/2 bg-slate-950 p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10 flex flex-col h-full">
                  {/* File Tab Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} style={{ color: activeProject.accent }} />
                      <span className="font-mono text-xs text-slate-400">source_code_snippet</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-800" />
                      <span className="w-2 h-2 rounded-full bg-slate-800" />
                      <span className="w-2 h-2 rounded-full bg-slate-800" />
                    </div>
                  </div>

                  {/* Preformatted Code Content */}
                  <div className="flex-1 overflow-auto p-5 border border-white/5 bg-[#020617] font-mono text-[0.68rem] md:text-xs leading-relaxed text-[#94a3b8] custom-scrollbar">
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
    </section>
  );
}
