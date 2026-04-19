import { useEffect } from 'react';

export default function SchemaMarkup() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.nexlab.solutions/#organization",
        "name": "NexLab Solutions",
        "url": "https://www.nexlab.solutions",
        "logo": "https://www.nexlab.solutions/logo.png",
        "image": "https://www.nexlab.solutions/og-image.png",
        "description": "NexLab Solutions is a full-service digital agency specializing in website design, mobile app development, and AI automation solutions including WhatsApp automation and AI receptionists for businesses.",
        "foundingDate": "2023",
        "areaServed": [
            {
                "@type": "Country",
                "name": "Canada"
            },
            {
                "@type": "Country",
                "name": "United States"
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Agency Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Website Design",
                        "description": "Fast, stunning websites that show up on Google and turn visitors into paying customers. No templates — designed specifically for your business."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "Sleek, high-performance mobile apps that keep your customers coming back. Available on iPhone and Android for varying business use-cases."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom AI Solutions",
                        "description": "Custom tools that handle invoicing, scheduling, inventory, and customer follow-ups."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "WhatsApp Automation",
                        "description": "Smart auto-reply systems that handle inquiries, take bookings, and follow up with leads 24/7."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Receptionist",
                        "description": "Virtual receptionists that answer calls, book appointments, and capture leads seamlessly and realistically 24/7."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Google & AI Search SEO",
                        "description": "Optimizing digital presence so your business is the top recommendation on both traditional search engines and modern AI platforms."
                    }
                }
            ]
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@nexlab.solutions",
            "availableLanguage": "English",
            "areaServed": ["CA", "US"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/nexlab-solutions",
            "https://www.instagram.com/nexlabsolutions",
            "https://twitter.com/nexlabsolutions"
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How can AI actually get me more leads and revenue?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI doesn't sleep. While you're closed or busy, our AI systems instantly reply to inquiries across WhatsApp, SMS, or website chat. By engaging leads within seconds instead of hours, answering their questions, and booking them directly into your calendar, we capture revenue that would have otherwise gone to your competitors."
                }
            },
            {
                "@type": "Question",
                "name": "Will an AI receptionist sound like a robotic machine?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Our AI voice agents use cutting-edge natural language processing. They sound incredibly human, handle interruptions gracefully, understand accents, and can answer complex questions about your business, pricing, and services. Your customers won't even realize they're talking to AI."
                }
            },
            {
                "@type": "Question",
                "name": "What is Google & AI Search SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Traditional SEO just focuses on Google Search. But today, customers ask ChatGPT, Gemini, and Siri for recommendations (like 'find the best lawyer near me'). We optimize your digital presence so your business is the top recommendation on both traditional search engines AND modern AI platforms."
                }
            },
            {
                "@type": "Question",
                "name": "Can you build an app or a website that integrates these AI tools?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We build high-converting websites and scalable mobile apps with these AI automations built right in. Your website becomes a 24/7 sales machine instead of just a digital brochure."
                }
            },
            {
                "@type": "Question",
                "name": "How fast will I see a return on my investment?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most businesses see an immediate ROI the day the automation goes live. If our AI receptionist saves you the cost of hiring a full-time staff member, or our WhatsApp bot books just 3 extra high-ticket clients a month who would have otherwise been ignored, the system pays for itself almost instantly."
                }
            },
            {
                "@type": "Question",
                "name": "I already have a website. Can you just add the AI to it?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Whether we build your site from scratch or integrate with your existing setup, our AI voice agents, WhatsApp automation, and smart scheduling tools can easily plug into your current workflow to turbocharge your operations."
                }
            }
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NexLab Solutions",
        "url": "https://www.nexlab.solutions",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.nexlab.solutions/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    useEffect(() => {
        // Inject all schema markup scripts
        const schemas = [
            organizationSchema,
            faqSchema,
            websiteSchema
        ];

        const scriptElements: HTMLScriptElement[] = [];

        schemas.forEach((schema) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
            scriptElements.push(script);
        });

        // Cleanup function
        return () => {
            scriptElements.forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
        };
    }, []);

    return null;
}
