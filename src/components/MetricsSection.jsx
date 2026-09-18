import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metricsData = [
  {
    id: 'jobs',
    targetValue: 94,
    prefix: '',
    suffix: '%',
    title: 'of 2025 jobs started on the promised date',
    subtext: null,
    format: (val) => Math.round(val) + '%',
  },
  {
    id: 'repeat',
    targetValue: 61,
    prefix: '',
    suffix: '%',
    title: 'of revenue is repeat customers and referrals',
    subtext: null,
    format: (val) => Math.round(val) + '%',
  },
  {
    id: 'years',
    targetValue: 8,
    prefix: '',
    suffix: '',
    title: 'years in business',
    subtext: null,
    format: (val) => Math.round(val),
  },
  {
    id: 'exteriors',
    targetValue: 1300,
    prefix: '~',
    suffix: '',
    title: 'exteriors painted since 2018',
    subtext: null,
    format: (val) => '~' + Math.round(val).toLocaleString(),
  },
];

export default function MetricsSection() {
  const containerRef = useRef(null);
  const numRefs = useRef([]);
  const titleLinesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleLinesRef.current,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );

      metricsData.forEach((item, index) => {
        const el = numRefs.current[index];
        if (!el) return;

        const obj = { val: 0 };

        gsap.to(obj, {
          val: item.targetValue,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.innerText = item.format(obj.val);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-white pt-6 sm:pt-10 pb-16 sm:pb-24 px-6 sm:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-start">
        {/* Title Block */}
        <div className="text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 max-w-3xl mb-8 sm:mb-12">
          {/* Eyebrow */}
          <div className="flex items-center space-x-2 text-[#5F5E57] text-xs sm:text-sm font-normal tracking-tight mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5F5E57]"></span>
            <span>By the numbers</span>
          </div>

          {/* Main Title - single line feel */}
          <h2 
            className="text-[#111115] text-center font-normal inline-block"
            style={{ 
              fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif',
              fontSize: 'clamp(24px, 3.6vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
            }}
          >
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[0] = el} className="block">A finish measured in years,</span></div>
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[1] = el} className="block">not seasons.</span></div>
          </h2>

          {/* Subtitle */}
          <div className="max-w-md text-center w-full pt-0.5">
            <p 
              className="text-xs sm:text-sm text-[#76766F] leading-normal font-normal"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              The two numbers that matter most are the two a competitor can't copy without measuring themselves.
            </p>
          </div>
        </div>

        {/* Metrics 4-Column Grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start text-center">
          {metricsData.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center space-y-1.5 text-center">
              {/* Number */}
              <div 
                ref={(el) => (numRefs.current[index] = el)}
                className="text-[#111115] tracking-tight text-center"
                style={{
                  fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 5vw, 76px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {item.format(0)}
              </div>

              {/* Metric Title */}
              <p 
                className="text-[#5F5E57] text-xs sm:text-sm leading-snug font-normal max-w-[200px] text-center"
                style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
              >
                {item.title}
              </p>

              {/* Optional Subtext */}
              {item.subtext && (
                <p 
                  className="text-[#888780] text-[11px] sm:text-xs leading-relaxed font-normal pt-0.5 max-w-[220px] text-center"
                  style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                >
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
