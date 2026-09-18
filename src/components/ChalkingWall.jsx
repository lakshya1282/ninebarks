import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: '01',
    title: 'The chalking south wall',
    text: "Paint under five years old, already fading on the sunny side. That isn't bad luck — it's specification.",
    image: '/chalk.jpg',
  },
  {
    id: '02',
    title: 'Collecting three quotes',
    text: 'Two are a single number on a page. Ours is itemised so you can see exactly what the cheap one leaves out.',
    image: '/spec-02.jpg',
  },
  {
    id: '03',
    title: 'The new build fading early',
    text: 'Builder-grade paint is a one-coat budget line. On a sun-facing wall it can go flat before the loan does.',
    image: '/spec-03.jpg',
  },
  {
    id: '04',
    title: 'Trim & cedar rot',
    text: "Peeling trim and soft fascia need carpentry before colour. We cut out the rot and replace it — it's on the quote.",
    image: '/spec-04.jpg',
  },
  {
    id: '05',
    title: 'HOA boards & managers',
    text: 'A written schedule residents see a week ahead, one building at a time, one point of contact.',
    image: '/spec-05.jpg',
  },
  {
    id: '06',
    title: 'Realtors on a deadline',
    text: 'A listing repaint, started on the promised date. 94% of our 2025 jobs did.',
    image: '/spec-06.jpg',
  },
];

export default function ChalkingWall() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const titleLinesRef = useRef([]);
  const paraRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

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
            trigger: container,
            start: 'top 60%',
          },
        }
      );

      // 2. Paragraph Mask Reveal Top Down
      gsap.fromTo(
        paraRef.current,
        { yPercent: -30, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 58%',
          },
        }
      );

      // 3. Card Images Mask Down Reveal
      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const img = cardEl.querySelector('img');
          if (img) {
            gsap.fromTo(
              img,
              { clipPath: 'inset(0 0 100% 0)', scale: 1.15 },
              {
                clipPath: 'inset(0 0 0% 0)',
                scale: 1,
                duration: 1.0,
                delay: idx * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: container,
                  start: 'top 55%',
                },
              }
            );
          }
        });
      }

      // 4. Horizontal Scroll Track (Desktop Only)
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(trackWidth - viewportWidth + 64);
        };

        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${trackRef.current.scrollWidth - window.innerWidth + 300}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={containerRef} 
      className="relative z-20 bg-white overflow-hidden h-[100svh] flex flex-col justify-center pt-8 sm:pt-12 pb-4"
    >
      {/* Title & Paragraph */}
      <div className="max-w-[1400px] mx-auto w-full text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-6 sm:px-16 mb-8 sm:mb-12 shrink-0">
        <div className="space-y-1">
          <h2 
            className="title-serif-light font-medium text-[#000000] max-w-6xl text-center inline-block"
            style={{ 
              fontSize: 'clamp(32px, 6.8vw, 112px)',
              lineHeight: 0.96,
              letterSpacing: '-0.045em',
              color: '#000000'
            }}
          >
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[0] = el} className="block">The Paint Isn’t</span></div>
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[1] = el} className="block">the Problem</span></div>
          </h2>
        </div>
        <div className="max-w-3xl text-center w-full overflow-hidden py-1">
          <p 
            ref={paraRef}
            className="text-base sm:text-lg lg:text-xl text-[#6F6E67] leading-relaxed font-light"
            style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
          >
            <strong className="font-medium text-[#111115]">Most people who call us</strong> already have the name — from a neighbour, a van, or a board.{' '}
            <strong className="font-medium text-[#111115]">What they want to know is</strong> why the finish failed last time, and why it won't this time.{' '}
            <span className="text-[#111115]">That's the whole conversation.</span>
          </p>
        </div>
      </div>

      {/* Cards Track */}
      <div className="w-full shrink-0">
        <div 
          ref={trackRef} 
          className="flex gap-4 sm:gap-8 px-6 sm:px-16 md:w-max items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative w-[85vw] sm:w-[380px] md:w-[420px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 shrink-0 group cursor-pointer snap-center"
            >
              {/* Full Background Image with mask down */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

              {/* Text Overlay at Bottom-Left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end space-y-2 text-left">
                <span className="font-mono text-xs sm:text-sm text-white/80 uppercase tracking-widest block">
                  {card.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-lg">
                  {card.title}
                </h3>
                <p className="text-white text-sm sm:text-base font-medium leading-relaxed pt-1 drop-shadow-xl">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
