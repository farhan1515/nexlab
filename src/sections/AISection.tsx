export default function AISection() {
    return (
        <section
            className="py-20 px-6 bg-gradient-to-br from-slate-900 to-indigo-900"
            aria-label="AI Solutions Windsor Ontario"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-semibold text-sm tracking-widest uppercase">
                        The Future is Now
                    </span>
                    <h2 className="text-4xl font-bold text-white mt-3 mb-4">
                        AI Solutions for Canadian Businesses
                    </h2>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        We help businesses in Windsor, Ontario and across Canada automate
                        their operations with cutting-edge artificial intelligence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "WhatsApp Automation",
                            desc: "Let AI handle your WhatsApp Business 24/7. Respond to customers, book appointments, and qualify leads automatically.",
                            icon: "💬"
                        },
                        {
                            title: "AI Calling Agents",
                            desc: "AI-powered voice agents that make and receive calls, schedule appointments, and follow up with leads on your behalf.",
                            icon: "📞"
                        },
                        {
                            title: "AI Chatbots",
                            desc: "Custom AI chatbots for your website that understand your business, answer questions, and convert visitors into customers.",
                            icon: "🤖"
                        }
                    ].map(item => (
                        <div
                            key={item.title}
                            className="bg-white/10 backdrop-blur rounded-2xl p-8 
                         border border-white/10 hover:bg-white/15 transition-colors"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
