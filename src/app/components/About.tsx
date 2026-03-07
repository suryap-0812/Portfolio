import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Server, Database, Wrench, BookOpen, Trophy } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      icon: Code,
      title: 'Languages',
      description: 'C++, C, Java, JavaScript, HTML, CSS, Python',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Server,
      title: 'Technologies',
      description: 'Spring Boot, NodeJS, Express, ReactJS, TailwindCSS, Django',
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: Database,
      title: 'Databases',
      description: 'SQL, MongoDB',
      color: 'from-cyan-500 to-purple-600',
    },
    {
      icon: Wrench,
      title: 'Tools',
      description: 'Git, GitHub, Postman, Vercel, Docker',
      color: 'from-purple-600 to-blue-600',
    },
    {
      icon: BookOpen,
      title: 'Core Concepts',
      description: 'Data Structures & Algorithms, Object-Oriented Programming, DBMS',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Trophy,
      title: 'Profiles & Stats',
      description: 'Leetcode: 1484 Max Rating, 125+ solved | Skillrack: 1009+ problems solved',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.5] dark:opacity-10" />

      {/* Sword slash decoration */}
      <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
        <motion.path
          d="M 800 0 L 400 400"
          stroke="url(#aboutGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="aboutGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
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
            About Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-8"
          />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a passionate developer with a strong foundation in full-stack web development, data structures, and algorithms.
            Dedicated to building robust applications and continuously learning new technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Top slash animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute -top-1 left-0 right-0 h-px bg-gradient-to-r ${skill.color} origin-left`}
              />

              <div className="h-full p-8 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md dark:shadow-none">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${skill.color} p-3 shadow-lg`}
                >
                  <skill.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className="text-xl mb-3 text-cyan-600 dark:text-cyan-400">
                  {skill.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </div>

              {/* Bottom slash animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r ${skill.color} origin-right`}
              />
            </motion.div>
          ))}
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-xl bg-white/80 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border border-gray-200 dark:border-gray-800 p-8 md:p-12 backdrop-blur-sm shadow-sm dark:shadow-none"
        >
          <h3 className="text-3xl mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Achievements & Certifications
          </h3>

          <div className="space-y-8">
            {[
              {
                year: '2025',
                role: 'Eureka! 2025 Zonal Rounds Shortlist',
                company: 'E-Cell, IIT Bombay',
              },
              {
                year: '2025',
                role: 'Smart India Hackathon (SIH) Shortlist',
                company: 'Internal Round Selection',
              },
              {
                year: '2025',
                role: 'Mastering DSA using C/C++',
                company: 'Udemy Certification',
              },
              {
                year: '2025',
                role: 'Deep Learning Specialization',
                company: 'NVIDIA Certification',
              },
              {
                year: '2024',
                role: 'ReactJS Masterclass',
                company: 'Udemy Certification',
              },
              {
                year: '2024',
                role: 'Completion Of C++ Training',
                company: 'IIT Bombay Certification',
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                whileHover={{
                  x: 30,
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="flex-shrink-0 w-32 text-cyan-600 dark:text-cyan-400 font-medium">
                  {exp.year}
                </div>
                <div className="flex-1 relative pl-6 border-l-2 border-gray-300 dark:border-gray-700 group-hover:border-cyan-500 transition-colors">
                  <div className="absolute left-0 top-2 w-4 h-4 -translate-x-[9px] rounded-full bg-cyan-500 group-hover:scale-150 transition-transform shadow-lg shadow-cyan-500/50" />
                  <h4 className="text-xl mb-1 text-gray-900 dark:text-gray-200">
                    {exp.role}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
