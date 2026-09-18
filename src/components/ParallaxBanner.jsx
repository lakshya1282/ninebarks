import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBanner() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleLinesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const card = cardRef.current;
      const img = imgRef.current;
      if (!container || !card || !img) return;

      // Expand card width from inset (50px side margin) to full width (0px margin) as user scrolls into section
      gsap.fromTo(
        card,
        {
          marginLeft: '50px',
          marginRight: '50px',
          borderRadius: '32px',
        },
        {
          marginLeft: '0px',
          marginRight: '0px',
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'top 10%',
            scrub: 1,
          },
        }
      );

      // Parallax effect on the inner image
      gsap.fromTo(
        img,
        {
          yPercent: 12,
          scale: 1.15,
        },
        {
          yPercent: -12,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        titleLinesRef.current,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 bg-white w-full overflow-hidden pt-6 sm:pt-12 pb-0">
      <div 
        ref={cardRef}
        className="relative overflow-hidden h-[85vh] sm:h-[110vh] shadow-sm flex flex-col justify-end p-8 sm:p-16 lg:p-24"
        style={{
          marginLeft: '50px',
          marginRight: '50px',
          borderRadius: '32px',
        }}
      >
        <div className="w-full h-full absolute inset-0 overflow-hidden">
          <img
            ref={imgRef}
            src="/twilight.webp"
            alt="Twilight Ninebark Exterior"
            className="w-full h-[130%] object-cover absolute -top-[15%] left-0 right-0 no-mask"
          />
        </div>

        {/* Dark overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

        {/* Text Overlay & Bottom Right CTA Container */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col space-y-4">
            <div className="space-y-1">
              <h2 
                className="text-white text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight inline-block"
                style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
              >
                <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[0] = el} className="block">The sun does the damage up here.</span></div>
                <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[1] = el} className="block">We paint like we know it</span></div>
              </h2>
            </div>
            <p 
              className="text-white/80 text-base sm:text-xl font-light leading-relaxed max-w-xl"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              six projects, matched angle for angle, same house in both frames.
            </p>
          </div>

          {/* Bottom Right CTA Button */}
          <a
            href="#quote"
            className="shrink-0 inline-flex items-center space-x-3 bg-white/95 hover:bg-white text-[#111115] px-6 sm:px-8 py-4 rounded-full font-medium text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm self-start md:self-end"
            style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
          >
            <span>Start your build</span>
            <span className="w-7 h-7 rounded-full bg-[#111115] text-white flex items-center justify-center text-xs">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
