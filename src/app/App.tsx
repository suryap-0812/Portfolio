import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import MarqueeBar from './components/MarqueeBar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    
    // Initialize theme
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div
        className="min-h-screen theme-bg theme-text overflow-x-hidden relative"
      >
        {/* Ambient Glow Blobs for Semi-Dark/Blended Mode */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-[120px] pointer-events-none z-0 dark:opacity-80 opacity-0 transition-opacity duration-500" />
        <div className="absolute top-[45%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 blur-[130px] pointer-events-none z-0 dark:opacity-75 opacity-0 transition-opacity duration-500" />
        <div className="absolute bottom-[8%] left-[5%] w-[48vw] h-[48vw] rounded-full bg-gradient-to-r from-sky-500/8 to-blue-600/8 blur-[120px] pointer-events-none z-0 dark:opacity-80 opacity-0 transition-opacity duration-500" />

        <Navigation />
        <main>
          <Hero />
          <MarqueeBar />
          <About />
          <Work />
          <MarqueeBar />
          <Contact />
        </main>
      </div>
    </>
  );
}
