'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        q: "How can AI actually get me more leads and revenue?",
        a: "AI doesn't sleep. While you're closed or busy, our AI systems instantly reply to inquiries across WhatsApp, SMS, or website chat. By engaging leads within seconds instead of hours, answering their questions, and booking them directly into your calendar, we capture revenue that would have otherwise gone to your competitors."
    },
    {
        q: "Will an AI receptionist sound like a robotic machine?",
        a: "No. Our AI voice agents use cutting-edge natural language processing. They sound incredibly human, handle interruptions gracefully, understand accents, and can answer complex questions about your business, pricing, and services. Your customers won't even realize they're talking to AI."
    },
    {
        q: "What is Google & AI Search SEO?",
        a: "Traditional SEO just focuses on Google Search. But today, customers ask ChatGPT, Gemini, and Siri for recommendations. We optimize your digital presence so your business is the top recommendation on both traditional search engines AND modern AI platforms."
    },
    {
        q: "Can you build an app or website with AI tools built in?",
        a: "Absolutely. We build high-converting websites and scalable mobile apps with these AI automations built right in. Your website becomes a 24/7 sales machine instead of just a digital brochure."
    },
    {
        q: "How fast will I see a return on my investment?",
        a: "Most businesses see an immediate ROI the day the automation goes live. If our AI receptionist saves you the cost of hiring a full-time staff member, or our WhatsApp bot books just 3 extra high-ticket clients a month, the system pays for itself almost instantly."
    },
    {
        q: "Can you add AI features to my existing website?",
        a: "Yes. Whether we build your site from scratch or integrate with your existing setup, our AI voice agents, WhatsApp automation, and smart scheduling tools can easily plug into your current workflow to turbocharge your operations."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-heading',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: 'expo.out',
                    scrollTrigger: { trigger: '.faq-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
                }
            );

            gsap.fromTo('.faq-item',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'expo.out',
                    scrollTrigger: { trigger: '.faq-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split into 2 columns
    const leftIndices = faqs.map((_, i) => i).filter(i => i % 2 === 0);
    const rightIndices = faqs.map((_, i) => i).filter(i => i % 2 !== 0);

    const FAQItem = ({ index }: { index: number }) => {
        const faq = faqs[index];
        const isOpen = openIndex === index;
        const num = String(index + 1).padStart(2, '0');

        return (
            <div
                className="faq-item cursor-pointer"
                onClick={() => toggle(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(index); } }}
                style={{
                    background: isOpen
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(245,250,248,0.97) 100%)'
                        : 'rgba(255,255,255,0.95)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isOpen
                        ? '0 4px 24px rgba(0, 212, 170, 0.12), 0 1px 4px rgba(0,0,0,0.06)'
                        : '0 1px 4px rgba(0,0,0,0.04)',
                    border: isOpen
                        ? '1px solid rgba(0, 212, 170, 0.2)'
                        : '1px solid transparent',
                }}
            >
                {/* Question Row */}
                <div
                    className="flex items-center justify-between gap-3"
                    style={{ padding: '18px 22px' }}
                >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span
                            className="font-display"
                            style={{
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                color: '#00D4AA',
                                flexShrink: 0,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {num}
                        </span>
                        <span
                            className="font-body"
                            style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: '#0f172a',
                                lineHeight: 1.45,
                            }}
                        >
                            {faq.q}
                        </span>
                    </div>
                    <span
                        style={{
                            flexShrink: 0,
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isOpen ? 'rgba(0, 212, 170, 0.1)' : 'rgba(0,0,0,0.04)',
                            color: isOpen ? '#00D4AA' : '#64748b',
                            transition: 'all 0.25s ease',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </span>
                </div>

                {/* Answer - animated expand */}
                <div
                    ref={(el) => { answerRefs.current[index] = el; }}
                    style={{
                        maxHeight: isOpen ? '300px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                    }}
                >
                    <div
                        style={{
                            padding: '0 22px 18px 22px',
                            marginLeft: '36px',
                        }}
                    >
                        <div
                            style={{
                                borderTop: '1px solid #e2e8f0',
                                paddingTop: '14px',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.925rem',
                                    fontWeight: 400,
                                    color: '#334155',
                                    lineHeight: 1.75,
                                    letterSpacing: '0.01em',
                                    margin: 0,
                                }}
                            >
                                {faq.a}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: '#0a1628' }}
        >
            {/* Subtle Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="faq-heading text-center mb-14">
                    <h2
                        className="font-display"
                        style={{
                            fontSize: 'clamp(1.85rem, 4.5vw, 3rem)',
                            fontWeight: 800,
                            color: '#ffffff',
                            marginBottom: '14px',
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Frequently Asked{' '}
                        <span className="gradient-text">Questions</span>
                    </h2>
                    <p
                        className="font-body"
                        style={{
                            fontSize: '1.05rem',
                            color: '#8899aa',
                            maxWidth: '480px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Learn how our digital and AI automation solutions drive real revenue.
                    </p>
                </div>

                {/* FAQ Grid — Single dark container */}
                <div
                    className="faq-grid"
                    style={{
                        background: 'linear-gradient(160deg, #141c2e 0%, #111827 40%, #151d2f 100%)',
                        borderRadius: '24px',
                        padding: 'clamp(16px, 3.5vw, 32px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                            gap: '12px',
                        }}
                    >
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {leftIndices.map((idx) => (
                                <FAQItem key={idx} index={idx} />
                            ))}
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {rightIndices.map((idx) => (
                                <FAQItem key={idx} index={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
