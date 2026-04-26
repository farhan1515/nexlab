import { useState, useEffect } from 'react';
import { BarChart3, X } from 'lucide-react';

const FloatingScoreButton = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Show after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling ~80% of viewport height (past hero)
      setVisible(scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Collapse to icon-only on mobile after 5 seconds
  useEffect(() => {
    if (!visible) return;

    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [visible]);

  // Don't show on /score page or if dismissed
  const isScorePage =
    window.location.pathname === '/score' ||
    window.location.pathname === '/business-health-score';

  if (isScorePage || dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-10"
        aria-label="Dismiss"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Main button */}
      <a
        href="/score"
        className={`group flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 animate-pulse-glow ${
          collapsed ? 'px-4 py-4' : 'px-5 py-3.5'
        }`}
      >
        <BarChart3
          className={`${
            collapsed ? 'w-6 h-6' : 'w-5 h-5'
          } flex-shrink-0`}
        />
        <span
          className={`whitespace-nowrap text-sm transition-all duration-300 ${
            collapsed
              ? 'w-0 overflow-hidden opacity-0'
              : 'w-auto opacity-100'
          }`}
        >
          Free Business Score
        </span>
      </a>
    </div>
  );
};

export default FloatingScoreButton;
