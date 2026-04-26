import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRight, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main className="pt-20 min-h-[calc(100vh-5rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* Large 404 */}
          <h1 className="text-[8rem] sm:text-[10rem] font-display font-bold leading-none gradient-text mb-2">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 group w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5" />
              Go Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/score"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-dark hover:border-white transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Free Business Score
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
