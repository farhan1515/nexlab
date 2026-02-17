import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// Words that speak to business decision-makers — what they actually get
const rotatingWords = ['Products', 'Brands', 'Futures'];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  // GSAP-powered word rotation — smooth vertical slide
  const animateWordChange = useCallback(() => {
    if (!wordRef.current) return;

    const tl = gsap.timeline();

    // Slide current word up and fade
    tl.to(wordRef.current, {
      y: '-100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
    });

    // Change the word
    tl.call(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    });

    // New word slides in from below
    tl.fromTo(
      wordRef.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(animateWordChange, 3000);
    return () => clearInterval(interval);
  }, [animateWordChange]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.3,
      });

      // Title line — "Build [word]"
      tl.fromTo(
        '.hero-title-line',
        { y: 80, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
        0
      );

      // Subtitle
      tl.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.4
      );

      // Descriptor tags
      tl.fromTo(
        '.hero-tag',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.7
      );

      // Scroll indicator
      tl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.2
      );

      // Scroll-triggered parallax fade
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden pb-24 md:pb-32"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/hero-bg.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent" />
      </div>

      {/* Content — left aligned */}
      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">

          {/* Main Title — "Build [word]" on ONE line, left-aligned */}
          <div className="hero-title-line mb-6 md:mb-8">
            <h1 className="flex items-baseline gap-4 sm:gap-5 md:gap-6 flex-wrap sm:flex-nowrap">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-display font-bold text-white leading-none tracking-tight">
                Build
              </span>
              <div
                className="relative overflow-hidden text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
                style={{ height: '1.15em', minWidth: '4em' }}
              >
                <span
                  ref={wordRef}
                  className="font-display font-bold bg-gradient-to-r from-primary via-[#2EECC1] to-accent bg-clip-text text-transparent inline-block leading-[1.15] whitespace-nowrap"
                >
                  {rotatingWords[currentWordIndex]}
                </span>
              </div>
            </h1>
          </div>

          {/* Subtitle — concise, business-focused */}
          <p className="hero-subtitle max-w-lg text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed font-light mb-10 md:mb-14">
            We design & engineer digital products that help ambitious brands scale — from concept to launch.
          </p>

          {/* Service tags — replaces old stats, shows what we do */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {[
              'Web Development',
              'Mobile Apps',
              'UI/UX Design',
              'AI Solutions',
              'Brand Strategy',
            ].map((tag, i) => (
              <span
                key={tag}
                className="hero-tag inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300/80 backdrop-blur-sm hover:border-primary/30 hover:text-white transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
