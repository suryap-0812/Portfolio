import { motion } from 'motion/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'surya@devportfolio.com', href: 'mailto:surya@devportfolio.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location', value: 'India', href: '#' },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&';
const SCRAMBLE_REAL = 'Get In Touch';

function useScramble(real: string) {
  const [display, setDisplay] = useState(real);
  const rafRef = useRef<ReturnType<typeof setTimeout>>();
  const startRef = useRef(0);

  const start = useCallback(() => {
    startRef.current = Date.now();
    const duration = 400;
    const interval = 30;

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
      className="relative w-full h-40 border border-white/5 bg-slate-950 flex items-center justify-center mb-8"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.03) 50%, transparent 65%)',
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
        className="relative w-12 h-12 flex items-center justify-center border border-white/10 bg-slate-900 cursor-none"
        onClick={() => { }}
      >
        <svg className="ml-0.5 text-white fill-current" width="14" height="14" viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </motion.button>

      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[0.55rem] tracking-[0.2em] uppercase text-slate-600">// Demo Showreel</p>
    </div>
  );
}

function ScrambleCTA() {
  const { display, start, reset } = useScramble(SCRAMBLE_REAL);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="mailto:surya@devportfolio.com"
      onMouseEnter={() => { setHovered(true); start(); }}
      onMouseLeave={() => { setHovered(false); reset(); }}
      data-hover-label="EMAIL"
      className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-white/30 text-white font-mono text-xs tracking-[0.1em] transition-colors mt-6 cursor-none"
    >
      <Send className="w-3.5 h-3.5 text-slate-400" />
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
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-12 bg-[#020617] border-t border-white/5">
      <ParticleCanvas section="contact" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-slate-500 block mb-2">
              // GET IN TOUCH
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Let's Connect
            </h2>
          </div>
          <p className="font-body text-slate-400 text-xs md:text-sm max-w-md text-left leading-relaxed">
            Have a system to build or a problem to solve? Send me a message and let's work on it.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info & Showreel */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <h3 className="font-display text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Channels
            </h3>
            <p className="font-body text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
              I am open to developer roles, open-source projects, and collaborative software engineering.
            </p>

            <ShimmerBlock />

            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <a key={info.label} href={info.href}
                  data-hover-label={info.label.toUpperCase()}
                  className="flex items-center gap-4 p-4 border border-white/5 hover:border-white/10 bg-slate-950/20 transition-all cursor-none"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-slate-950 border border-white/5">
                    <info.icon size={14} className="text-slate-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.55rem] tracking-wider text-slate-600 block">// {info.label}</span>
                    <span className="font-body text-xs md:text-sm text-slate-200">{info.value}</span>
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
            <form onSubmit={handleSubmit} className="p-8 border border-white/5 bg-slate-950/20 space-y-6 text-left">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
                Message Interface
              </h3>

              <div>
                <label htmlFor="c-name" className="block font-mono text-[0.55rem] tracking-widest text-slate-500 uppercase mb-2">
                  // Your Name
                </label>
                <input 
                  type="text" 
                  id="c-name" 
                  required
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Surya P"
                  data-hover-label="WRITE"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-xs md:text-sm outline-none focus:border-white/30 transition-colors cursor-none placeholder-slate-700" 
                />
              </div>

              <div>
                <label htmlFor="c-email" className="block font-mono text-[0.55rem] tracking-widest text-slate-500 uppercase mb-2">
                  // Email Address
                </label>
                <input 
                  type="email" 
                  id="c-email" 
                  required
                  value={form.email} 
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  data-hover-label="WRITE"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-xs md:text-sm outline-none focus:border-white/30 transition-colors cursor-none placeholder-slate-700" 
                />
              </div>

              <div>
                <label htmlFor="c-msg" className="block font-mono text-[0.55rem] tracking-widest text-slate-500 uppercase mb-2">
                  // Message
                </label>
                <textarea 
                  id="c-msg" 
                  required 
                  rows={4}
                  value={form.message} 
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Details about your inquiry..."
                  data-hover-label="WRITE"
                  className="w-full px-4 py-3 border border-white/10 bg-slate-950 text-white font-body text-xs md:text-sm outline-none resize-none focus:border-white/30 transition-colors cursor-none placeholder-slate-700" 
                />
              </div>

              <button 
                type="submit" 
                disabled={sending}
                data-hover-label="SEND"
                className="w-full py-3.5 bg-white text-black hover:bg-slate-200 disabled:opacity-60 transition-colors font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-none"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : sent ? (
                  <span>✓ Message Sent</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-slate-600">
            © 2026 Surya P &nbsp;·&nbsp; Designed & Built with strict layout guidelines
          </p>
        </div>

      </div>
    </section>
  );
}
