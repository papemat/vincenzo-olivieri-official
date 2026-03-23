'use client'

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Tv, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VIDEOS = [
  {
    id: 1,
    title: 'Il meglio di Cammellò',
    category: 'Sketch',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    duration: '12:45',
  },
  {
    id: 2,
    title: 'Intervista a Radio Delta 1',
    category: 'Interviste',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    duration: '08:20',
  },
  {
    id: 3,
    title: 'Dietro le quinte del Tour',
    category: 'Backstage',
    thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800',
    duration: '15:30',
  },
  {
    id: 4,
    title: "Monologo sull'Abruzzo",
    category: 'Stand-up',
    thumbnail: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=800',
    duration: '05:15',
  },
];

export default function Videoflix() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.video-card', gridRef.current);
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: gridRef });

  return (
    <section id="videoflix" className="py-14 md:py-24 bg-[#050505] text-white relative overflow-hidden section-fade">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8"
          >
            <Tv size={16} className="text-comedy-yellow" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Videoflix Originals</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-headline uppercase leading-[0.9] mb-6"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Guarda i{' '}
            <span className="text-comedy-yellow">Video</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 max-w-2xl font-medium text-lg leading-relaxed"
          >
            Sketch, interviste, monologhi e molto altro.{' '}
            <span className="text-comedy-yellow/80 text-sm italic">P.S. Se non ti piacciono, guarda un documentario sui bradipi.</span>
          </motion.p>
        </div>

        {/* Editorial 3-column grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Featured — col-span-2, row-span-2 */}
          <div className="video-card group cursor-pointer md:col-span-2 md:row-span-2 relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 aspect-[4/3] md:aspect-auto md:min-h-[500px]">
            {/* Category watermark */}
            <div aria-hidden className="absolute top-4 right-4 font-headline text-[8rem] text-white/[0.04] leading-none uppercase select-none pointer-events-none z-0">
              {VIDEOS[0].category}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10 opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
            <img
              src={VIDEOS[0].thumbnail}
              alt={VIDEOS[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center justify-center px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                  Nuova Uscita
                </span>
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-sm border border-white/10 text-xs font-mono text-gray-300">
                  {VIDEOS[0].duration}
                </div>
              </div>
              <h3
                className="font-headline uppercase leading-tight mb-4 drop-shadow-2xl group-hover:text-comedy-yellow transition-colors duration-500"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {VIDEOS[0].title}
              </h3>
              <div className="flex items-center gap-6">
                <button className="flex items-center justify-center w-14 h-14 bg-comedy-yellow text-black rounded-full hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                  <Play size={22} fill="currentColor" className="ml-1" />
                </button>
                <span className="font-bold uppercase tracking-widest text-sm group-hover:text-comedy-yellow transition-colors">Guarda Ora</span>
              </div>
            </div>
          </div>

          {/* Secondary videos — 2 side cards in right column */}
          {VIDEOS.slice(1, 3).map((video) => (
            <div
              key={video.id}
              className="video-card group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 mb-4 shadow-lg flex-1">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-comedy-yellow/50 group-hover:text-comedy-yellow">
                    <Play size={18} className="ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded-sm text-xs font-mono border border-white/10 text-gray-300">
                  {video.duration}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-4 h-px bg-comedy-yellow" />
                <span className="text-xs font-bold uppercase tracking-widest text-comedy-yellow">{video.category}</span>
              </div>
              <h3 className="font-display text-lg md:text-xl uppercase tracking-wide leading-tight group-hover:text-white text-gray-300 transition-colors line-clamp-2">
                {video.title}
              </h3>
            </div>
          ))}

          {/* 4th video — full-width strip */}
          <div className="video-card group cursor-pointer md:col-span-3 flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-white/10 bg-zinc-900/50 hover:border-comedy-yellow/20 transition-all duration-500">
            <div className="relative aspect-video md:aspect-auto md:w-64 md:h-40 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
              <img
                src={VIDEOS[3].thumbnail}
                alt={VIDEOS[3].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-500 group-hover:border-comedy-yellow/50 group-hover:text-comedy-yellow">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded-sm text-xs font-mono border border-white/10 text-gray-300">
                {VIDEOS[3].duration}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-4 h-px bg-comedy-yellow" />
                <span className="text-xs font-bold uppercase tracking-widest text-comedy-yellow">{VIDEOS[3].category}</span>
              </div>
              <h3 className="font-headline text-3xl md:text-4xl uppercase tracking-wide leading-tight group-hover:text-comedy-yellow text-white transition-colors mb-2">
                {VIDEOS[3].title}
              </h3>
              <p className="text-gray-500 text-sm font-medium">Un monologo sull'identità abruzzese tra orgoglio e ironia.</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold uppercase tracking-wider hover:border-comedy-yellow/50 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Vedi tutti i video <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-comedy-yellow" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-comedy-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
