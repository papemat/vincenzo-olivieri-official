'use client'

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop — don't init on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = -999;
    let mouseY = -999;
    let spotX = -999;
    let spotY = -999;
    let isHovering = false;
    let hasMovedOnce = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMovedOnce) {
        hasMovedOnce = true;
        spotX = mouseX;
        spotY = mouseY;
        // Enable transitions only after first real move (prevents slide-in from off-screen)
        if (dotRef.current) dotRef.current.style.transition = 'scale 0.2s';
        if (ringRef.current) ringRef.current.style.transition = 'opacity 0.2s, scale 0.2s';
        if (spotlightRef.current) spotlightRef.current.style.transition = 'opacity 0.3s, scale 0.3s';
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    // Suppress transitions until first move (prevents elements sliding in from -999,-999)
    if (dotRef.current) dotRef.current.style.transition = 'none';
    if (ringRef.current) ringRef.current.style.transition = 'none';
    if (spotlightRef.current) spotlightRef.current.style.transition = 'none';

    const setHover = (active: boolean) => {
      if (isHovering === active) return;
      isHovering = active;
      if (dotRef.current) dotRef.current.style.scale = active ? '0' : '1';
      if (ringRef.current) {
        ringRef.current.style.opacity = active ? '1' : '0';
        ringRef.current.style.scale = active ? '1' : '0';
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = active ? '0.8' : '0.4';
        spotlightRef.current.style.scale = active ? '1.5' : '1';
      }
    };

    const tick = () => {
      // Check element under cursor every frame — more reliable than mouseover events
      if (mouseX > 0 && mouseY > 0) {
        const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
        setHover(el?.closest('a, button') != null);
      }

      spotX += (mouseX - spotX) * 0.1;
      spotY += (mouseY - spotY) * 0.1;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${spotX - 128}px, ${spotY - 128}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${mouseX - 24}px, ${mouseY - 24}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      mouseX = -999;
      mouseY = -999;
      setHover(false);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-64 h-64 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference blur-[80px] hidden md:block opacity-40"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ willChange: 'transform', opacity: '0', scale: '0' }}
      />
    </>
  );
}
