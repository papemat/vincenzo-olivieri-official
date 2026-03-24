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

    let mouseX = cx, mouseY = cy;
    let spotX = cx, spotY = cy;
    let isHovering = false, isVisible = false;
    let spotScale = 1;
    let rafId: number;

    // Posiziona al centro al mount
    if (spotlightRef.current)
      spotlightRef.current.style.transform = `translate(${cx - 128}px, ${cy - 128}px) scale(1)`;
    if (dotRef.current)
      dotRef.current.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    if (ringRef.current)
      ringRef.current.style.transform = `translate(${cx - 24}px, ${cy - 24}px)`;

    // Hover via event delegation — stabile, no elementFromPoint flicker
    const onPointerEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button')) return;
      if (isHovering) return;
      isHovering = true;
      spotScale = 1.5;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current && isVisible) ringRef.current.style.opacity = '1';
    };

    const onPointerLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button')) return;
      if (!isHovering) return;
      isHovering = false;
      spotScale = 1;
      if (dotRef.current && isVisible) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const show = () => {
      if (isVisible) return;
      isVisible = true;
      spotX = mouseX; spotY = mouseY;
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0.4';
      if (dotRef.current) dotRef.current.style.opacity = isHovering ? '0' : '1';
      if (ringRef.current && isHovering) ringRef.current.style.opacity = '1';
    };

    const hide = () => {
      if (!isVisible) return;
      isVisible = false;
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      show();
    };

    const LERP = 0.15;

    const tick = () => {
      spotX += (mouseX - spotX) * LERP;
      spotY += (mouseY - spotY) * LERP;

      if (spotlightRef.current)
        spotlightRef.current.style.transform = `translate(${spotX - 128}px, ${spotY - 128}px) scale(${spotScale})`;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${mouseX - 24}px, ${mouseY - 24}px)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('pointerenter', onPointerEnter, true);
    document.addEventListener('pointerleave', onPointerLeave, true);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('pointerenter', onPointerEnter, true);
      document.removeEventListener('pointerleave', onPointerLeave, true);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-64 h-64 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference blur-[80px] hidden md:block"
        style={{ opacity: 0, willChange: 'transform', transition: 'opacity 0.3s ease' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform', transition: 'opacity 0.15s ease' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-comedy-yellow rounded-full pointer-events-none z-[101] hidden md:block mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform', transition: 'opacity 0.2s ease' }}
      />
    </>
  );
}
