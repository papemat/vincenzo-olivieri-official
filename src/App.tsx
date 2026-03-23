'use client'

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import { useLenis } from './hooks/useLenis';

// Lazy-load below-the-fold sections to reduce initial JS parse on mobile
const About = dynamic(() => import('./components/About'), { ssr: false });
const Shows = dynamic(() => import('./components/Shows'), { ssr: false });
const Videoflix = dynamic(() => import('./components/Videoflix'), { ssr: false });
const Quotes = dynamic(() => import('./components/Quotes'), { ssr: false });
const Podcast = dynamic(() => import('./components/Podcast'), { ssr: false });
const Newsletter = dynamic(() => import('./components/Newsletter'), { ssr: false });
const Contact = dynamic(() => import('./components/Contact'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });
const SectionDivider = dynamic(() => import('./components/SectionDivider'), { ssr: false });

export default function App() {
  useLenis();

  // Remove splash screen once React has mounted and painted
  useEffect(() => {
    const splash = document.getElementById('splash');
    if (!splash) return;
    // Small delay so the Hero animations can start cleanly
    const timer = setTimeout(() => {
      splash.classList.add('hidden');
      // Remove from DOM after transition
      splash.addEventListener('transitionend', () => splash.remove(), { once: true });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-comedy-yellow selection:text-black md:cursor-none">
      <div className="noise-overlay" />
      <CustomCursor />
      <EasterEggs />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <SectionDivider variant="label" label="01 / SPETTACOLI" />
        <Shows />
        <SectionDivider variant="rule" />
        <Quotes />
        <SectionDivider variant="rule" />
        <Videoflix />
        <SectionDivider variant="label" label="04 / PODCAST" />
        <Podcast />
        <SectionDivider variant="rule" />
        <About />
        <SectionDivider variant="rule" />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
