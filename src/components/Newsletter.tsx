'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import ScrollNumber from './ScrollNumber';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-14 md:py-20 bg-[#050505] text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />

          <div className="relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-xl">
              <Mail size={32} className="text-comedy-yellow w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="flex -space-x-2">
                {['F', 'M', 'A', 'L'].map((letter) => (
                  <div
                    key={letter}
                    className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-comedy-yellow/30 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                <ScrollNumber target={847} /> persone hanno già riso gratis
              </span>
            </motion.div>

            <h2 className="font-headline uppercase leading-none mb-6" style={{ fontSize: 'var(--text-display)' }}>
              Entra nel <br />
              <span className="text-comedy-yellow">Vip Club</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl font-medium mb-10 md:mb-12 max-w-2xl mx-auto text-gray-400 leading-relaxed">
              Iscriviti alla newsletter per ricevere codici presale, contenuti esclusivi e aggiornamenti.{' '}
              <span className="italic font-normal text-gray-500 block mt-2">(Tranquillo, non so nemmeno come si fa a mandare lo spam. Al massimo ti chiedo dei soldi in prestito).</span>
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <CheckCircle size={48} className="text-comedy-yellow" />
                  <p className="text-xl font-bold text-white">Grazie! Ti scriviamo presto.</p>
                  <p className="text-sm text-gray-500">(Prima o poi. Siamo comici, non robot).</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="La tua email (quella vera, dai)"
                      className="flex-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 text-lg font-medium text-white placeholder:text-gray-600 focus:outline-none focus:border-comedy-yellow/50 focus:bg-black/80 transition-all shadow-inner"
                      required
                    />
                    <button
                      type="submit"
                      className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-wider hover:bg-comedy-yellow transition-all shadow-xl overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Iscriviti
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-comedy-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                  </form>
                  <p className="text-xs font-bold uppercase tracking-widest mt-8 text-gray-600">
                    * Cliccando "Iscriviti" accetti di ridere alle mie battute.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
