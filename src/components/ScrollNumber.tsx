'use client'

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollNumberProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function ScrollNumber({ target, suffix = '', duration = 2, className = '' }: ScrollNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(counter.value).toString() + suffix;
        }
      },
    });
  }, { scope: ref });

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
