import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="pt-20"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
          <Navigation />

          {/* Theme Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-6 h-6 text-white" />
            ) : (
              <Sun className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <AnimatedRoutes />
        </div>
      </>
    </BrowserRouter>
  );
}
