import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, X, Layers, Terminal, Server } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ParticleCanvas from './ParticleCanvas';

const PROJECTS = [
  {
    title: 'TribeTask',
    sub: 'FEB_2026',
    coord: 'SYS.LOC: X-409 // CORE',
    desc: 'A real-time collaborative task management platform enabling users to form "Tribes" and manage shared tasks. Features instantaneous sync, secure session management, and PostgreSQL database logic.',
    longDesc: 'TribeTask was engineered to resolve asynchronous synchronization issues in distributed team workflows. By implementing persistent socket connections, team members can collaborate in real-time, instantly tracking who is working on what without manual refreshes. The system relies on a secure JSON Web Token authentication system integrated with a PostgreSQL backend to manage complex user relationships and group workspaces.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['ReactJS', 'NodeJS', 'WebSockets', 'PostgreSQL', 'JWT/Session'],
    accent: '#38bdf8',
    liveUrl: '#',
    codeUrl: '#',
    architecture: [
      { name: 'UI Client', desc: 'React / Framer Motion' },
      { name: 'Gateway', desc: 'Node.js WebSocket' },
      { name: 'Relational DB', desc: 'PostgreSQL Server' }
    ],
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
    sub: 'APR_2026',
    coord: 'SYS.LOC: Y-911 // EDGE',
    desc: 'A mobile application that enables automated government form parsing, regional language translation, and interactive voice assistant guidance for multi-lingual explanations.',
    longDesc: 'CivicBridge AI bridges the accessibility gap in regional public administration. The app allows users to photograph complex government documents, parse their fields using Google Gemini AI, translate definitions into regional Indian dialects, and read instructions out loud using text-to-speech. A lightweight FastAPI wrapper ensures high throughput and minimal latency when interacting with LLM pipelines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Expo', 'FastAPI', 'NodeJS', 'Tailwind CSS', 'MongoDB'],
    accent: '#3b82f6',
    liveUrl: '#',
    codeUrl: '#',
    architecture: [
      { name: 'Expo Mobile', desc: 'Camera & TTS Engine' },
      { name: 'FastAPI Wrapper', desc: 'Field Extraction' },
      { name: 'Gemini Model', desc: 'Multimodal AI Analysis' }
    ],
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
    title: 'Price Snapshot',
    sub: 'DEC_2025',
    coord: 'SYS.LOC: Z-502 // CRON',
    desc: 'A full-stack web application to track and compare product prices across multiple e-commerce vendors. Implemented structured web scrapers and persistent data storage.',
    longDesc: 'This platform automates consumer price monitoring. Built on Spring Boot, it periodically executes concurrent web-scraping threads to fetch pricing details from target retailers. The comparative matching logic reconciles product naming variations using basic string matching heuristics and stores historical trends in MySQL for simple analytical plotting.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
    accent: '#7dd3fc',
    liveUrl: '#',
    codeUrl: '#',
    architecture: [
      { name: 'Web View', desc: 'Thymeleaf Templates' },
      { name: 'Spring Boot', desc: 'Scraper Controller' },
      { name: 'Database', desc: 'MySQL Schema' }
    ],
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
      data-hover-label="DECONSTRUCT"
      className="grid-cell hud-brackets hud-scanline flex flex-col justify-between group cursor-none hover:bg-sky-950/5 min-h-[360px]"
    >
      <div>
        {/* Index, Coordinates, & Year */}
        <div className="flex justify-between items-center mb-6 font-mono text-[0.5rem] text-slate-500 uppercase tracking-widest">
          <span>{project.coord}</span>
          <span>[ MOD_0{index + 1} ]</span>
        </div>

        {/* Flat Grid Image Container with Tech crosshairs */}
        <div className="relative h-44 w-full mb-6 overflow-hidden border border-white/5 bg-slate-950 hud-corner-cross">
          <ImageWithFallback 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-500" 
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-white font-bold mb-3 tracking-tight group-hover:text-sky-400 transition-colors uppercase">
          {project.title}
        </h3>

        {/* Desc */}
        <p className="font-body text-slate-400 text-xs leading-relaxed mb-6">
          {project.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 font-mono text-[0.55rem] text-slate-500 tracking-wider">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="hover:text-sky-300 transition-colors">
            #{tag.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="work" className="relative min-h-screen py-24 px-6 md:px-12 bg-[#020617] border-t border-white/5">
      <ParticleCanvas section="work" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Structured Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-12">
          <div className="text-left max-w-xl">
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-sky-400/70 block mb-3">
              SYSTEM REPOSITORY // INDEX_OF_PROJECTS
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              WORK_CATALOG
            </h2>
          </div>
          <p className="font-body text-slate-400 text-sm leading-relaxed max-w-md text-left">
            A deconstructed overview of systems architecture, operational pipelines, and raw source fragments.
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
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5 text-left hud-corner-cross">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-[#38bdf8] uppercase block mb-6">
              // OPERATIONAL_ACHIEVEMENTS
            </span>
            <ul className="space-y-6">
              <li>
                <h4 className="font-display text-xs font-bold text-white mb-1 uppercase tracking-wide">
                  Eureka! 2025 Zonal Rounds
                </h4>
                <p className="font-body text-[0.7rem] text-slate-400">
                  Shortlisted for regional selection phases, hosted by E-Cell, IIT Bombay.
                </p>
              </li>
              <li>
                <h4 className="font-display text-xs font-bold text-white mb-1 uppercase tracking-wide">
                  Smart India Hackathon (SIH)
                </h4>
                <p className="font-body text-[0.7rem] text-slate-400">
                  Selected in internal campus rounds for final submissions.
                </p>
              </li>
            </ul>
          </div>

          {/* Column 2: Profiles */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5 text-left hud-corner-cross">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-[#3b82f6] uppercase block mb-6">
              // CODING_METRICS
            </span>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="p-4 border border-white/5 hover:border-[#38bdf8]/35 bg-slate-950/40 rounded transition-colors text-left cursor-none" data-hover-label="LEETCODE">
                <span className="font-display text-xs font-bold text-white block mb-1">Leetcode</span>
                <span className="font-mono text-[0.55rem] text-slate-500">1551 Rating / 133 Solved</span>
              </a>
              <a href="#" className="p-4 border border-white/5 hover:border-[#38bdf8]/35 bg-slate-950/40 rounded transition-colors text-left cursor-none" data-hover-label="SKILLRACK">
                <span className="font-display text-xs font-bold text-white block mb-1">Skillrack</span>
                <span className="font-mono text-[0.55rem] text-slate-500">1009 Problems Solved</span>
              </a>
            </div>
          </div>

          {/* Column 3: Certifications */}
          <div className="p-8 text-left hud-corner-cross">
            <span className="font-mono text-[0.55rem] tracking-[0.25em] text-sky-400 uppercase block mb-6">
              // CREDENTIALS_REGISTER
            </span>
            <ul className="space-y-3 font-body text-xs text-slate-400">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Data Structures & Algorithms</span>
                <span className="font-mono text-[0.55rem] text-slate-600">Udemy</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>ReactJS Masterclass</span>
                <span className="font-mono text-[0.55rem] text-slate-600">Udemy</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 cursor-none"
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.92)', backdropFilter: 'blur(20px)' }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[88vh] md:h-[80vh] flex flex-col lg:flex-row border border-[#38bdf8]/20 shadow-2xl hud-scanline"
              style={{ background: '#020617' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner bracket HUD elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-400" />

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                data-hover-label="EXIT"
                className="absolute right-5 top-5 z-[110] p-2 border border-white/10 text-slate-400 hover:text-white transition-all bg-[#020617] cursor-none"
              >
                <X size={16} />
              </button>

              {/* Left Side: System Deconstruction */}
              <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-6 font-mono text-[0.55rem]">
                    <span className="text-sky-400 font-bold">[ DIAGNOSTICS: RUNNING ]</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-500">{projectPath(activeProject.title)}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-6 tracking-tight uppercase">
                    {activeProject.title}
                  </h3>

                  <div className="font-body text-slate-400 text-xs md:text-sm leading-relaxed space-y-4 mb-8">
                    <p>{activeProject.desc}</p>
                    <p className="text-slate-500">{activeProject.longDesc}</p>
                  </div>

                  {/* Deconstruct and Expand pipeline map */}
                  <div className="mb-8">
                    <h4 className="font-mono text-[0.55rem] tracking-wider uppercase text-slate-500 mb-4 flex items-center gap-2">
                      <Layers size={10} className="text-sky-400" /> SYSTEM ARCHITECTURE PIPELINE
                    </h4>
                    
                    <div className="border border-white/5 bg-slate-950 p-4 font-mono text-[0.55rem] text-slate-400 space-y-3">
                      {activeProject.architecture.map((node, nIdx) => (
                        <div key={node.name} className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sky-400 font-bold">[0{nIdx + 1}]</span>
                            <span className="text-white font-semibold">{node.name.toUpperCase()}</span>
                          </div>
                          <span className="text-slate-600">{node.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and Launch triggers */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 font-mono text-[0.5rem] tracking-[0.1em] uppercase text-sky-400 bg-sky-950/20 border border-sky-900/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={activeProject.liveUrl}
                      data-hover-label="LAUNCH"
                      className="flex-1 py-3 px-5 text-center font-mono text-[0.62rem] tracking-widest uppercase text-black bg-white hover:bg-slate-200 transition-colors cursor-none"
                    >
                      LAUNCH OPERATIONAL MODULE
                    </a>
                    <a
                      href={activeProject.codeUrl}
                      data-hover-label="SOURCE"
                      className="py-3 px-5 font-mono text-[0.62rem] tracking-widest uppercase text-white border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 bg-slate-900/50 cursor-none"
                    >
                      <Github size={12} /> READ CODE
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Code & Diagnostics */}
              <div className="w-full lg:w-1/2 bg-slate-950 p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* File tab header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-sky-400" />
                      <span className="font-mono text-xs text-slate-400">{activeProject.title.toLowerCase().replace(' ', '_')}.config</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[0.55rem] text-slate-600">
                      <span>SIZE: {activeProject.codeSnippet.length}B</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      </div>
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

function projectPath(title: string) {
  return `C:\\SYS\\PROJECTS\\${title.toUpperCase().replace(' ', '_')}\\MAIN`;
}
