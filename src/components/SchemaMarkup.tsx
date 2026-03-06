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
        "description": "NexLab Solutions is a full-service digital agency in Windsor, Ontario, Canada specializing in web development, mobile app development, AI automation solutions including WhatsApp automation and AI calling, digital marketing, and brand design for businesses across Canada and the USA.",
        "foundingDate": "2023",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Windsor",
            "addressRegion": "Ontario",
            "addressCountry": "CA",
            "postalCode": "N9A"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 42.3149,
            "longitude": -83.0364
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Windsor",
                "containedIn": "Ontario, Canada"
            },
            {
                "@type": "State",
                "name": "Ontario"
            },
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
                        "name": "Web Development",
                        "description": "Custom website design and development for businesses in Windsor, Ontario and across Canada. We build fast, SEO-optimized, responsive websites using React, Next.js, and modern web technologies."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "iOS and Android mobile application development for Canadian and US businesses. Native and cross-platform apps built with React Native and Flutter."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Solutions",
                        "description": "Artificial intelligence solutions including WhatsApp automation, AI calling agents, AI chatbots, and business process automation for companies in Windsor, Ontario and across North America."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "WhatsApp Automation",
                        "description": "Custom WhatsApp Business automation solutions that handle customer inquiries, bookings, and sales 24/7 using AI-powered chatbots for businesses in Canada and the USA."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Calling",
                        "description": "AI-powered voice calling agents that can handle inbound and outbound calls, schedule appointments, and qualify leads automatically for businesses across Canada."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Digital Marketing",
                        "description": "Social media marketing, SEO, email campaigns, and paid advertising for businesses in Windsor, Ontario and across Canada."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Brand Design",
                        "description": "Logo design, brand identity, visual design, and marketing collateral creation for businesses in Windsor and across Canada."
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

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "NexLab Solutions",
        "image": "https://www.nexlab.solutions/og-image.png",
        "@id": "https://www.nexlab.solutions/#localbusiness",
        "url": "https://www.nexlab.solutions",
        "telephone": "+1-519-xxx-xxxx",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Windsor",
            "addressRegion": "ON",
            "addressCountry": "CA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 42.3149,
            "longitude": -83.0364
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "servesCuisine": null,
        "hasMap": "https://maps.google.com/?q=Windsor+Ontario+Canada"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What web development services does NexLab Solutions offer in Windsor, Ontario?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexLab Solutions offers custom website design and development, e-commerce solutions, responsive web applications, CMS development, and SEO-optimized websites for businesses in Windsor, Ontario and across Canada. We use modern technologies including React, Next.js, and Node.js."
                }
            },
            {
                "@type": "Question",
                "name": "Does NexLab Solutions build mobile apps in Canada?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, NexLab Solutions develops iOS and Android mobile applications for businesses across Canada and the USA. We specialize in both native app development and cross-platform solutions using React Native and Flutter."
                }
            },
            {
                "@type": "Question",
                "name": "What AI solutions does NexLab Solutions provide?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexLab Solutions provides comprehensive AI solutions including WhatsApp automation (AI chatbots for WhatsApp Business), AI calling agents for automated inbound and outbound calls, AI-powered customer service chatbots, and custom business process automation using artificial intelligence."
                }
            },
            {
                "@type": "Question",
                "name": "Can NexLab Solutions automate my business's WhatsApp communications?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. NexLab Solutions builds custom WhatsApp Business automation systems that use AI to handle customer inquiries, send automated responses, manage bookings, process orders, and qualify leads 24/7 — even while you sleep. We serve businesses across Windsor, Ontario and all of Canada."
                }
            },
            {
                "@type": "Question",
                "name": "What is AI calling and does NexLab Solutions offer it in Canada?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI calling refers to AI-powered voice agents that can make and receive phone calls on behalf of your business. NexLab Solutions builds AI calling systems that can handle appointment scheduling, lead qualification, customer follow-ups, and inbound support calls for Canadian businesses — completely automated."
                }
            },
            {
                "@type": "Question",
                "name": "Which areas does NexLab Solutions serve?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexLab Solutions is headquartered in Windsor, Ontario, Canada and serves clients across Windsor-Essex, Ontario, all of Canada, and the United States. We work remotely with clients worldwide and have a strong focus on supporting local Windsor and Canadian businesses."
                }
            },
            {
                "@type": "Question",
                "name": "How much does it cost to build a website in Windsor, Ontario?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Website development costs vary based on complexity and requirements. NexLab Solutions offers flexible packages starting from simple business websites to full e-commerce platforms and custom web applications. Contact us for a free consultation and custom quote tailored to your business needs."
                }
            },
            {
                "@type": "Question",
                "name": "Why should I choose a local Windsor agency like NexLab Solutions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Choosing NexLab Solutions means working with a team that understands the Windsor and Canadian business landscape, operates in your time zone, and is invested in your local community's success. We combine enterprise-level technical expertise with the personal attention you'd expect from a local agency partner."
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
            localBusinessSchema,
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
