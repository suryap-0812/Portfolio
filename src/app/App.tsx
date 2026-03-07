import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div
        className="min-h-screen text-[#fafaf9] overflow-x-hidden"
        style={{ background: '#0e0c0a' }}
      >
        <Navigation />
        <main>
          <Hero />
          <About />
          <Work />
          <Contact />
        </main>
      </div>
    </>
  );
}
