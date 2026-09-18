import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterSection() {
  const [sliderValue, setSliderValue] = useState(100);
  const sectionRef = useRef(null);
  const titleLinesRef = useRef([]);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const sliderContainerRef = useRef(null);
  const parallaxWrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Mask Reveal Bottom Up
      gsap.fromTo(
        titleLinesRef.current,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // 2. Paragraphs Mask Reveal Top Down
      gsap.fromTo(
        [para1Ref.current, para2Ref.current],
        { yPercent: -25, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 58%',
          },
        }
      );

      // 3. Slider Container Mask Down Reveal
      gsap.fromTo(
        sliderContainerRef.current,
        { clipPath: 'inset(0 0 100% 0 round 1.5rem)', scale: 1.04 },
        {
          clipPath: 'inset(0 0 0% 0 round 1.5rem)',
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
          },
        }
      );

      // 4. Parallax effect for slider images
      if (parallaxWrapperRef.current) {
        gsap.fromTo(
          parallaxWrapperRef.current,
          { yPercent: 10, scale: 1.2 },
          {
            yPercent: -10,
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: sliderContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 5. Automatically slide from 100 (Before) to 50 (Half After)
      const proxy = { val: 100 };
      gsap.to(proxy, {
        val: 50,
        duration: 1.8,
        delay: 0.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
        },
        onUpdate: () => {
          setSliderValue(proxy.val);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <section ref={sectionRef} className="py-24 sm:py-36 bg-white relative z-20">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B7263]"></span>
              <span className="font-mono text-xs text-[#6F6E67] uppercase tracking-widest">
                The claim nobody else makes
              </span>
            </div>

            {/* Title with Mask Reveal Wrapper */}
            <div className="space-y-1">
              <h2 className="title-serif-light text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] inline-block">
                <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[0] = el} className="block text-[#B5B4AC] font-light">Your south wall and your </span></div>
                <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[1] = el} className="block text-[#B5B4AC] font-light">north wall <span className="text-[#111115] font-normal">are different jobs.</span></span></div>
              </h2>
            </div>

            {/* Paragraphs with Top-Down Mask Reveal */}
            <div className="space-y-6">
              <div className="overflow-hidden py-0.5">
                <p ref={para1Ref} className="text-[#6F6E67] text-sm sm:text-lg leading-relaxed font-light">
                  At 5,000 feet, the UV that lands on a south or west elevation chalks a one-product paint job to primer in three or four years — while the shaded walls stay fine. So we specify a higher-UV coating for the sun-facing walls and the standard line for the rest. On every quote, written down.
                </p>
              </div>
              <div className="overflow-hidden py-0.5">
                <p ref={para2Ref} className="text-[#6F6E67] text-sm sm:text-lg leading-relaxed font-light">
                  The house here is why: painted by someone else three years before these photos, fine on two elevations, chalked to primer on the other two. The homeowner had already paid once.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <a href="#quote" className="inline-flex items-center gap-4 px-7 py-4 rounded-full bg-[#111115] hover:bg-[#6B7263] text-white transition-all shadow-xl group text-decoration-none w-max">
                <span className="font-mono text-xs font-semibold tracking-wider">How to read two quotes side by side</span>
                <div className="w-6 h-6 rounded-full bg-white text-[#111115] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Before/After Slider */}
          <div ref={sliderContainerRef} className="lg:col-span-7">
            <div className="flex flex-col space-y-4">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl select-none group">
                
                {/* Parallax Wrapper */}
                <div ref={parallaxWrapperRef} className="absolute inset-0 w-full h-full origin-center">
                  {/* AFTER Image (Background) */}
                  <img 
                    src="/spec-03.jpg" 
                    alt="After painting" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none no-mask"
                    loading="lazy"
                  />

                  {/* BEFORE Image (Clipped overlay, simulated with CSS filters) */}
                  <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none bg-[#E6E6E1]"
                    style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
                  >
                    <img 
                      src="/spec-03.jpg" 
                      alt="Before painting" 
                      className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-75 saturate-50 sepia-[.15] no-mask"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Badges */}
                <div 
                  className="absolute top-5 left-5 bg-white/80 backdrop-blur-md text-[#111115] font-mono text-xs px-3 py-1.5 rounded-md font-semibold tracking-wider transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: sliderValue > 15 ? 1 : 0 }}
                >
                  Before
                </div>
                <div 
                  className="absolute top-5 right-5 bg-white/80 backdrop-blur-md text-[#111115] font-mono text-xs px-3 py-1.5 rounded-md font-semibold tracking-wider transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: sliderValue < 85 ? 1 : 0 }}
                >
                  After
                </div>

                {/* Custom Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-10 transition-transform"
                  style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Handle Knob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center text-[#111115] group-hover:scale-110 transition-transform duration-300 border border-black/5">
                    <ArrowLeftRight size={16} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Invisible Native Range Input for native dragging physics */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
                  aria-label="Image comparison slider"
                />
              </div>

              {/* Bottom Custom Range Track (matching the mockup) */}
              <div className="flex flex-col space-y-4 px-2">
                <div className="relative w-full h-2 bg-[#E6E6E1] rounded-full mt-2">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-[#111115] rounded-l-full" 
                    style={{ width: `${sliderValue}%` }}
                  />
                  <div 
                    className="absolute top-1/2 w-5 h-5 bg-[#111115] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"
                    style={{ left: `${sliderValue}%` }}
                  />
                </div>
                
                {/* Caption */}
                <p className="text-xs sm:text-sm text-[#6F6E67] font-light leading-relaxed">
                  Harmony corridor — failed by the sun at year three, then respecified — same house, same angle. Drag the line or use the slider.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
