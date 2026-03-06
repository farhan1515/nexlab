'use client';
import { useState } from 'react';

const faqs = [
    {
        q: "What web development services does NexLab Solutions offer in Windsor, Ontario?",
        a: "NexLab Solutions offers custom website design and development, e-commerce solutions, responsive web applications, CMS development, and SEO-optimized websites for businesses in Windsor, Ontario and across Canada. We use modern technologies including React, Next.js, and Node.js."
    },
    {
        q: "Does NexLab Solutions build mobile apps in Canada?",
        a: "Yes, NexLab Solutions develops iOS and Android mobile applications for businesses across Canada and the USA. We specialize in both native and cross-platform solutions using React Native and Flutter."
    },
    {
        q: "What AI solutions does NexLab Solutions provide?",
        a: "We provide WhatsApp automation (AI chatbots for WhatsApp Business), AI calling agents for automated calls, AI-powered customer service chatbots, and custom business process automation using artificial intelligence."
    },
    {
        q: "Can NexLab automate my business's WhatsApp communications?",
        a: "Yes. We build custom WhatsApp Business automation systems that use AI to handle customer inquiries, send automated responses, manage bookings, process orders, and qualify leads 24/7 — for businesses across Windsor, Ontario and all of Canada."
    },
    {
        q: "What is AI calling and does NexLab offer it in Canada?",
        a: "AI calling refers to AI-powered voice agents that make and receive phone calls on behalf of your business. NexLab builds AI calling systems that handle appointment scheduling, lead qualification, customer follow-ups, and inbound support — completely automated."
    },
    {
        q: "Which areas does NexLab Solutions serve?",
        a: "We're headquartered in Windsor, Ontario, Canada and serve clients across Windsor-Essex, all of Ontario, all of Canada, and the United States."
    },
    {
        q: "How much does it cost to build a website in Windsor, Ontario?",
        a: "Costs vary by complexity. We offer flexible packages from simple business websites to full e-commerce platforms. Contact us for a free consultation and custom quote."
    }
];

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 bg-slate-50" id="faq">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-semibold text-sm tracking-widest uppercase">
                        Got Questions?
                    </span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Everything you need to know about NexLab Solutions and our services
                        in Windsor, Ontario and across Canada.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden 
                         shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full text-left px-6 py-5 flex justify-between 
                           items-center gap-4"
                                aria-expanded={open === i}
                            >
                                <span className="font-semibold text-slate-900 text-lg">
                                    {faq.q}
                                </span>
                                <span className={`text-indigo-600 text-2xl font-light flex-shrink-0 
                                  transition-transform duration-200 
                                  ${open === i ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            {open === i && (
                                <div className="px-6 pb-5 text-slate-600 text-base leading-relaxed 
                                border-t border-slate-100 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
