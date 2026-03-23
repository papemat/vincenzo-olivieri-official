/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import EasterEggs from './components/EasterEggs';
import { useLenis } from './hooks/useLenis';

// Lazy-load below-the-fold sections to reduce initial JS parse on mobile
const About = lazy(() => import('./components/About'));
const Shows = lazy(() => import('./components/Shows'));
const Videoflix = lazy(() => import('./components/Videoflix'));
const Quotes = lazy(() => import('./components/Quotes'));
const Podcast = lazy(() => import('./components/Podcast'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const SectionDivider = lazy(() => import('./components/SectionDivider'));

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
        <Suspense fallback={null}>
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
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
