import { motion, useInView, useScroll, useTransform } from 'motion/react';
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

/* ─── Letter scramble hook ─── */
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

/* ─── Shimmer shimmer component (for video placeholder) ─── */
function ShimmerBlock() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative w-full h-40 rounded-2xl overflow-hidden flex items-center justify-center mb-8"
      style={{ background: '#1e1a16', border: '1px solid rgba(245,158,11,0.1)' }}
    >
      {/* Diagonal shimmer — light sweep every 2.5s */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)',
          backgroundSize: '250% 100%',
          animation: 'shimmer-sweep 2.5s ease-in-out infinite',
        }}
      />
      {/* Play button — spring bounce on hover */}
      <motion.button
        onHoverStart={() => setPlaying(true)}
        onHoverEnd={() => setPlaying(false)}
        whileHover={{ scale: 1.15 }}
        animate={playing ? { scale: [1.15, 1] } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
        aria-label="Play demo"
        style={{ cursor: 'none' }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        onClick={() => { }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #e07c5c)', boxShadow: '0 0 22px rgba(245,158,11,0.35)' }} />
        <svg className="relative z-10 ml-1" width="20" height="20" viewBox="0 0 24 24" fill="#0e0c0a">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </motion.button>

      <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[0.55rem] tracking-[0.2em] uppercase"
        style={{ color: 'rgba(168,162,158,0.35)' }}>// Demo Showreel</p>
    </div>
  );
}

/* ─── Scramble CTA button ─── */
function ScrambleCTA() {
  const { display, start, reset } = useScramble(SCRAMBLE_REAL);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="mailto:surya@devportfolio.com"
      onMouseEnter={() => { setHovered(true); start(); }}
      onMouseLeave={() => { setHovered(false); reset(); }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-mono text-sm tracking-[0.06em] relative overflow-hidden group mt-6"
      style={{ cursor: 'none', background: 'transparent' }}
    >
      {/* SVG border draws on hover */}
      <svg className="absolute inset-0 w-full h-full rounded-xl pointer-events-none" style={{ overflow: 'visible' }}>
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="12" ry="12" fill="none"
          stroke="#f59e0b" strokeWidth="1.5"
          strokeDasharray="1000" strokeDashoffset={hovered ? 0 : 1000}
          style={{ transition: hovered ? 'stroke-dashoffset 0.5s ease' : 'stroke-dashoffset 0.25s ease' }}
        />
      </svg>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(245,158,11,0.05)' }} />

      <Send className="w-4 h-4 relative z-10" style={{ color: '#f59e0b' }} />
      <span className="relative z-10 font-mono" style={{ color: '#fafaf9', minWidth: '8ch', display: 'inline-block' }}>
        {display}
      </span>
    </motion.a>
  );
}

/* ─── Main Contact ─── */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false); setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1600);
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(30,26,22,0.75)',
    border: '1px solid rgba(245,158,11,0.1)',
    color: '#fafaf9',
    outline: 'none',
    fontFamily: '"Playpen Sans Arabic", sans-serif',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)';
    e.currentTarget.style.boxShadow = '0 0 18px rgba(245,158,11,0.07)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen py-36 px-6 overflow-hidden"
      style={{ background: '#161210' }}>

      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <ParticleCanvas section="contact" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: '16%', rotate: '-3deg' },
          { right: '20%', rotate: '3deg' },
        ].map((b, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px opacity-20"
            style={{ ...b, background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.07) 40%, rgba(224,124,92,0.06) 70%, transparent)', borderStyle: 'none' }} />
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(224,124,92,0.25), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header — line wipes */}
        <div className="text-center mb-20">
          {[
            { content: '// Contact', delay: 0, style: { fontFamily: '"Fira Code", monospace', fontSize: '0.6rem', letterSpacing: '0.42em', textTransform: 'uppercase' as const, color: 'rgba(245,158,11,0.55)' } },
          ].map((l, i) => (
            <div key={i} className="overflow-hidden mb-2">
              <motion.p initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.6, delay: l.delay, ease: [0.76, 0, 0.24, 1] }}
                style={l.style}>{l.content}</motion.p>
            </div>
          ))}

          <div className="overflow-hidden mb-2">
            <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="font-display tracking-wide leading-[1.1]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', background: 'linear-gradient(135deg, #fafaf9, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Let's Build Something
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
              className="font-display tracking-wide leading-[1.15]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', background: 'linear-gradient(135deg, #f59e0b, #e07c5c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'warm-shimmer 4s linear infinite' }}>
              Extraordinary
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.76, 0, 0.24, 1] }}
              className="font-body text-base max-w-xl mx-auto" style={{ color: '#a8a29e', lineHeight: 2 }}>
              Have a project in mind? I'd love to hear about it. Let's create something meaningful together.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ─── Left info ─── */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.7 }} className="space-y-5">
            <h3 className="font-display tracking-wide text-2xl mb-5" style={{ color: '#fafaf9' }}>Let's Connect</h3>
            <p className="font-body text-base mb-6" style={{ color: '#a8a29e', lineHeight: 2 }}>
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Whether you have a question or just want to say hi — my inbox is always open.
            </p>

            {/* ─── Showreel shimmer block ─── */}
            <ShimmerBlock />

            {CONTACT_INFO.map((info, i) => (
              <motion.a key={info.label} href={info.href}
                initial={{ opacity: 0, x: -22 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-4 p-5 rounded-xl relative overflow-hidden"
                style={{ background: 'rgba(22,18,16,0.6)', border: '1px solid rgba(245,158,11,0.08)', cursor: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,158,11,0.26)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,158,11,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,158,11,0.08)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(22,18,16,0.6)'; }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <info.icon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <p className="font-mono text-[0.56rem] tracking-[0.16em] uppercase mb-0.5"
                    style={{ color: 'rgba(168,162,158,0.38)' }}>// {info.label}</p>
                  <p className="font-body font-medium text-base transition-colors duration-300 group-hover:text-[#f59e0b]"
                    style={{ color: '#fafaf9' }}>{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* ─── Scramble CTA ─── */}
            <ScrambleCTA />
          </motion.div>

          {/* ─── Right form ─── */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl space-y-6"
              style={{ background: 'rgba(22,18,16,0.55)', border: '1px solid rgba(245,158,11,0.08)', backdropFilter: 'blur(10px)' }}>
              <h3 className="font-display tracking-wide text-2xl mb-2" style={{ color: '#fafaf9' }}>Send a Message</h3>

              {[
                { id: 'c-name', type: 'text', label: 'Your Name', ph: 'Surya P', val: form.name, key: 'name' as const },
                { id: 'c-email', type: 'email', label: 'Email Address', ph: 'you@example.com', val: form.email, key: 'email' as const },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
                    style={{ color: 'rgba(168,162,158,0.45)' }}>// {f.label}</label>
                  <input type={f.type} id={f.id} required
                    value={f.val} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.ph}
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-[#3f3a36]"
                    style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              ))}

              <div>
                <label htmlFor="c-msg" className="block font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'rgba(168,162,158,0.45)' }}>// Message</label>
                <textarea id="c-msg" required rows={5}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none placeholder-[#3f3a36]"
                  style={inputStyle as React.CSSProperties}
                  onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
                  onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>} />
              </div>

              <motion.button type="submit" disabled={sending}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-body font-semibold text-sm relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: sent ? 'linear-gradient(135deg, #86efac, #22c55e)' : 'linear-gradient(135deg, #f59e0b, #e07c5c)',
                  boxShadow: '0 0 28px rgba(245,158,11,0.22)',
                  color: '#0e0c0a', transition: 'background 0.4s', cursor: 'none',
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
                {sending ? (
                  <motion.div className="relative z-10 w-5 h-5 border-2 border-[#0e0c0a] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                ) : sent ? (
                  <span className="relative z-10">✓ Message Sent!</span>
                ) : (
                  <><Send size={16} className="relative z-10" /><span className="relative z-10">Send Message</span></>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-24 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(168,162,158,0.28)' }}>
            © 2025 Surya P &nbsp;·&nbsp; Designed & Built with ♥
          </p>
        </motion.div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer-sweep {
          0%   { background-position: -100% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </section>
  );
}
