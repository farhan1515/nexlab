import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import CTASection from './sections/CTASection';
import Footer from './components/Footer';
import SchemaMarkup from './components/SchemaMarkup';
import './App.css';

import { Toaster } from './components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on load
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* SEO Schema Markup - Invisible JSON-LD injected into <head> for Google & LLMs */}
      <SchemaMarkup />

      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUsSection />
        <CTASection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
