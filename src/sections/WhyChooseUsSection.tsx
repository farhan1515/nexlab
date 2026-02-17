import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MotionCards, { MotionCardContent } from '../components/ui/motioncards';
import { CheckCircle2, Terminal, Banknote, Lock, Cpu, Rocket, BarChart3 } from 'lucide-react';

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
                        Serious Code for <span className="gradient-text">Serious Business</span>
                    </h2>
                    <p className="why-title text-lg text-gray-400">
                        Most agencies deliver bloated code and ghost you after launch. We build lean, profitable systems and stick around to watch them grow.
                    </p>
                </div>

                {/* Motion Cards Component */}
                <div className="motion-cards-container w-full max-w-2xl mx-auto">
                    <MotionCards interval={2500}>
                        {/* 1. Direct Access */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <Terminal className="w-8 h-8 text-primary shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Direct Engineer Access</h4>
                                <p className="text-sm opacity-90">Talk to the person writing your code, not a project manager.</p>
                            </div>
                        </MotionCardContent>

                        {/* 2. Revenue Focused */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <Banknote className="w-8 h-8 text-green-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Revenue Focused</h4>
                                <p className="text-sm opacity-90">If it doesn't make money or save time, we don't build it.</p>
                            </div>
                        </MotionCardContent>

                        {/* 3. We Own the Outcome */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <CheckCircle2 className="w-8 h-8 text-blue-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">We Own the Outcome</h4>
                                <p className="text-sm opacity-90">We don't just ship and leave. We monitor performance 24/7 post-launch.</p>
                            </div>
                        </MotionCardContent>

                        {/* 4. Full Code Ownership */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <Lock className="w-8 h-8 text-amber-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Full Code Ownership</h4>
                                <p className="text-sm opacity-90">You own every line of code. No vendor lock-in, ever.</p>
                            </div>
                        </MotionCardContent>

                        {/* 5. Scalable Architecture */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <Cpu className="w-8 h-8 text-purple-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Scalable Architecture</h4>
                                <p className="text-sm opacity-90">Robust systems designed to grow with your business, handling increasing traffic effortlessly.</p>
                            </div>
                        </MotionCardContent>

                        {/* 6. Future Proof */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <Rocket className="w-8 h-8 text-pink-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Future-Proof Tech</h4>
                                <p className="text-sm opacity-90">Modern stacks that won't become legacy code next year.</p>
                            </div>
                        </MotionCardContent>

                        {/* 7. Data Driven */}
                        <MotionCardContent className="flex gap-4 p-6 items-center">
                            <BarChart3 className="w-8 h-8 text-cyan-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold mb-1">Data-Driven Design</h4>
                                <p className="text-sm opacity-90">We design based on real user data, not just pretty aesthetics.</p>
                            </div>
                        </MotionCardContent>
                    </MotionCards>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
