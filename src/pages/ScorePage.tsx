import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BusinessHealthScoreTool from '../components/BusinessHealthScoreTool';

const ScorePage = () => {
  // Set page-specific meta tags
  useEffect(() => {
    document.title = 'Free Business Health Score | NexLab Solutions Windsor';

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', 'Find out where your business is losing money in 2 minutes. Get a personalized report sent to your WhatsApp. Free — no sales call required.');
    setMeta('og:title', 'Free Business Health Score | NexLab Solutions Windsor', true);
    setMeta('og:description', 'Find out where your business is losing money in 2 minutes. Get a personalized report sent to your WhatsApp. Free — no sales call required.', true);
    setMeta('og:url', 'https://www.nexlab.solutions/score', true);
    setMeta('og:image', 'https://www.nexlab.solutions/og-image.png', true);
    setMeta('twitter:title', 'Free Business Health Score | NexLab Solutions Windsor');
    setMeta('twitter:description', 'Find out where your business is losing money in 2 minutes. Get a personalized report sent to your WhatsApp. Free — no sales call required.');

    // Set canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.nexlab.solutions/score');

    // Cleanup: restore homepage meta when leaving
    return () => {
      document.title = 'NexLab Solutions | Web, App & AI Automation Agency in Windsor, Ontario';
      setMeta('description', 'NexLab Solutions is a Windsor, Ontario digital agency offering website design, mobile app development, WhatsApp automation, AI receptionists, and SEO for businesses across Canada and the USA.');
      if (canonical) {
        canonical.setAttribute('href', 'https://www.nexlab.solutions/');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main className="pt-20">
        {/* Background pattern */}
        <div className="relative">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Background glows */}
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-start justify-center py-8 md:py-16">
            <BusinessHealthScoreTool />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScorePage;
