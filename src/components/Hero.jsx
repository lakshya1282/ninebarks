import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const gradientRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const pRef = useRef(null);
  const btnsRef = useRef(null);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states to prevent FOUC
      gsap.set(navRef.current, { y: -60, opacity: 0 });
      gsap.set([title1Ref.current, title2Ref.current], { yPercent: 115 });
      gsap.set(pRef.current, { yPercent: -30, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
      gsap.set(btnsRef.current, { y: 25, opacity: 0 });
      gsap.set(gradientRef.current, { opacity: 0 });

      // Sequence:
      // 1. Video Expands
      // 2. Titles & Content Mask Reveal
      // 3. Navbar drops down
      const tl = gsap.timeline({ delay: 0.1 });

      // Stage 1: Expand Video & Fade in dark contrast gradient
      tl.fromTo(videoWrapperRef.current, 
        { clipPath: 'inset(18% 28% 18% 28% round 24px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 0.9,
          ease: 'power3.inOut'
        }
      )
      .to(gradientRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, "-=0.4");

      // Stage 2: Main Titles Mask Reveal Bottom Up
      tl.to([title1Ref.current, title2Ref.current], {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      }, "+=0.05");

      // Paragraph Mask Reveal Top Down
      tl.to(pRef.current, {
        yPercent: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.65,
        ease: 'power3.out'
      }, "-=0.35");

      // CTA Buttons Fade In
      tl.to(btnsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      }, "-=0.35");

      // Stage 3: Navbar drops in smoothly
      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out'
      }, "+=0.05");

      // 4. Parallax effect for the background video
      gsap.fromTo(
        videoRef.current,
        { yPercent: 0, scale: 1.15 },
        {
          yPercent: -15,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-[100vh] bg-[#F6F6F3] overflow-hidden flex flex-col justify-between font-sans selection:bg-[#AAB8A2]">
      {/* Navbar Wrapper */}
      <div ref={navRef} className="relative z-50">
        <Navbar />
      </div>

      {/* Video Container */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none origin-center"
        style={{ clipPath: 'inset(18% 28% 18% 28% round 24px)' }}
      >
        <video
          ref={videoRef}
          src="/videos/hero-showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35"
        />
      </div>

      {/* Main Content */}
      <main className="relative flex-1 w-full max-w-[1700px] mx-auto px-6 sm:px-16 flex flex-col justify-end pt-32 pb-12 sm:pb-16 select-none pointer-events-auto">
        <div className="z-20 text-left space-y-6 max-w-4xl">
          {/* Main Title with Overflow Mask Wrappers for bottom-up reveal */}
          <div className="space-y-1 overflow-hidden">
            <div className="overflow-hidden py-0.5">
              <h1
                ref={title1Ref}
                className="title-serif-light text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[4.75rem] leading-[0.95] font-medium tracking-[-0.03em] text-white drop-shadow-lg inline-block"
              >
                It peels for a reason.
              </h1>
            </div>
            <div className="overflow-hidden py-0.5">
              <h1
                ref={title2Ref}
                className="title-serif-light text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[4.75rem] leading-[0.95] font-medium tracking-[-0.03em] text-white drop-shadow-lg inline-block"
              >
                Yours shouldn't.
              </h1>
            </div>
          </div>

          {/* Subtitle / Paragraph with top-down mask reveal */}
          <div className="overflow-hidden py-1">
            <p
              ref={pRef}
              className="text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl tracking-normal !text-white/95 font-normal drop-shadow-md"
              style={{ color: 'rgba(255, 255, 255, 0.92)' }}
            >
              A decade of altitude sun has been chewing on your paint. We repaint Front Range homes with the prep, the product and the colour work that last through the UV — instead of chalking out in year three.
            </p>
          </div>

          {/* Dual CTA Buttons */}
          <div ref={btnsRef} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="bg-white text-[#111115] rounded-full pl-6 pr-2 py-2 flex items-center gap-4 hover:bg-white/90 transition-colors w-fit text-decoration-none"
            >
              <span className="text-sm font-medium">Explore Projects</span>
              <div className="bg-[#111115] text-white rounded-full p-1.5">
                <ArrowUpRight size={18} />
              </div>
            </a>
            <a
              href="#quote"
              className="bg-transparent border border-white/30 text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-4 hover:bg-white/10 transition-colors w-fit text-decoration-none"
            >
              <span className="text-sm font-medium">Start Your Build</span>
              <div className="bg-white text-[#111115] rounded-full p-1.5">
                <ArrowUpRight size={18} />
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
