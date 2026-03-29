'use client'

import { motion } from 'motion/react';
import { Star, Award, Mic2 } from 'lucide-react';
import ScrollNumber from './ScrollNumber';

const STATS = [
  { label: 'Spettacoli', target: 1000, suffix: '+', icon: Star },
  { label: 'Anni di Carriera', target: 30, suffix: '+', icon: Award },
  { label: 'Caffè Bevuti', target: 10, suffix: 'k+', icon: Mic2 },
];

export default function About() {
  return (
    <section id="about" className="py-10 md:py-16 bg-[#050505] text-white relative overflow-hidden section-fade">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:min-h-[680px]">

          {/* Left: text column — yellow-wash bg */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col justify-center p-6 md:p-12 lg:p-14 rounded-[2rem] lg:rounded-[2.5rem] lg:rounded-r-none"
            style={{ background: 'var(--color-yellow-wash-6)' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Chi Sono</span>
            </div>

            <h2
              className="font-headline uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'var(--text-display)' }}
            >
              Siediti e <br />
              <span className="text-comedy-yellow">Facciamoci</span> <br />
              Due Risate.
            </h2>

            <div className="space-y-5 text-base md:text-lg text-gray-400 mb-12 font-medium leading-relaxed">
              <p>
                Sono Vincenzo Olivieri, e se c'è una cosa che amo fare nella vita, è far ridere la gente.
                Non mi basta un'etichetta: sono comico, caratterista, cantante, autore e speaker radiofonico.{' '}
                <span className="italic text-gray-500">(Praticamente faccio tutto io per risparmiare sul personale).</span>
              </p>
              <p>
                La mia carriera è un viaggio tra palcoscenici, studi televisivi e radiofonici,
                sempre con l'obiettivo di portare leggerezza e un sorriso a chi mi ascolta.{' '}
                <span className="italic text-gray-500">(O almeno così dice il mio medico, che mi ha consigliato di calmarmi).</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 border-t border-white/10">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="flex flex-col gap-2 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-comedy-yellow mb-1">
                    <stat.icon size={16} />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-white tracking-wider leading-none">
                    <ScrollNumber target={stat.target} suffix={stat.suffix} />
                  </h3>
                  <p className="text-[9px] md:text-xs font-bold uppercase tracking-wide md:tracking-widest text-gray-500 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group min-h-[280px] md:min-h-[420px]"
          >
            <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-l-none overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
                alt="Vincenzo Olivieri sul palco"
                loading="lazy"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 bg-zinc-900/90 backdrop-blur-xl p-5 lg:p-6 rounded-3xl border border-white/10 hidden lg:flex items-center gap-4 shadow-2xl z-20"
            >
              <div className="w-12 h-12 rounded-full bg-comedy-yellow/20 flex items-center justify-center text-comedy-yellow border border-comedy-yellow/30">
                <Mic2 size={24} />
              </div>
              <div>
                <p className="font-display text-2xl text-white uppercase tracking-wider leading-none mb-1">Cammellò!</p>
                <p className="text-xs font-bold uppercase tracking-widest text-comedy-yellow">Il Tormentone</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
