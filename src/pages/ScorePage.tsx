import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BusinessHealthScoreTool from '../components/BusinessHealthScoreTool';

const ScorePage = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main className="pt-20">
        {/* Background pattern */}
        <div className="relative">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Background glows */}
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-start justify-center py-8 md:py-16">
            <BusinessHealthScoreTool />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScorePage;
