'use client'

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { Show } from '@/types/sanity';

const MONTHS_IT = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];

function formatShowDate(isoDate: string) {
  const d = new Date(isoDate);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = MONTHS_IT[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return { day, month, year: String(year) };
}

interface ShowsProps {
  shows: Show[];
}

export default function Shows({ shows }: ShowsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = shows.filter(s => new Date(s.date) >= today);
  const past = shows.filter(s => new Date(s.date) < today);

  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>('.show-row', containerRef.current);
    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="spettacoli" className="py-14 md:py-24 bg-[#050505] text-white relative section-fade">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 relative z-10" ref={containerRef}>

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8"
          >
            <Calendar size={16} className="text-comedy-yellow" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Live Shows</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-headline uppercase leading-[0.9] mb-6"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Tour <span className="text-comedy-yellow">Dates</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 max-w-2xl font-medium text-lg md:text-xl leading-relaxed"
          >
            Dal vivo (finché reggo). Scopri tutte le date del tour e prenota il tuo posto prima che sia troppo tardi.{' '}
            <span className="text-comedy-yellow/80 text-sm italic">P.S. Venite numerosi, il gatto mangia solo salmone.</span>
          </motion.p>
        </div>

        {/* Shows list — newspaper style */}
        <div className="flex flex-col">
          {shows.length === 0 && (
            <p className="text-center text-gray-500 font-medium py-12 border-t border-b border-white/10">
              Nessuno spettacolo in programma al momento. Torna presto!
            </p>
          )}

          {/* Upcoming shows */}
          {upcoming.map((show) => {
            const { day, month, year } = formatShowDate(show.date);
            const isSoldOut = show.status === 'Sold Out';
            const isLastSpots = show.status === 'Ultimi Posti';
            return (
              <div
                key={show._id}
                className={`show-row group flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 py-6 md:py-9 px-5 md:px-8 rounded-xl border-b border-white/10 hover:border-comedy-yellow/20 transition-all duration-300 first:border-t ${
                  isSoldOut ? 'opacity-50' : ''
                }`}
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => {
                  if (!isSoldOut) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255, 215, 0, 0.025)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                <div className="shrink-0 md:w-36 flex items-baseline gap-2 md:flex-col md:gap-0">
                  <span className="font-headline text-comedy-yellow text-4xl md:text-5xl leading-none">{day}</span>
                  <span className="font-headline text-gray-500 text-lg md:text-xl leading-none tracking-widest">{month} {year}</span>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/10 mx-8 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-headline uppercase leading-tight mb-1 group-hover:text-comedy-yellow transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
                  >
                    {show.title}
                  </h3>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <MapPin size={14} className="text-comedy-yellow/50 shrink-0" />
                    <span>{show.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{show.venue}</span>
                  </div>
                </div>
                <div className="shrink-0 md:ml-8 md:mr-2 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  {isLastSpots && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-bold uppercase tracking-widest text-red-400 whitespace-nowrap">
                      Ultimi Posti
                    </span>
                  )}
                  {isSoldOut ? (
                    <div className="inline-flex items-center px-6 py-3 border border-white/10 text-xs font-bold uppercase tracking-widest text-danger-red cursor-not-allowed rounded-xl whitespace-nowrap">
                      Sold Out
                    </div>
                  ) : (
                    <a
                      href={show.ticketUrl ?? '#'}
                      target={show.ticketUrl ? '_blank' : undefined}
                      rel={show.ticketUrl ? 'noopener noreferrer' : undefined}
                      className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-comedy-yellow transition-all shadow-lg overflow-hidden whitespace-nowrap"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Ticket size={14} />
                        Acquista
                      </span>
                      <div className="absolute inset-0 bg-comedy-yellow translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* Past shows */}
          {past.length > 0 && upcoming.length > 0 && (
            <div className="mt-10 mb-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Spettacoli passati</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          )}
          {past.map((show) => {
            const { day, month, year } = formatShowDate(show.date);
            return (
              <div
                key={show._id}
                className="show-row flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 py-5 md:py-7 px-5 md:px-8 rounded-xl border-b border-white/5 opacity-40 first:border-t"
              >
                <div className="shrink-0 md:w-36 flex items-baseline gap-2 md:flex-col md:gap-0">
                  <span className="font-headline text-gray-600 text-3xl md:text-4xl leading-none">{day}</span>
                  <span className="font-headline text-gray-700 text-base md:text-lg leading-none tracking-widest">{month} {year}</span>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/5 mx-8 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-headline uppercase leading-tight mb-1 text-gray-500"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
                  >
                    {show.title}
                  </h3>
                  <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                    <MapPin size={14} className="shrink-0" />
                    <span>{show.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{show.venue}</span>
                  </div>
                </div>
                <div className="shrink-0 md:ml-8 md:mr-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Concluso</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
