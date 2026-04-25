import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/nexlab.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-logo',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.6, ease: 'expo.out' }
      );

      gsap.fromTo('.nav-link',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo('.nav-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      // Navigate to homepage with hash
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-dark/90 backdrop-blur-xl border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="nav-logo flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                window.location.href = '/';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img src={logo} alt="NexLab" className="w-18 h-16 object-contain group-hover:drop-shadow-glow transition-all duration-300" />
            <span className="text-2xl font-display font-bold text-white leading-none">
              Nex<span className="text-primary">Lab</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="nav-link relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>


          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="nav-cta inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:scale-105 hover:shadow-glow hover:shadow-primary/50 transition-all duration-300 group"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="block text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl mt-4"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
