import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

export default function LoadingScreen() {
  // Sword slash animation paths
  const slashVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: [0, 1, 1, 0],
      transition: {
        pathLength: { duration: 0.8, delay: custom * 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.8, delay: custom * 0.3, times: [0, 0.2, 0.8, 1] },
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* Animated Sword Slashes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diagonal slash 1 */}
        <motion.path
          d="M 100 100 L 500 500"
          stroke="url(#gradient1)"
          strokeWidth="4"
          strokeLinecap="round"
          custom={0}
          variants={slashVariants}
          initial="hidden"
          animate="visible"
          filter="url(#glow)"
        />
        {/* Diagonal slash 2 */}
        <motion.path
          d="M 900 100 L 500 500"
          stroke="url(#gradient2)"
          strokeWidth="4"
          strokeLinecap="round"
          custom={1}
          variants={slashVariants}
          initial="hidden"
          animate="visible"
          filter="url(#glow)"
        />
        {/* Diagonal slash 3 */}
        <motion.path
          d="M 100 900 L 500 500"
          stroke="url(#gradient1)"
          strokeWidth="4"
          strokeLinecap="round"
          custom={2}
          variants={slashVariants}
          initial="hidden"
          animate="visible"
          filter="url(#glow)"
        />
        {/* Diagonal slash 4 */}
        <motion.path
          d="M 900 900 L 500 500"
          stroke="url(#gradient2)"
          strokeWidth="4"
          strokeLinecap="round"
          custom={3}
          variants={slashVariants}
          initial="hidden"
          animate="visible"
          filter="url(#glow)"
        />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Center Content */}
      <div className="relative z-10 text-center">
        {/* Icon with rotation */}
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
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-50"
            />
            <div className="relative p-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50">
              <Code2 className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <h1 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Loading Portfolio
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 w-64 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
          />
        </motion.div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
