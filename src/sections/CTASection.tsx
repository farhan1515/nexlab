import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Loader2, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'App Development',
  '3D Web Development',
  'Flyer Creation',
  'WhatsApp Automation',
  'AI Voice Calling Agent',
  'Custom AI Solutions',
];

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.cta-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cta-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo('.cta-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cta-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form card 3D entrance
      gsap.fromTo('.form-card',
        { rotateY: -30, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.form-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger
      gsap.fromTo('.form-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.form-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating shapes
      gsap.fromTo('.cta-shape',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.3,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS Configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Configuration Error: Missing EmailJS keys in .env file.');
      console.error('Missing EmailJS keys. make sure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY are set in your .env file.');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          service: formData.service,
          message: formData.message,
          to_name: 'NexLab Team', // Optional, depends on your template
        },
        publicKey
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent successfully! We will get back to you soon.');

      // Success animation
      setTimeout(() => {
        gsap.fromTo('.success-icon',
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );

        gsap.fromTo('.success-message',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'expo.out' }
        );
      }, 100);

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-amber/10 to-primary-dark/20" />

      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cta-shape absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-primary/20 blur-2xl cta-float-1" />
        <div className="cta-shape absolute top-[30%] right-[10%] w-40 h-40 rounded-full bg-accent-amber/20 blur-2xl cta-float-2" />
        <div className="cta-shape absolute bottom-[20%] left-[15%] w-24 h-24 rounded-full bg-primary-dark/20 blur-2xl cta-float-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="cta-content">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-300">Let's Connect</span>
            </div>

            <h2 className="cta-title text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <span className="gradient-text">Business?</span>
            </h2>

            <p className="cta-subtitle text-lg text-gray-300 mb-8 leading-relaxed">
              Let's discuss how NexLab can help you achieve your digital goals.
              Get a free consultation and quote today.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email us at</p>
                  <p className="text-white font-medium">hello@nexlab.solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call us at</p>
                  <p className="text-white font-medium">+1 5197912209</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Visit us at</p>
                  <p className="text-white font-medium">Windsor, ON, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="form-card perspective-1000">
            <div className="glass rounded-3xl p-8 md:p-10">
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-display font-bold text-white mb-6">
                    Get Your Free Quote
                  </h3>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`form-input ${focusedField === 'name' ? 'border-primary shadow-glow' : ''}`}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`form-input ${focusedField === 'email' ? 'border-primary shadow-glow' : ''}`}
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`form-input ${focusedField === 'phone' ? 'border-primary shadow-glow' : ''}`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Company */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={`form-input ${focusedField === 'company' ? 'border-primary shadow-glow' : ''}`}
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Service */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`form-input ${focusedField === 'service' ? 'border-primary shadow-glow' : ''}`}
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className={`form-input resize-none ${focusedField === 'message' ? 'border-primary shadow-glow' : ''}`}
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-field w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent-pink text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Request
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="success-icon w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-amber flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="success-message text-2xl font-display font-bold text-white mb-4">
                    Thank You!
                  </h3>
                  <p className="success-message text-gray-300">
                    We've received your request and will get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
