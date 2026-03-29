'use client'

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { navigateWithTransition } from '@/hooks/useViewTransition';

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconYoutube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#050505" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Videoflix', href: '#videoflix' },
  { name: 'Spettacoli', href: '#spettacoli' },
  { name: 'Fatti gli affari miei', href: '#about' },
  { name: 'Contattami', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // CSS transition on nav — no motion wrapper needed here
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}
    >
      <div className={`max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex items-center transition-all duration-500 ${isScrolled ? 'justify-center' : 'justify-between'}`}>

        {/* Logo — CSS opacity transition */}
        <a
          href="#home"
          className={`font-display text-3xl md:text-4xl tracking-wider text-white uppercase flex items-center gap-1 group transition-all duration-400 ${
            isScrolled ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
          }`}
        >
          Vincenzo<span className="text-transparent bg-clip-text bg-gradient-to-r from-comedy-yellow to-yellow-600 group-hover:from-yellow-400 group-hover:to-comedy-yellow transition-all duration-500">Olivieri</span>
        </a>

        {/* Desktop Nav pill */}
        <div
          className={`hidden lg:flex items-center gap-6 xl:gap-8 backdrop-blur-xl border border-white/10 py-3 rounded-full shadow-lg transition-all duration-500 ${
            isScrolled ? 'bg-[#050505]/90 shadow-black/50 px-8' : 'bg-[#050505]/60 px-6'
          }`}
        >
          {/* Monogram — CSS transition */}
          <span
            className={`font-headline text-comedy-yellow text-base tracking-widest overflow-hidden transition-all duration-300 ${
              isScrolled ? 'opacity-100 max-w-[4rem]' : 'opacity-0 max-w-0'
            }`}
          >
            VO
          </span>

          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition(() => {
                  const el = document.querySelector(link.href);
                  if (!el) return;
                  const y = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                });
              }}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-comedy-yellow transition-all duration-300 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Socials */}
        <div
          className={`hidden lg:flex items-center gap-4 transition-all duration-400 ${
            isScrolled ? 'opacity-0 pointer-events-none absolute right-12' : 'opacity-100'
          }`}
        >
          <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300">
            <IconFacebook size={16} />
          </a>
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300">
            <IconInstagram size={16} />
          </a>
          <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow hover:border-comedy-yellow/50 transition-all duration-300">
            <IconYoutube size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden ml-auto w-12 h-12 rounded-full bg-zinc-900/50 border border-white/10 flex items-center justify-center text-white hover:text-comedy-yellow transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 72px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed left-0 right-0 top-[72px] bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 pt-10 pb-6 flex flex-col h-full">
              <div className="flex flex-col gap-6 overflow-y-auto flex-1 min-h-0">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      navigateWithTransition(() => {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      });
                    }}
                    className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-gray-400 hover:text-comedy-yellow transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-col gap-6 pt-6 pb-8 shrink-0"
              >
                <p className="text-sm text-gray-500 italic font-medium">* Il menu del ristorante è a parte.</p>
                <div className="flex items-center gap-6">
                  <a href="#" aria-label="Facebook" className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow transition-colors"><IconFacebook size={24} /></a>
                  <a href="#" aria-label="Instagram" className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow transition-colors"><IconInstagram size={24} /></a>
                  <a href="#" aria-label="YouTube" className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-comedy-yellow transition-colors"><IconYoutube size={24} /></a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
