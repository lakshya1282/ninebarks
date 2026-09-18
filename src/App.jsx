import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import ChalkingWall from './components/ChalkingWall';
import BeforeAfterSection from './components/BeforeAfterSection';
import ElevationAuditSection from './components/ElevationAuditSection';
import MetricsSection from './components/MetricsSection';
import ParallaxBanner from './components/ParallaxBanner';
import WhoThisIsForSection from './components/WhoThisIsForSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F3]">
      <Hero />
      <ChalkingWall />
      <BeforeAfterSection />
      <ElevationAuditSection />
      <MetricsSection />
      <ParallaxBanner />
      <WhoThisIsForSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
