import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'Secure Authentication System',
      description:
        'Full-stack authentication platform with JWT, OAuth2, and multi-factor authentication',
      image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrZXIlMjB0ZXJtaW5hbCUyMGNvZGluZyUyMGRhcmt8ZW58MXx8fHwxNzcyMTY4ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'JWT', 'PostgreSQL'],
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'Modern e-commerce solution with real-time inventory, payment integration, and analytics',
      image: 'https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzcyMTIwMjcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['TypeScript', 'Next.js', 'Stripe', 'MongoDB'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Linux Server Dashboard',
      description:
        'Real-time monitoring dashboard for Linux servers with automated alerts and metrics',
      image: 'https://images.unsplash.com/photo-1506399309177-3b43e99fead2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW51eCUyMHNlcnZlciUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc3MjE2ODgwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Python', 'Docker', 'Grafana'],
      gradient: 'from-cyan-500 to-purple-600',
    },
    {
      title: 'Security Audit Tool',
      description:
        'Automated security scanning tool for web applications with detailed vulnerability reports',
      image: 'https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDU3ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Python', 'Flask', 'SQLite', 'Nmap'],
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      title: 'Cloud Infrastructure',
      description:
        'Scalable cloud infrastructure with automated deployment and monitoring systems',
      image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMHNlY3VyaXR5JTIwc2hpZWxkJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NzIwNTM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD'],
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'API Security Gateway',
      description:
        'API gateway with rate limiting, authentication, and comprehensive security features',
      image: 'https://images.unsplash.com/photo-1731834452405-a472facfae95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJtaW5hbCUyMGNvbW1hbmQlMjBsaW5lJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjE2ODgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Node.js', 'Express', 'Redis', 'Nginx'],
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-black relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      {/* Diagonal slash decorations */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
        <motion.path
          d="M 0 300 L 300 0"
          stroke="url(#workGradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 1000 700 L 700 1000"
          stroke="url(#workGradient2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="workGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="workGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Featured Work
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-8"
          />
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of projects showcasing web development, security, and infrastructure expertise
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Top slash effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hoveredIndex === index ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} origin-left z-10`}
              />

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 flex items-center justify-center gap-4`}
                >
                  <motion.a
                    href="#"
                    initial={{ scale: 0 }}
                    animate={
                      hoveredIndex === index ? { scale: 1 } : { scale: 0 }
                    }
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white"
                    aria-label="View project"
                  >
                    <ExternalLink size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    initial={{ scale: 0 }}
                    animate={
                      hoveredIndex === index ? { scale: 1 } : { scale: 0 }
                    }
                    transition={{ duration: 0.3, delay: 0.15 }}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white"
                    aria-label="View code"
                  >
                    <Github size={24} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl mb-3 text-gray-100">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + tagIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom slash */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hoveredIndex === index ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} origin-right`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
