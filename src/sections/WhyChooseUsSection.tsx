import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MotionCards, { MotionCardContent } from '../components/ui/motioncards';
import { MapPin, Banknote, Rocket, Phone, Lock, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo('.why-title',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'expo.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.why-header',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo('.motion-cards-container',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.motion-cards-container',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="why-us" ref={sectionRef} className="relative pt-12 pb-24 bg-dark overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="why-header text-center max-w-3xl mx-auto mb-16">
                    <span className="why-title inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
                        The NexLab Advantage
                    </span>
                    <h2 className="why-title text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Why Businesses <span className="gradient-text">Trust Us</span>
                    </h2>
                    <p className="why-title text-lg text-gray-400">
                        We don't just build things and disappear. We're your dedicated tech partner, invested directly in the success and growth of your business.
                    </p>
                </div>

                {/* Motion Cards Component */}
                <div className="motion-cards-container w-full max-w-2xl mx-auto">
                    <MotionCards interval={2500}>
                        {/* 1. Local & Accessible */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">Local & Accessible</h4>
                                <p className="text-xs sm:text-sm opacity-90">Meet us for coffee, call us anytime. No overseas outsourcing, no timezone headaches.</p>
                            </div>
                        </MotionCardContent>

                        {/* 2. Built to Make You Money */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <Banknote className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">Built to Make You Money</h4>
                                <p className="text-xs sm:text-sm opacity-90">Every dollar you spend with us should bring back more. We measure success by your revenue.</p>
                            </div>
                        </MotionCardContent>

                        {/* 3. Fast Turnaround */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">Fast Turnaround</h4>
                                <p className="text-xs sm:text-sm opacity-90">Most projects are live in 2-3 weeks, not months. Your business can't wait — and neither can we.</p>
                            </div>
                        </MotionCardContent>

                        {/* 4. Support After Launch */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">Support After Launch</h4>
                                <p className="text-xs sm:text-sm opacity-90">We don't disappear after launch day. Questions at 10pm? Text us. Something breaks? We fix it.</p>
                            </div>
                        </MotionCardContent>

                        {/* 5. You Own Everything */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">You Own Everything</h4>
                                <p className="text-xs sm:text-sm opacity-90">Your digital assets, your content, your data. If you ever want to leave, take it all with you.</p>
                            </div>
                        </MotionCardContent>

                        {/* 6. We Show You Results */}
                        <MotionCardContent className="flex gap-3 sm:gap-4 p-4 sm:p-6 items-center">
                            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 shrink-0" />
                            <div>
                                <h4 className="text-base sm:text-lg font-bold mb-1">We Show You Results</h4>
                                <p className="text-xs sm:text-sm opacity-90">Clear monthly reports showing exactly how many people visited, called, or bought. No guessing.</p>
                            </div>
                        </MotionCardContent>
                    </MotionCards>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
