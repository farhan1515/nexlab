import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BusinessHealthScoreSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo('.bhs-badge',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bhs-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title animation
      gsap.fromTo('.bhs-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bhs-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bullets stagger
      gsap.fromTo('.bhs-bullet',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bhs-bullets',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA button
      gsap.fromTo('.bhs-cta',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.3,
          scrollTrigger: {
            trigger: '.bhs-cta',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative card
      gsap.fromTo('.bhs-visual',
        { y: 30, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bhs-visual',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bullets = [
    { icon: Clock, text: 'Takes 2 minutes' },
    { icon: MessageCircle, text: 'Personalized report to your WhatsApp' },
    { icon: ShieldCheck, text: 'No sales call required' },
  ];

  return (
    <section
      id="health-score"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="bhs-header">
            {/* FREE TOOL Badge */}
            <div className="bhs-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent tracking-wider uppercase">
                FREE TOOL
              </span>
            </div>

            {/* Title */}
            <h2 className="bhs-title text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              Find Out Where Your Business Is{' '}
              <span className="gradient-text">Losing Money</span>
            </h2>

            {/* Bullets */}
            <div className="bhs-bullets space-y-4 mb-10">
              {bullets.map((bullet) => {
                const Icon = bullet.icon;
                return (
                  <div
                    key={bullet.text}
                    className="bhs-bullet flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-gray-300 font-medium">
                      {bullet.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <a
              href="/score"
              className="bhs-cta inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 group text-lg"
            >
              Get My Free Business Score
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Right — Visual card */}
          <div className="bhs-visual perspective-1000">
            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Mini score gauge preview */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">Business Health Score</h4>
                  <p className="text-sm text-gray-400">5 key categories analyzed</p>
                </div>
                <div className="relative">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                    <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle cx="30" cy="30" r="26" fill="none" stroke="#00D4AA" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * 0.28}`}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(0, 212, 170, 0.5))' }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">72</span>
                </div>
              </div>

              {/* Mini category bars */}
              {[
                { name: 'Online Visibility', value: 65, color: '#F59E0B' },
                { name: 'Lead Capture', value: 40, color: '#EF4444' },
                { name: 'Operations', value: 85, color: '#00D4AA' },
                { name: 'Retention', value: 55, color: '#F59E0B' },
                { name: 'Growth Potential', value: 72, color: '#00D4AA' },
              ].map((cat) => (
                <div key={cat.name} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{cat.name}</span>
                    <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${cat.value}%`,
                        backgroundColor: cat.color,
                        boxShadow: `0 0 6px ${cat.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Overlay blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent flex items-end justify-center pb-8 rounded-3xl">
                <span className="text-sm text-gray-300 font-medium">
                  See your real score →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHealthScoreSection;
