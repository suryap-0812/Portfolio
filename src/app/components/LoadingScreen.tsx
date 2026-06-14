import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2200; // Counter takes 2.2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressValue = Math.min(elapsed / duration, 1);
      
      // Custom cubic easeOut for natural decelerating count speed
      const easeProgress = 1 - Math.pow(1 - progressValue, 3); 
      const currentProgress = Math.floor(easeProgress * 100);
      
      setProgress(currentProgress);

      if (progressValue < 1) {
        requestAnimationFrame(animate);
      } else {
        setProgress(100);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* ── Shutter exit panels ── */}
      {/* Left panel slides left */}
      <motion.div
        initial={{ x: '0%' }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 w-1/2 h-full bg-[#020617] border-r border-white/5"
      />
      {/* Right panel slides right */}
      <motion.div
        initial={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 w-1/2 h-full bg-[#020617] border-l border-white/5"
      />

      {/* Shutter background grid lines */}
      <div className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '4.5rem 4.5rem',
        }}
      />

      {/* ── Content container (fades out first on exit) ── */}
      <motion.div
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="relative z-10 text-center flex flex-col items-center justify-center"
      >
        {/* Animated code icon */}
        <div className="relative mb-6 inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #3b82f6)' }}
          />
          <div className="relative p-5 rounded-2xl border border-sky-500/20"
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.15)',
            }}>
            <Code2 className="w-10 h-10 text-[#38bdf8]" />
          </div>
        </div>

        {/* Loading text with glowing text reveal */}
        <h1 className="font-display tracking-[0.16em] text-3xl md:text-4xl mb-4 uppercase text-[#f8fafc]"
          style={{ textShadow: '0 0 15px rgba(248,250,252,0.1)' }}>
          System.Init
        </h1>

        {/* Counting Percentage */}
        <div className="relative h-20 overflow-hidden flex items-center justify-center select-none">
          <span className="font-display text-5xl md:text-6xl text-sky-400 font-extrabold tracking-wide"
            style={{
              background: 'linear-gradient(180deg, #7dd3fc, #38bdf8, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.25))'
            }}>
            {progress}%
          </span>
        </div>

        {/* Cinematic linear progress slider */}
        <div className="relative w-64 h-[2px] bg-sky-950/40 border border-sky-900/10 rounded-full overflow-hidden mb-4">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #38bdf8, #7dd3fc)',
              boxShadow: '0 0 8px #38bdf8',
            }}
          />
        </div>

        {/* Status indicator line */}
        <p className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-sky-500/50">
          {progress < 30 ? 'connecting_modules' : progress < 70 ? 'allocating_vfx_buffers' : progress < 100 ? 'resolving_assets' : 'handshake_complete'}
        </p>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * 800 - 100],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
            }}
            className="absolute w-1 h-1 rounded-full bg-sky-500/40"
          />
        ))}
      </div>
    </motion.div>
  );
}
