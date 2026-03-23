import { motion } from 'motion/react';
import { Mic2, Play, Headphones } from 'lucide-react';

const BAR_HEIGHTS = [55, 90, 40, 75, 100, 60, 85, 45, 70, 95, 50, 80];
const BAR_DURATIONS = [1.1, 0.9, 1.3, 0.8, 1.0, 1.2, 0.95, 1.1, 0.85, 1.0, 1.15, 0.9];

export default function Podcast() {
  return (
    <section className="py-16 md:py-20 bg-[#050505] text-white relative overflow-hidden section-fade">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-zinc-800/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">On Air</span>
            </div>

            <h2
              className="font-headline uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'var(--text-display)' }}
            >
              La Voce <br />
              <span className="text-comedy-yellow">Della Radio</span>
            </h2>

            <p className="text-gray-400 font-medium text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
              Non solo palco. Ascolta i miei interventi radiofonici, le interviste e il podcast ufficiale dove racconto i retroscena della comicità.{' '}
              <span className="text-comedy-yellow/80 text-sm italic">P.S. Ottimo per addormentarsi o per coprire i rumori dei vicini.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a href="#" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider hover:bg-comedy-yellow transition-all shadow-xl overflow-hidden w-full sm:w-auto text-center">
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base w-full">
                  <Play fill="currentColor" size={18} />
                  Ascolta Ora
                </span>
                <div className="absolute inset-0 bg-comedy-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
              <a href="#" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-zinc-800 hover:border-comedy-yellow/50 transition-all w-full sm:w-auto">
                <Headphones size={20} className="text-gray-400 group-hover:text-comedy-yellow transition-colors" />
                <span className="text-sm md:text-base">Tutti gli episodi</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 relative group shadow-2xl bg-zinc-900/50">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 opacity-80" />
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000"
                alt="Microfono Radio"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full border border-comedy-yellow/20 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 rounded-full border border-comedy-yellow/10 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                  <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center text-white bg-black/40 backdrop-blur-xl group-hover:scale-110 group-hover:border-comedy-yellow/50 group-hover:text-comedy-yellow transition-all duration-700 shadow-2xl">
                    <Mic2 size={40} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating element with 12-bar soundwave */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute bottom-4 left-4 bg-zinc-900/95 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hidden lg:block shadow-2xl z-30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1 items-end h-7">
                  {BAR_HEIGHTS.map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${Math.max(15, height * 0.3)}%`, `${height}%`, `${Math.max(15, height * 0.3)}%`] }}
                      transition={{
                        repeat: Infinity,
                        duration: BAR_DURATIONS[i],
                        delay: i * 0.05,
                        ease: 'easeInOut',
                      }}
                      className="w-1 bg-comedy-yellow rounded-t-sm"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Live Now</span>
              </div>
              <p className="font-display text-2xl text-white uppercase tracking-wider mb-2">Radio Delta 1</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-comedy-yellow" />
                <p className="text-gray-300 font-medium text-sm tracking-widest uppercase">Tutti i giorni alle 15:00</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
