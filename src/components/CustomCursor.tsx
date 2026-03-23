'use client'

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    let mouseX = cx;
    let mouseY = cy;
    let spotX = cx;
    let spotY = cy;
    let isHovering = false;
    let isVisible = false;
    let rafId: number;

    // Position all elements at screen center immediately (avoids jump from top:0 left:0)
    if (spotlightRef.current)
      spotlightRef.current.style.transform = `translate(${cx - 128}px, ${cy - 128}px)`;
    if (dotRef.current)
      dotRef.current.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    if (ringRef.current)
      ringRef.current.style.transform = `translate(${cx - 24}px, ${cy - 24}px)`;

    const setHover = (active: boolean) => {
      if (isHovering === active) return;
      isHovering = active;
      if (dotRef.current) dotRef.current.style.scale = active ? '0' : '1';
      if (ringRef.current) {
        ringRef.current.style.opacity = active && isVisible ? '1' : '0';
        ringRef.current.style.scale = active ? '1' : '0';
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.scale = active ? '1.5' : '1';
      }
    };

    const show = () => {
      if (isVisible) return;
      isVisible = true;
      // Snap lerp position before revealing — eliminates any residual gap
      spotX = mouseX;
      spotY = mouseY;
      if (spotlightRef.current)
        spotlightRef.current.style.opacity = isHovering ? '0.8' : '0.4';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const hide = () => {
      if (!isVisible) return;
      isVisible = false;
      isHovering = false;
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      if (dotRef.current) {
        dotRef.current.style.opacity = '0';
        dotRef.current.style.scale = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '0';
        ringRef.current.style.scale = '0';
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      show();
    };

    const tick = () => {
      // Lerp runs every frame even when hidden — so spotlight is already near
      // the correct position when show() is called (no slide-in from far away)
      spotX += (mouseX - spotX) * 0.1;
      spotY += (mouseY - spotY) * 0.1;

      if (spotlightRef.current)
        spotlightRef.current.style.transform = `translate(${spotX - 128}px, ${spotY - 128}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${mouseX - 24}px, ${mouseY - 24}px)`;

      // Hover check only when visible
      if (isVisible) {
        const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
        setHover(el?.closest('a, button') != null);
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', hide);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* transition ONLY on opacity and scale — NEVER on transform (handled by JS lerp) */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-64 h-64 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference blur-[80px] hidden md:block"
        style={{ opacity: 0, willChange: 'transform', transition: 'opacity 0.3s ease, scale 0.3s ease' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform', transition: 'opacity 0.15s ease, scale 0.2s ease' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ opacity: 0, scale: '0', willChange: 'transform', transition: 'opacity 0.2s ease, scale 0.2s ease' }}
      />
    </>
  );
}
