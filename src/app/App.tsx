import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always keep dark mode on
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-gray-100">
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
