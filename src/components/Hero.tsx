'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { PlayCircle, ArrowRight, Star } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextReveal from './TextReveal';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All entrance animations in one timeline, starting after splash fades (500ms)
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.6
    )
    .fromTo(ctasRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.75
    )
    .fromTo(marqueeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.9
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      1.0
    );

    // Parallax — only register after animations complete to avoid competing
    tl.call(() => {
      gsap.to(sectionRef.current?.querySelector('.hero-bg') as HTMLElement, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      {/* Marquee */}
      <div
        ref={marqueeRef}
        style={{ opacity: 0 }}
        className="absolute top-[88px] sm:top-[112px] left-0 right-0 overflow-hidden z-20 py-2 border-y border-white/5"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee-reverse 25s linear infinite' }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-headline text-xs tracking-[0.3em] uppercase mx-6"
              style={{ WebkitTextStroke: '1px #FFD700', color: 'transparent' }}
            >
              ★ VINCENZO OLIVIERI ★ COMICO ★ AUTORE ★ SPEAKER ★ ROBA DA MATTI TOUR &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Background — no blur, no GSAP on this element, parallax on inner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505] z-10" />
        <div className="hero-bg absolute inset-[-20%] opacity-55">
          <Image
            src="https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=2070"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="140vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-[5] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full flex flex-col items-start mt-32 sm:mt-36 md:mt-44 pb-20 md:pb-28">

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md"
        >
          <div className="flex text-comedy-yellow">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-xs font-bold tracking-widest uppercase text-gray-300">"Bello, bravo e modesto" - Mia mamma</span>
        </div>

        {/* Title — CSS animations, GPU compositor */}
        <h1 className="leading-[0.85] mb-5 tracking-tight">
          <div className="block">
            <TextReveal
              text="VINCENZO"
              mode="chars"
              triggerOnMount={true}
              delay={0.5}
              className="font-headline text-white"
              style={{ fontSize: 'var(--text-hero)' } as React.CSSProperties}
            />
          </div>
          <div className="block">
            <TextReveal
              text="OLIVIERI"
              mode="chars"
              triggerOnMount={true}
              delay={0.78}
              className="font-headline text-comedy-yellow"
              style={{ fontSize: 'var(--text-hero)' } as React.CSSProperties}
            />
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-2xl font-medium mb-6 md:mb-8 border-l-2 border-comedy-yellow/50 pl-4 md:pl-6 leading-relaxed"
        >
          Comico, caratterista, cantante, autore, speaker radiofonico. E incredibilmente modesto.{' '}
          <br className="hidden md:block" />
          <span className="text-white font-bold mt-2 block md:inline md:mt-0">In tour ora con "Roba da matti". (Venite che ho il mutuo).</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          style={{ opacity: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a
            href="#spettacoli"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-xl font-bold uppercase tracking-wider hover:bg-comedy-yellow transition-all shadow-xl overflow-hidden w-full sm:w-auto text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base w-full">
              Acquista Biglietti <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-comedy-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </a>
          <a
            href="#videoflix"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/50 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-zinc-800 hover:border-comedy-yellow/50 transition-all w-full sm:w-auto overflow-hidden shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
              <PlayCircle size={24} className="text-comedy-yellow group-hover:scale-110 transition-transform" />
              Guarda lo Special
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-comedy-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{ opacity: 0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-comedy-yellow/60 to-transparent" />
      </div>
    </section>
  );
}
