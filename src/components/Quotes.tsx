'use client'

import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';
import type { Quote } from '@/types/sanity';

function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="w-80 md:w-96 shrink-0 whitespace-normal bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] group hover:border-comedy-yellow/30 hover:bg-zinc-900/60 transition-all duration-500 shadow-2xl flex flex-col justify-between" style={{ height: '320px' }}>
      <div>
        <QuoteIcon size={36} className="text-comedy-yellow/40 mb-5 group-hover:text-comedy-yellow group-hover:scale-110 transition-all duration-500" />
        <p className="text-base md:text-lg font-medium leading-relaxed text-gray-400 group-hover:text-white transition-colors mb-8">
          "{quote.text}"
        </p>
      </div>
      <div className="flex items-center gap-4 pt-5 border-t border-white/5 group-hover:border-white/10 transition-colors">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-comedy-yellow font-display text-lg uppercase shrink-0">
          {quote.author.charAt(0)}
        </div>
        <div>
          <p className="font-display text-base text-white uppercase tracking-wider leading-none mb-1">{quote.author}</p>
          <p className="text-[10px] text-comedy-yellow uppercase tracking-widest font-bold">{quote.role}</p>
        </div>
      </div>
    </div>
  );
}

interface QuotesProps {
  quotes: Quote[];
}

export default function Quotes({ quotes }: QuotesProps) {
  return (
    <section className="pt-12 pb-10 md:pt-20 md:pb-16 bg-[#050505] text-white relative overflow-hidden section-fade">
      {/* Yellow glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-comedy-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Background watermark */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-headline text-[30vw] text-white/[0.015] uppercase leading-none">
          QUOTE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Recensioni</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-headline uppercase leading-[0.9]"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Dicono di <span className="text-comedy-yellow">Me</span>
          </motion.h2>
        </div>
      </div>

      {/* Dual marquee rows — full width, no container */}
      <div className="relative overflow-hidden">
        {/* Row 1: left → right */}
        <div
          className="flex items-stretch gap-6 mb-6 quotes-track"
          style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}
        >
          {[...quotes, ...quotes, ...quotes].map((quote, i) => (
            <div key={`r1-${quote._id}-${i}`} className="h-full flex"><QuoteCard quote={quote} /></div>
          ))}
        </div>

        {/* Row 2: right → left */}
        <div
          className="flex items-stretch gap-6 quotes-track"
          style={{ animation: 'marquee-reverse 22s linear infinite', width: 'max-content' }}
        >
          {[...quotes, ...quotes, ...quotes].map((quote, i) => (
            <div key={`r2-${quote._id}-${i}`} className="h-full flex"><QuoteCard quote={quote} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
