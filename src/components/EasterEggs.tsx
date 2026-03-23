'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function EasterEggs() {
  // States
  const [laughs, setLaughs] = useState<{id: number, x: number, y: number, text: string}[]>([]);
  const [tomatoes, setTomatoes] = useState<{id: number, x: number, y: number}[]>([]);
  const [showCamel, setShowCamel] = useState(false);
  const [buttonClicks, setButtonClicks] = useState(0);
  const [crazyMode, setCrazyMode] = useState(false);

  const buttonTexts = [
    "NON PREMERE",
    "Ehi, fermo!",
    "Ti ho detto di NO!",
    "Ultimo avviso...",
    "ROBA DA MATTI!"
  ];

  // 1. Left Click -> Laughs
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on the "Do not press" button
      const target = e.target as HTMLElement;
      if (target.closest('#do-not-press')) return;

      const laughTexts = ["AHAHAH!", "LOL", "😂", "Cammellò!", "Roba da matti!", "🤣", "Hehehe"];
      const randomText = laughTexts[Math.floor(Math.random() * laughTexts.length)];
      
      const newLaugh = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        text: randomText
      };
      
      setLaughs(prev => [...prev, newLaugh]);
      
      setTimeout(() => {
        setLaughs(prev => prev.filter(l => l.id !== newLaugh.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // 2. Right Click -> Tomatoes
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const newTomato = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setTomatoes(prev => [...prev, newTomato]);
      
      setTimeout(() => {
        setTomatoes(prev => prev.filter(t => t.id !== newTomato.id));
      }, 3000);
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // 3. Secret Word "cammello"
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 8) buffer = buffer.slice(-8);
      if (buffer === "cammello") {
        setShowCamel(true);
        setTimeout(() => setShowCamel(false), 5000);
        buffer = "";
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. Crazy Mode
  useEffect(() => {
    if (crazyMode) {
      document.body.classList.add('crazy-mode');
      setTimeout(() => {
        setCrazyMode(false);
        setButtonClicks(0);
        document.body.classList.remove('crazy-mode');
      }, 5000);
    }
  }, [crazyMode]);

  const [buttonPos, setButtonPos] = useState({ x: 24, y: 24 }); // bottom-6 left-6 roughly

  const handleButtonHover = () => {
    if (buttonClicks >= 2 && buttonClicks < 4) {
      // Runaway logic
      const newX = Math.random() * (window.innerWidth - 200);
      const newY = Math.random() * (window.innerHeight - 100);
      setButtonPos({ x: newX, y: newY });
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonClicks < 4) {
      setButtonClicks(prev => prev + 1);
    } else {
      setCrazyMode(true);
    }
  };

  return (
    <>
      {/* Laughs */}
      <AnimatePresence>
        {laughs.map(laugh => (
          <motion.div
            key={laugh.id}
            initial={{ opacity: 1, y: 0, scale: 0.5, rotate: Math.random() * 40 - 20 }}
            animate={{ opacity: 0, y: -100, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999] font-display text-comedy-yellow text-3xl md:text-5xl font-black drop-shadow-lg whitespace-nowrap"
            style={{ left: laugh.x, top: laugh.y, transform: 'translate(-50%, -50%)' }}
          >
            {laugh.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Tomatoes */}
      <AnimatePresence>
        {tomatoes.map(tomato => (
          <motion.div
            key={tomato.id}
            initial={{ scale: 0, opacity: 1, rotate: Math.random() * 360 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="fixed pointer-events-none z-[9998] text-6xl md:text-8xl drop-shadow-2xl"
            style={{ left: tomato.x, top: tomato.y, transform: 'translate(-50%, -50%)' }}
          >
            🍅
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Camel Easter Egg */}
      <AnimatePresence>
        {showCamel && (
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: '100vw' }}
            transition={{ duration: 4, ease: "linear" }}
            className="fixed bottom-10 left-0 z-[9997] text-8xl md:text-[150px] pointer-events-none drop-shadow-2xl"
          >
            🐪
          </motion.div>
        )}
      </AnimatePresence>

      {/* Do Not Press Button */}
      <motion.button
        id="do-not-press"
        onClick={handleButtonClick}
        onMouseEnter={handleButtonHover}
        animate={buttonClicks >= 2 && buttonClicks < 4 ? { x: buttonPos.x, y: -buttonPos.y } : { x: 0, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[9999] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-2xl border backdrop-blur-md overflow-hidden group ${
          buttonClicks === 0 ? 'bg-red-600/80 text-white border-red-400/50 hover:bg-red-500/90' :
          buttonClicks === 1 ? 'bg-orange-500/80 text-white border-orange-300/50 hover:bg-orange-400/90' :
          buttonClicks === 2 ? 'bg-yellow-500/80 text-black border-yellow-300/50 hover:bg-yellow-400/90' :
          buttonClicks === 3 ? 'bg-red-800/80 text-white border-red-500/50 animate-pulse' :
          'bg-black/80 text-red-500 border-red-500/50'
        }`}
      >
        <span className="relative z-10">{buttonTexts[Math.min(buttonClicks, buttonTexts.length - 1)]}</span>
        {buttonClicks === 0 && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />}
      </motion.button>
    </>
  );
}
