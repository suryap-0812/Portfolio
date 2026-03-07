import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'surya@devportfolio.com', href: 'mailto:surya@devportfolio.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Location', value: 'India', href: '#' },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

      <ParticleCanvas section="contact" />

      {/* Warm side beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 w-px opacity-25 -rotate-3"
          style={{ left: '16%', background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.06) 40%, rgba(224,124,92,0.05) 70%, transparent)' }} />
        <div className="absolute top-0 bottom-0 w-px opacity-25 rotate-3"
          style={{ right: '20%', background: 'linear-gradient(to bottom, transparent, rgba(224,124,92,0.06) 40%, rgba(245,158,11,0.05) 70%, transparent)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(224,124,92,0.25), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ─── Header ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-20">
          <p className="font-mono text-[0.6rem] tracking-[0.42em] uppercase mb-4"
            style={{ color: 'rgba(245,158,11,0.55)' }}>// Contact</p>
          <h2 className="font-display tracking-wide leading-[1.1] mb-2"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #fafaf9, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
            Let's Build Something
          </h2>
          <h2 className="font-display tracking-wide leading-[1.15] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              background: 'linear-gradient(135deg, #f59e0b, #e07c5c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'warm-shimmer 4s linear infinite',
            }}>
            Extraordinary
          </h2>
          <p className="font-body text-base max-w-xl mx-auto" style={{ color: '#a8a29e', lineHeight: 2 }}>
            Have a project in mind? I'd love to hear about it. Let's create something meaningful together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ─── Left: Contact info ─── */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }} className="space-y-6">
            <h3 className="font-display tracking-wide text-2xl mb-5" style={{ color: '#fafaf9' }}>Let's Connect</h3>
            <p className="font-body text-base mb-8" style={{ color: '#a8a29e', lineHeight: 2 }}>
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Whether you have a question or just want to say hi — my inbox is always open.
            </p>

            {CONTACT_INFO.map((info, i) => (
              <motion.a key={info.label} href={info.href}
                initial={{ opacity: 0, x: -22 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-4 p-5 rounded-xl relative overflow-hidden"
                style={{ background: 'rgba(22,18,16,0.6)', border: '1px solid rgba(245,158,11,0.08)', cursor: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,158,11,0.26)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,158,11,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,158,11,0.08)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(22,18,16,0.6)'; }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.05), transparent)', transform: 'skewX(-18deg)' }} />
                <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <info.icon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                </div>
                <div className="z-10">
                  <p className="font-mono text-[0.56rem] tracking-[0.16em] uppercase mb-0.5"
                    style={{ color: 'rgba(168,162,158,0.38)' }}>// {info.label}</p>
                  <p className="font-body font-medium text-base transition-colors duration-300 group-hover:text-[#f59e0b]"
                    style={{ color: '#fafaf9' }}>{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Warm orbital decoration */}
            <div className="relative h-44 flex items-center justify-center mt-4">
              <div className="anim-spin-slow absolute w-32 h-32 rounded-full opacity-18"
                style={{ border: '1px dashed rgba(245,158,11,0.35)' }} />
              <div className="absolute w-20 h-20 rounded-full opacity-18"
                style={{ border: '1px dashed rgba(224,124,92,0.4)', animation: 'spin-slow 14s linear infinite reverse' }} />
              <div className="w-9 h-9 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.5), rgba(224,124,92,0.3))', boxShadow: '0 0 22px rgba(245,158,11,0.3)' }} />
            </div>
          </motion.div>

          {/* ─── Right: Form ─── */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl space-y-6"
              style={{ background: 'rgba(22,18,16,0.55)', border: '1px solid rgba(245,158,11,0.08)', backdropFilter: 'blur(10px)' }}>

              <h3 className="font-display tracking-wide text-2xl mb-2" style={{ color: '#fafaf9' }}>Send a Message</h3>

              {/* Name */}
              <div>
                <label htmlFor="c-name" className="block font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'rgba(168,162,158,0.45)' }}>// Your Name</label>
                <input type="text" id="c-name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Surya P"
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-[#3f3a36]"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="c-email" className="block font-mono text-[0.56rem] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'rgba(168,162,158,0.45)' }}>// Email Address</label>
                <input type="email" id="c-email" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-[#3f3a36]"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Message */}
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

              {/* Submit */}
              <motion.button type="submit" disabled={sending}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-body font-semibold text-sm text-[#0e0c0a] relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg, #86efac, #22c55e)'
                    : 'linear-gradient(135deg, #f59e0b, #e07c5c)',
                  boxShadow: '0 0 28px rgba(245,158,11,0.22)',
                  transition: 'background 0.4s',
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
                {sending ? (
                  <motion.div className="relative z-10 w-5 h-5 border-2 border-[#0e0c0a] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                ) : sent ? (
                  <span className="relative z-10">✓ Message Sent!</span>
                ) : (
                  <>
                    <Send size={16} className="relative z-10" />
                    <span className="relative z-10">Send Message</span>
                  </>
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
    </section>
  );
}
