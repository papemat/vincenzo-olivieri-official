'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) setSubmitted(true);
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#050505]/95 to-zinc-900/50 z-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-comedy-yellow/20 to-transparent z-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-comedy-yellow/5 rounded-full blur-[150px] z-10 pointer-events-none" />
        <img
          src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=2070"
          alt="Backstage"
          className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Contattami</span>
            </div>
            
            <h2
              className="font-headline uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'var(--text-display)' }}
            >
              Lavoriamo<br />
              <span className="text-comedy-yellow">Insieme</span>
            </h2>
            
            <p className="text-gray-400 font-medium text-lg md:text-xl mb-12 max-w-md leading-relaxed md:leading-loose">
              Per informazioni su spettacoli, eventi privati, collaborazioni o interviste, non esitare a contattarmi. <br/><span className="text-sm italic opacity-70 mt-2 block">(Ti prego, non chiamarmi alle 3 di notte per chiedermi se il cammello sta bene. E se vuoi offrirmi una cena, accetto solo pesce).</span>
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-comedy-yellow group-hover:border-comedy-yellow/30 transition-all shrink-0">
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 sm:mb-2">Email</h4>
                  <a href="mailto:info@vincenzolivieri.it" className="text-lg sm:text-xl font-medium text-gray-300 group-hover:text-white transition-colors break-all">
                    info@vincenzolivieri.it
                  </a>
                </div>
              </div>
              
              <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-comedy-yellow group-hover:border-comedy-yellow/30 transition-all shrink-0">
                  <Phone size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 sm:mb-2">Management</h4>
                  <a href="tel:+390000000000" className="text-lg sm:text-xl font-medium text-gray-300 group-hover:text-white transition-colors">
                    +39 000 000 0000
                  </a>
                </div>
              </div>

              <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-comedy-yellow group-hover:border-comedy-yellow/30 transition-all shrink-0">
                  <MapPin size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 sm:mb-2">Sede</h4>
                  <p className="text-lg sm:text-xl font-medium text-gray-300 group-hover:text-white transition-colors">
                    Pescara, Abruzzo, Italia
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-900/40 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl self-start"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-comedy-yellow/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-800/50 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 flex flex-col items-center gap-4 py-12 text-center"
                >
                  <CheckCircle size={56} className="text-comedy-yellow" />
                  <p className="text-xl font-bold text-white">Grazie per il messaggio!</p>
                  <p className="text-gray-400">Ti ricontatteremo presto.<br /><span className="text-sm italic opacity-70">(Probabilmente dopo il caffè).</span></p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="relative z-10 space-y-4"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Nome</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-comedy-yellow/50 focus:bg-black/60 transition-all"
                        placeholder="Il tuo nome"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-comedy-yellow/50 focus:bg-black/60 transition-all"
                        placeholder="la.tua@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Oggetto</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-comedy-yellow/50 focus:bg-black/60 transition-all"
                      placeholder="Di cosa vuoi parlare?"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Messaggio</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-comedy-yellow/50 focus:bg-black/60 transition-all resize-none"
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-wider hover:bg-comedy-yellow transition-all mt-2 overflow-hidden shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Invia Messaggio
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-comedy-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
