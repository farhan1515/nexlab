import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into understanding your business, goals, and challenges to create a solid foundation for success.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Our experts craft a comprehensive roadmap with clear milestones, timelines, and deliverables.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Development',
    description: 'We code your solution using best-in-class tools to ensure it is fast, secure, and ready for future growth.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'Rigorous testing, smooth deployment, and ongoing support ensure long-term success.',
    icon: Rocket,
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation (runs on all screens)
      gsap.fromTo('.process-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.process-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animation Logic with Media Query
      // Horizontal scroll animation (All screens)
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll tween
      const scrollTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 0.5,
        },
      });

      // Individual card animations
      const cards = track.querySelectorAll('.process-card');
      cards.forEach((card) => {
        const number = card.querySelector('.step-number');
        const content = card.querySelector('.step-content');
        const icon = card.querySelector('.step-icon');

        gsap.fromTo(number,
          { opacity: 0.3, scale: 1 },
          {
            opacity: 1, scale: 1.1, duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 60%',
              end: 'left 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(content,
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(icon,
          { scale: 0, rotate: -180 },
          {
            scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-dark overflow-hidden h-screen flex flex-col"
    >
      {/* Section Header */}
      <div className="process-header pt-24 pb-4 px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="max-w-7xl mx-auto text-center">
          <span className="process-title inline-block text-sm font-medium text-primary tracking-wider uppercase mb-2">
            How We Work
          </span>
          <h2 className="process-title text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="process-title text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            A proven methodology that ensures every project delivers exceptional results.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative flex-grow w-full overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-primary via-accent-amber to-primary-dark origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center h-full px-8 md:px-16 lg:px-24 gap-8"
          style={{ width: 'fit-content' }}
        >
          {processSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            const isLast = stepIndex === processSteps.length - 1;

            return (
              <div
                key={step.number}
                className="process-card relative flex-shrink-0 w-[90vw] md:w-[60vw] lg:w-[40vw] h-auto md:h-[60vh] flex items-center"
              >
                {/* Connector Line */}
                {!isLast && (
                  <div className="absolute top-1/2 left-full w-8 md:w-16 h-0.5 bg-gradient-to-r from-primary to-accent-amber hidden md:block" />
                )}

                <div className="w-full">
                  {/* Step Number */}
                  <div className="step-number text-[80px] md:text-[180px] font-display font-bold leading-none gradient-text opacity-30 select-none mb-[-40px] md:mb-[-80px]">
                    {step.number}
                  </div>

                  {/* Content Card */}
                  <div className="step-content relative bg-card border border-white/10 rounded-3xl p-6 md:p-10 ml-2 md:ml-8 backdrop-blur-sm">
                    {/* Icon */}
                    <div className="step-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-amber flex items-center justify-center mb-6 shadow-glow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Indicator */}
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                      <span className="text-sm text-gray-500">Step</span>
                      <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End Card */}
          <div className="process-card flex-shrink-0 w-[90vw] md:w-[40vw] h-auto md:h-[60vh] flex items-center justify-center">
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent-amber to-primary-dark flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-glow-lg">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Ready to Start?
              </h3>
              <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                Let's turn your ideas into reality. Get in touch today.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent-amber text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection