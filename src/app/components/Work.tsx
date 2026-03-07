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
      title: 'Tribetask (Ongoing)',
      description:
        'A real-time collaborative task management platform enabling users to form "Tribes" and manage shared tasks efficiently.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['ReactJS', 'NodeJS', 'Tailwind', 'WebSockets', 'PostgreSQL'],
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Athlixir Website',
      description:
        'A responsive web application for athlete performance tracking, training management, and streamlined sports event participation.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['ReactJS', 'NodeJS', 'Tailwind', 'MongoDB'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Price Comparison Snapshot',
      description:
        'A full-stack web application to track and compare product prices across multiple vendors with lowest-price reports.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWRnZXJ8ZW58MXx8fDE3NzIxNjY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'Maven'],
      gradient: 'from-cyan-500 to-purple-600',
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.5] dark:opacity-10" />

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
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-2xl"
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
                <h3 className="text-2xl mb-3 text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-colors"
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
