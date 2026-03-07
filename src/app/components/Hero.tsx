import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-transparent transition-colors duration-300"
    >
      {/* Dark mode gradient background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 110%, #1a0533 0%, #0a1628 40%, #050d1a 100%)',
        }}
      />
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, #2dd4bf33 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle cyan teal glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Purple glow bottom-center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-700/15 rounded-full blur-3xl" />

      {/* Diamond / triangle geometric shape behind text */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1024 768"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Inverted triangle pointing up */}
        <motion.polygon
          points="512,80 780,620 244,620"
          fill="none"
          stroke="url(#diamondGrad)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 3.2, ease: 'easeOut' }}
          style={{ transformOrigin: '512px 350px' }}
        />
        {/* Second larger triangle */}
        <motion.polygon
          points="512,40 860,680 164,680"
          fill="none"
          stroke="url(#diamondGrad)"
          strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2.5, delay: 3.4, ease: 'easeOut' }}
          style={{ transformOrigin: '512px 360px' }}
        />
      </svg>

      {/* ── Floating card: Code snippet (left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 3.8, ease: 'easeOut' }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-gray-50/90 dark:bg-[#0d1829]/90 backdrop-blur-sm border border-gray-200 dark:border-cyan-500/20 rounded-xl p-5 shadow-2xl dark:shadow-black/50 font-mono text-sm w-52"
        >
          <div className="text-cyan-600 dark:text-cyan-400 mb-1">
            <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
            <span className="text-cyan-700 dark:text-cyan-300">dev</span>{' '}
            <span className="text-gray-900 dark:text-white">=</span>{' '}
            <span className="text-gray-900 dark:text-white">{'{'}</span>
          </div>
          <div className="pl-4 space-y-0.5">
            <div>
              <span className="text-blue-600 dark:text-blue-300">name</span>
              <span className="text-gray-900 dark:text-white">: </span>
              <span className="text-green-600 dark:text-green-400">"Surya"</span>
              <span className="text-gray-900 dark:text-white">,</span>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-300">role</span>
              <span className="text-gray-900 dark:text-white">: </span>
              <span className="text-green-600 dark:text-green-400">"FullStack"</span>
              <span className="text-gray-900 dark:text-white">,</span>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-300">status</span>
              <span className="text-gray-900 dark:text-white">: </span>
              <span className="text-green-600 dark:text-green-400">"Open2Work"</span>
            </div>
          </div>
          <div className="text-gray-900 dark:text-white mt-1">{'};'}</div>
        </motion.div>
      </motion.div>

      {/* ── Floating card: Terminal (right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 4.0, ease: 'easeOut' }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="bg-gray-50/90 dark:bg-[#0d1829]/90 backdrop-blur-sm border border-gray-200 dark:border-cyan-500/20 rounded-xl p-5 shadow-2xl dark:shadow-black/50 font-mono text-sm w-52"
        >
          {/* Window controls */}
          <div className="flex gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-gray-800 dark:text-gray-300">npm install</div>
            <div className="text-gray-800 dark:text-gray-300">success</div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">...</span>
              <span className="text-green-600 dark:text-green-400">completed</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main centred content ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

        {/* Hello, I'm */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.3 }}
          className="text-3xl md:text-4xl text-gray-700 dark:text-gray-200 mb-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Hello, I'm
        </motion.p>

        {/* Surya P — animated gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.5 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0%', '200%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            Surya P
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 3.7 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4"
        >
          Aspiring Full-Stack Developer &amp; Software Engineer
        </motion.h2>

        {/* WEB DEVELOPMENT badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 3.85 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400">
            Web Development
          </span>
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 3.95 }}
          className="text-gray-500 dark:text-gray-400 mb-10"
        >
          Creating secure, scalable applications with modern technologies
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 4.1 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Mail, label: 'Email' },
          ].map((s, i) => (
            <motion.a
              key={s.label}
              href="#"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 4.1 + i * 0.1 }}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-gray-100/80 dark:bg-[#0d1829]/80 border border-gray-200 dark:border-cyan-500/20 hover:border-cyan-400/50 shadow-lg transition-all duration-300"
              aria-label={s.label}
            >
              <s.icon className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 4.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px #06b6d480' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300"
          >
            View My Resume
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/5 transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 4.6 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-label="Navigate to about page"
          className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowDown className="w-7 h-7" />
        </motion.button>
      </div>
    </section>
  );
}
