import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  Box,
  FileImage,

  Phone,
  Brain,
} from 'lucide-react';
import { ServiceVideoPlayer } from '../components/ServiceVideoPlayer';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  number: string;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const services: Service[] = [
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'We build sleek, high-performance mobile apps — for all devices — that your users will actually love using. From concept to App Store.',
    tagline: 'Fast Delivery · Scalable · Beautiful UI · App Store Ready',
    gradient: 'from-[#00D4AA] to-[#00B894]',
    accentColor: '#00D4AA',
    number: '01',
  },
  {
    icon: Box,
    title: '3D Web Development',
    description:
      'Interactive 3D experiences that make your website unforgettable. Immersive visuals and interactive elements that bring your brand to life.',
    tagline: 'Interactive · Immersive · Stunning Visuals · Engaging',
    gradient: 'from-[#6C63FF] to-[#3B82F6]',
    accentColor: '#6C63FF',
    number: '02',
  },
  {
    icon: FileImage,
    title: 'Flyer & Brand Design',
    description:
      'Eye-catching marketing materials that cut through the noise. From social media creatives to printed flyers — visuals that convert.',
    tagline: 'Social Media · Print · Branding · Marketing',
    gradient: 'from-[#FF6B6B] to-[#EE5A24]',
    accentColor: '#FF6B6B',
    number: '03',
  },
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp Automation',
    description:
      'Smart chatbots that handle customer queries 24/7. Automate orders, support, and engagement — while you focus on growing your business.',
    tagline: 'Auto-Reply · Order Taking · 24/7 Support · Smart Replies',
    gradient: 'from-[#25D366] to-[#128C7E]',
    accentColor: '#25D366',
    number: '04',
  },
  {
    icon: Phone,
    title: 'AI Voice Calling Agent',
    description:
      'An AI agent that picks up your calls, answers questions, books appointments, and qualifies leads — just like a real person, but never sleeps.',
    tagline: 'Auto-Answering · Booking · 24/7 Active · Lead Capture',
    gradient: 'from-[#FFB800] to-[#FF8C00]',
    accentColor: '#FFB800',
    number: '05',
  },
  {
    icon: Brain,
    title: 'Custom AI Solutions',
    description:
      'Bespoke AI implementations tailored to your unique business challenges. From data analysis to intelligent automation — we build what you need.',
    tagline: 'Save Time · Cut Costs · Automate Tasks · Grow Faster',
    gradient: 'from-[#E040FB] to-[#7C4DFF]',
    accentColor: '#E040FB',
    number: '06',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.service-panel');
      const totalPanels = panels.length;

      // Pin the entire section while we scroll through services
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${(totalPanels + 0.5) * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const rawProgress = self.progress;
          const scaledProgress =
            (rawProgress * (totalPanels + 0.5)) / totalPanels;
          const progress = Math.min(scaledProgress, 1);
          const currentIndex = Math.min(
            Math.floor(progress * totalPanels),
            totalPanels - 1
          );

          setActiveIndex(currentIndex);

          // Animate panels based on scroll progress
          panels.forEach((panel, i) => {
            const panelProgress =
              (progress - i / totalPanels) * totalPanels;

            if (i === currentIndex) {
              // Active panel — fade in
              gsap.set(panel, {
                opacity: 1,
                scale: 1,
                y: 0,
                zIndex: 10,
                pointerEvents: 'auto',
              });

              // Smooth entrance
              const inProgress = Math.min(panelProgress * 3, 1);

              // Animate content elements
              const content = panel.querySelector('.service-content');
              const videoWrap = panel.querySelector('.service-video-wrap');
              const number = panel.querySelector('.service-number-bg');
              const title = panel.querySelector('.service-title');
              const desc = panel.querySelector('.service-desc');
              const tagline = panel.querySelector('.service-tagline');
              const icon = panel.querySelector('.service-icon-badge');
              const line = panel.querySelector('.service-line');

              if (content) {
                gsap.set(content, {
                  opacity: inProgress,
                  y: (1 - inProgress) * 40,
                });
              }
              if (videoWrap) {
                gsap.set(videoWrap, {
                  opacity: inProgress,
                  scale: 0.85 + inProgress * 0.15,
                  y: (1 - inProgress) * 30,
                });
              }
              if (number) {
                gsap.set(number, {
                  opacity: inProgress * 0.06,
                  scale: 0.9 + inProgress * 0.1,
                });
              }
              if (title) {
                gsap.set(title, {
                  opacity: inProgress,
                  y: (1 - inProgress) * 30,
                  filter: `blur(${(1 - inProgress) * 5}px)`,
                });
              }
              if (desc) {
                const delayedProgress = Math.max(
                  0,
                  (inProgress - 0.25) * 1.33
                );
                gsap.set(desc, {
                  opacity: delayedProgress,
                  y: (1 - delayedProgress) * 20,
                });
              }
              if (tagline) {
                const delayedProgress = Math.max(
                  0,
                  (inProgress - 0.4) * 1.67
                );
                gsap.set(tagline, {
                  opacity: delayedProgress * 0.7,
                  y: (1 - delayedProgress) * 15,
                });
              }
              if (icon) {
                gsap.set(icon, {
                  opacity: inProgress,
                  scale: 0.5 + inProgress * 0.5,
                  rotation: (1 - inProgress) * -10,
                });
              }
              if (line) {
                gsap.set(line, { scaleX: inProgress });
              }
            } else if (i < currentIndex) {
              // Past panels
              gsap.set(panel, {
                opacity: 0,
                scale: 0.92,
                y: -50,
                zIndex: 1,
                pointerEvents: 'none',
              });
            } else {
              // Future panels
              gsap.set(panel, {
                opacity: 0,
                scale: 0.95,
                y: 50,
                zIndex: 1,
                pointerEvents: 'none',
              });
            }
          });

          // Update the progress bar
          const progressBar = document.querySelector(
            '.services-progress-fill'
          );
          if (progressBar) {
            gsap.set(progressBar, { scaleY: progress });
          }

          // Update active dot
          const dots = document.querySelectorAll('.service-dot');
          dots.forEach((dot, i) => {
            if (i === currentIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });

          // Update counter
          const counter = document.querySelector(
            '.services-counter-current'
          );
          if (counter) {
            counter.textContent = String(currentIndex + 1).padStart(
              2,
              '0'
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen bg-dark overflow-hidden"
    >
      {/* Background subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Left side — progress indicator */}
      <div className="absolute left-4 sm:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
        {/* Counter */}
        <div className="text-xs font-mono tracking-wider text-gray-500 mb-2">
          <span className="services-counter-current text-white font-semibold">
            01
          </span>
          <span className="mx-1">/</span>
          <span>{String(services.length).padStart(2, '0')}</span>
        </div>

        {/* Progress track */}
        <div className="relative w-px h-24 sm:h-32 bg-white/10 rounded-full overflow-hidden">
          <div className="services-progress-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary to-accent origin-top scale-y-0 rounded-full" />
        </div>

        {/* Dots */}
        <div className="flex flex-col gap-1.5 sm:gap-2 mt-2">
          {services.map((_, i) => (
            <div
              key={i}
              className={`service-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === 0
                ? 'active bg-primary scale-125 shadow-[0_0_8px_rgba(0,212,170,0.6)]'
                : 'bg-white/20'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Section header — centered top */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
          Our Services
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full" />
      </div>

      {/* Panels container */}
      <div
        ref={panelContainerRef}
        className="relative w-full h-full flex items-center"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="service-panel absolute inset-0 flex items-center justify-center"
              style={{
                opacity: index === 0 ? 1 : 0,
                zIndex: index === 0 ? 10 : 1,
              }}
            >
              {/* Large background number */}
              <div
                className="service-number-bg absolute pointer-events-none select-none font-display font-black"
                style={{
                  fontSize: 'clamp(10rem, 25vw, 22rem)',
                  color: service.accentColor,
                  opacity: 0.06,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  lineHeight: 0.85,
                }}
              >
                {service.number}
              </div>

              {/* Main content — centered layout */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 pt-16 sm:pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Left side — text content (centered on mobile) */}
                  <div className="service-content text-center lg:text-left order-2 lg:order-1">
                    {/* Icon badge */}
                    <div className="service-icon-badge inline-flex mb-4 sm:mb-5">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        style={{
                          boxShadow: `0 8px 32px ${service.accentColor}30`,
                        }}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>

                    {/* Accent line */}
                    <div
                      className="service-line w-12 sm:w-16 h-[2px] mb-4 sm:mb-5 origin-left mx-auto lg:mx-0"
                      style={{ background: service.accentColor }}
                    />

                    {/* Title — much bigger and bolder */}
                    <h3 className="service-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-bold text-white mb-3 sm:mb-5 leading-[1.1]">
                      {service.title}
                    </h3>

                    {/* Description — bigger and more readable */}
                    <p className="service-desc text-base sm:text-lg md:text-xl text-gray-300/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {service.description}
                    </p>

                    {/* Technology tagline */}
                    <p className="service-tagline text-xs sm:text-sm mt-4 sm:mt-6 uppercase tracking-[0.15em] font-medium max-w-lg mx-auto lg:mx-0"
                      style={{ color: `${service.accentColor}90` }}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  {/* Right side — Remotion Video */}
                  <div className="service-video-wrap order-1 lg:order-2 flex items-center justify-center">
                    <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[480px]">
                      <ServiceVideoPlayer
                        serviceName={service.title}
                        isActive={activeIndex === index}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom — scroll hint */}
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-600 font-medium">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default ServicesSection;
