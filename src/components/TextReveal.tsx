'use client'

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface TextRevealProps {
  text: string;
  mode?: 'chars' | 'words';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  triggerOnMount?: boolean;
}

export default function TextReveal({
  text,
  mode = 'chars',
  className = '',
  style,
  delay = 0,
  triggerOnMount = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const units = mode === 'chars' ? text.split('') : text.split(' ');
  const stagger = mode === 'chars' ? 0.04 : 0.06;

  // CSS-only path for triggerOnMount — runs on GPU compositor, no JS ticker needed
  if (triggerOnMount) {
    return (
      <span ref={containerRef} className={`inline-flex flex-wrap ${className}`} style={style}>
        {units.map((unit, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden char-reveal-css"
            style={{ marginRight: mode === 'words' ? '0.25em' : undefined }}
          >
            <span
              className="reveal-inner"
              style={{ animationDelay: `${0.4 + delay + i * stagger}s` }}
            >
              {unit === ' ' ? '\u00A0' : unit}
            </span>
          </span>
        ))}
      </span>
    );
  }

  // GSAP path for scroll-triggered reveals
  return <ScrollReveal text={text} mode={mode} className={className} style={style} delay={delay} units={units} stagger={stagger} />;
}

function ScrollReveal({ text, mode, className, style, delay, units, stagger }: {
  text: string; mode: string; className: string; style?: React.CSSProperties;
  delay: number; units: string[]; stagger: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const duration = mode === 'chars' ? 0.7 : 0.9;

  useGSAP(() => {
    const spans = containerRef.current?.querySelectorAll('.reveal-inner');
    if (!spans || spans.length === 0) return;

    gsap.fromTo(
      spans,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef, dependencies: [text, delay] });

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`} style={style}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: mode === 'words' ? '0.25em' : undefined }}
        >
          <span className="reveal-inner block">
            {unit === ' ' ? '\u00A0' : unit}
          </span>
        </span>
      ))}
    </span>
  );
}
