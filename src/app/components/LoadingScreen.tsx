import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

export default function LoadingScreen() {
  const slashVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: [0, 1, 1, 0] as number[],
      transition: {
        pathLength: { duration: 0.8, delay: custom * 0.3, ease: 'easeInOut' as const },
        opacity: { duration: 0.8, delay: custom * 0.3, times: [0, 0.2, 0.8, 1] },
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#0e0c0a' }}
    >
      {/* Subtle warm grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(245,158,11,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,158,11,0.15) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
        }}
      />

      {/* Warm slash animations */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" fill="none">
        {[
          { d: 'M 100 100 L 500 500', grad: 'g1', custom: 0 },
          { d: 'M 900 100 L 500 500', grad: 'g2', custom: 1 },
          { d: 'M 100 900 L 500 500', grad: 'g1', custom: 2 },
          { d: 'M 900 900 L 500 500', grad: 'g2', custom: 3 },
        ].map((slash, i) => (
          <motion.path
            key={i}
            d={slash.d}
            stroke={`url(#${slash.grad})`}
            strokeWidth="3"
            strokeLinecap="round"
            custom={slash.custom}
            variants={slashVariants}
            initial="hidden"
            animate="visible"
            filter="url(#warmGlow)"
          />
        ))}
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#e07c5c" />
          </linearGradient>
          <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e07c5c" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <filter id="warmGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Centre content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full blur-xl opacity-50"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #e07c5c)' }}
            />
            <div className="relative p-6 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #e07c5c)',
                boxShadow: '0 0 30px rgba(245,158,11,0.4)',
              }}>
              <Code2 className="w-12 h-12" style={{ color: '#0e0c0a' }} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #fcd34d, #f59e0b, #e07c5c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            Loading Portfolio
          </h1>
        </motion.div>

        {/* Warm progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 w-64 h-1 mx-auto rounded-full overflow-hidden"
          style={{ background: 'rgba(245,158,11,0.12)' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #f59e0b, #e07c5c, #fcd34d)' }}
          />
        </motion.div>
      </div>

      {/* Warm ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: i % 2 === 0 ? '#f59e0b' : '#e07c5c' }}
          />
        ))}
      </div>
    </motion.div>
  );
}
