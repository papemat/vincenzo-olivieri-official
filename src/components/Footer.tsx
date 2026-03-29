'use client'

import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';

function IconFacebook() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#050505" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
    tl.fromTo('.footer-logo', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo('.footer-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.footer-social', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
      .fromTo('.footer-bottom', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-[#050505] text-white py-16 md:py-24 lg:py-32 border-t border-white/10 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-comedy-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <a href="#home" className="footer-logo font-display text-4xl md:text-5xl tracking-wider text-white uppercase flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-2 group">
            Vincenzo<span className="text-transparent bg-clip-text bg-gradient-to-r from-comedy-yellow to-yellow-600 group-hover:from-yellow-400 group-hover:to-comedy-yellow transition-all duration-500">Olivieri</span>
          </a>
          <div className="footer-tagline text-sm text-gray-500 font-medium max-w-sm">
            <p className="mb-2 font-bold text-gray-400 uppercase tracking-widest text-xs">Se non ti ho fatto ridere, richiedi il rimborso.</p>
            <p className="text-xs italic text-gray-600">(Scherzo. Non si può.)</p>
          </div>
          <div className="footer-bottom flex flex-col gap-1 mt-4">
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
            <a href="#" aria-label="Facebook" className="footer-social group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10"><IconFacebook /></span>
            </a>
            <a href="#" aria-label="Instagram" className="footer-social group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10"><IconInstagram /></span>
            </a>
            <a href="#" aria-label="YouTube" className="footer-social group relative w-12 h-12 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-comedy-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10"><IconYoutube /></span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-social group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold uppercase tracking-wider hover:border-comedy-yellow/50 transition-all overflow-hidden"
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
