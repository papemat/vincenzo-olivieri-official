'use client'

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    // Start Lenis after splash + animations begin — avoids competing RAF loops
    const timer = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisInstance = lenis;

      // Hook into GSAP ticker — single RAF loop shared with animations
      tickerFn = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerFn);
    }, 600);

    return () => {
      clearTimeout(timer);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) { lenis.destroy(); lenisInstance = null; }
    };
  }, []);
}

export function getLenis() {
  return lenisInstance;
}
