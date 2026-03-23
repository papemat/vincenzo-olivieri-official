import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import App from './App.tsx';
import './index.css';

// Register once globally — not per-component
gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')!).render(<App />);
