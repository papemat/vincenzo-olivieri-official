import { Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white py-16 md:py-24 lg:py-32 border-t border-white/10 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-comedy-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        
        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <a href="#home" className="font-display text-4xl md:text-5xl tracking-wider text-white uppercase flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-2 group">
            Vincenzo<span className="text-transparent bg-clip-text bg-gradient-to-r from-comedy-yellow to-yellow-600 group-hover:from-yellow-400 group-hover:to-comedy-yellow transition-all duration-500">Olivieri</span>
          </a>
          <div className="text-sm text-gray-500 font-medium max-w-sm">
            <p className="mb-2 font-bold text-gray-400 uppercase tracking-widest text-xs">Se non ti ho fatto ridere, richiedi il rimborso.</p>
            <p className="text-xs italic text-gray-600">(Scherzo. Non si può.)</p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-sm text-gray-600 font-medium">
              © {new Date().getFullYear()} Vincenzo Olivieri. Tutti i diritti riservati.
            </p>
            <p className="text-xs text-zinc-800 select-none font-mono">
              psst... digita "cammello" o usa il tasto destro.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-8">
          <div className="flex items-center gap-4">
            <a href="#" className="group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <Facebook size={20} className="relative z-10" />
            </a>
            <a href="#" className="group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <Instagram size={20} className="relative z-10" />
            </a>
            <a href="#" className="group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <Youtube size={20} className="relative z-10" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold uppercase tracking-wider hover:border-comedy-yellow/50 transition-all overflow-hidden"
            aria-label="Torna in cima"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Torna Su <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-comedy-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}
