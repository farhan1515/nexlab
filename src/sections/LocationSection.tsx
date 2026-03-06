export default function LocationSection() {
    return (
        <section className="py-16 px-6 bg-white" aria-label="Service Areas">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Serving Windsor, Ontario & All of Canada
                </h2>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-8">
                    NexLab Solutions is Windsor's premier digital agency, delivering
                    world-class web development, mobile app development, and AI solutions
                    to businesses in Windsor-Essex, Ontario, and across Canada and the USA.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        "Windsor, ON", "Essex County", "Leamington", "Chatham-Kent",
                        "London, ON", "Toronto, ON", "Ontario", "Canada", "USA"
                    ].map(loc => (
                        <span
                            key={loc}
                            className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full 
                         text-sm font-medium border border-indigo-100"
                        >
                            {loc}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
