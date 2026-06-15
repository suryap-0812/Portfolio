import { motion } from 'motion/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'surya.p2024cse@sece.ac.in', href: 'mailto:surya.p2024cse@sece.ac.in', coord: 'SYS.CONN: EML' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', coord: 'SYS.CONN: TEL' },
  { icon: MapPin, label: 'Location', value: 'India', href: '#', coord: 'SYS.CONN: LOC' },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&';
const SCRAMBLE_REAL = 'IN_SECURE_TRANSMIT';

function useScramble(real: string) {
  const [display, setDisplay] = useState(real);
  const rafRef = useRef<ReturnType<typeof setTimeout>>();
  const startRef = useRef(0);

  const start = useCallback(() => {
    startRef.current = Date.now();
    const duration = 450;
    const interval = 25;

    const step = () => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const resolved = Math.floor(progress * real.length);

      const scrambled = real
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < resolved) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);
      if (progress < 1) rafRef.current = setTimeout(step, interval);
      else setDisplay(real);
    };

    step();
  }, [real]);

  const reset = useCallback(() => {
    clearTimeout(rafRef.current);
    setDisplay(real);
  }, [real]);

  useEffect(() => () => clearTimeout(rafRef.current), []);

  return { display, start, reset };
}

function ShimmerBlock() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative w-full h-40 border border-white/5 bg-slate-950 flex items-center justify-center mb-8 hud-brackets hud-scanline"
    >
      <div className="absolute top-2 left-2 font-mono text-xs text-slate-500">SYS.MED: SHOWREEL // ACTIVE</div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(56, 189, 248, 0.03) 50%, transparent 65%)',
          backgroundSize: '250% 100%',
          animation: 'shimmer-sweep 2.5s ease-in-out infinite',
        }}
      />
      <motion.button
        onHoverStart={() => setPlaying(true)}
        onHoverEnd={() => setPlaying(false)}
        whileHover={{ scale: 1.05 }}
        aria-label="Play demo"
        data-hover-label="PLAY"
        className="relative w-12 h-12 flex items-center justify-center border border-[#38bdf8]/20 bg-slate-950 cursor-none"
        onClick={() => { }}
      >
        <svg className="ml-0.5 text-white fill-current animate-pulse" width="14" height="14" viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </motion.button>

      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-xs tracking-[0.2em] uppercase text-slate-600">// PRESS PLAY FOR CONSOLE DEMO</p>
    </div>
  );
}

function ScrambleCTA() {
  const { display, start, reset } = useScramble(SCRAMBLE_REAL);

  return (
    <a
      href="mailto:surya.p2024cse@sece.ac.in"
      onMouseEnter={start}
      onMouseLeave={reset}
      data-hover-label="EMAIL"
      className="inline-flex items-center gap-3 px-6 py-3.5 border border-[#38bdf8]/20 hover:border-[#38bdf8]/50 text-white font-mono text-sm tracking-[0.1em] bg-slate-950 transition-colors mt-6 cursor-none"
    >
      <Send className="w-3.5 h-3.5 text-sky-400" />
      <span>{display}</span>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false); 
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-12 theme-bg border-t theme-border overflow-hidden">
      <ParticleCanvas section="contact" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-12">
          <div className="text-left max-w-xl">
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-sky-400/70 block mb-3">
              SYSTEM CONNECTION // CONTACT_TERMINAL
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              TALK_INTERFACE
            </h2>
          </div>
          <p className="font-body text-slate-350 text-sm md:text-base leading-relaxed max-w-md text-left">
            Establish a transmission pipeline for queries, collaborative design reviews, or server integration tasks.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info & Showreel */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <h3 className="font-display text-base font-bold text-white mb-4 uppercase tracking-wider">
              OPERATIONAL_ROUTING
            </h3>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-6">
              Active queues are monitored for software proposals and infrastructure projects.
            </p>

            <ShimmerBlock />

            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <a key={info.label} href={info.href}
                  data-hover-label={info.label.toUpperCase()}
                  className="flex items-center gap-4 p-4 border border-white/5 hover:border-[#38bdf8]/20 bg-slate-950/20 transition-all cursor-none"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-slate-950 border border-white/5">
                    <info.icon size={13} className="text-slate-400" />
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-wider text-slate-500 block">// {info.coord}</span>
                    <span className="font-body text-sm text-slate-200">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="w-fit">
              <ScrambleCTA />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 border border-white/5 bg-slate-950/20 space-y-6 text-left hud-brackets hud-scanline">
              <div className="flex justify-between items-center font-mono text-xs text-slate-500 mb-4">
                <span>[ INPUT_FORM // DATA_STREAM ]</span>
                <span>COORD: X-104</span>
              </div>

              <div>
                <label htmlFor="c-name" className="block font-mono text-xs tracking-widest text-slate-500 uppercase mb-2">
                  // SENDER_IDENTIFIER
                </label>
                <input 
                  type="text" 
                  id="c-name" 
                  required
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Surya P"
                  data-hover-label="IDENTIFIER"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-sm outline-none focus:border-sky-400/40 transition-colors cursor-none placeholder-slate-800" 
                />
              </div>

              <div>
                <label htmlFor="c-email" className="block font-mono text-xs tracking-widest text-slate-500 uppercase mb-2">
                  // TRANSMISSION_ROUTING_EMAIL
                </label>
                <input 
                  type="email" 
                  id="c-email" 
                  required
                  value={form.email} 
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  data-hover-label="EMAIL"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-sm outline-none focus:border-sky-400/40 transition-colors cursor-none placeholder-slate-800" 
                />
              </div>

              <div>
                <label htmlFor="c-msg" className="block font-mono text-xs tracking-widest text-slate-500 uppercase mb-2">
                  // TELEMETRY_MESSAGE_CONTENT
                </label>
                <textarea 
                  id="c-msg" 
                  required 
                  rows={4}
                  value={form.message} 
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Insert query telemetry..."
                  data-hover-label="MESSAGE"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-sm outline-none resize-none focus:border-sky-400/40 transition-colors cursor-none placeholder-slate-800" 
                />
              </div>

              <button 
                type="submit" 
                disabled={sending}
                data-hover-label="SUBMIT"
                className="w-full py-3.5 bg-white text-black hover:bg-slate-200 disabled:opacity-60 transition-colors font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2 cursor-none"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : sent ? (
                  <span>✓ TRANSMISSION ESTABLISHED</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>ESTABLISH LINK</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-600">
            © 2026 Surya P &nbsp;·&nbsp; ALL OPERATIONAL RIGHTS SECURED.
          </p>
          <div className="font-mono text-xs text-slate-600 tracking-wider">
            [ METRICS: SPEED_OPTIMIZED // ACCESSIBILITY: A11Y_PASS ]
          </div>
        </div>

      </div>
    </section>
  );
}
