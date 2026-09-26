import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowUpRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const containerRef = useRef(null);
  const heroImageWrapperRef = useRef(null);
  const heroImageRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtextRef = useRef(null);
  const tagRef = useRef(null);
  const cardsRef = useRef([]);
  const dontTakeOnRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Timeline
      gsap.set(tagRef.current, { opacity: 0, y: -20 });
      gsap.set([title1Ref.current, title2Ref.current], { yPercent: 115 });
      gsap.set(subtextRef.current, { yPercent: -20, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
      gsap.set(heroImageWrapperRef.current, { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0.5 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(heroImageWrapperRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.1,
        ease: 'power3.inOut',
      })
      .to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, "-=0.5")
      .to([title1Ref.current, title2Ref.current], {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      }, "-=0.3")
      .to(subtextRef.current, {
        yPercent: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.7,
        ease: 'power3.out',
      }, "-=0.4");

      // Parallax scroll on hero image
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15, yPercent: 0 },
        {
          yPercent: -15,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 2. Alternating Asymmetrical Cards Animations (Sharp Edges, Mask Reveal)
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const imgMask = card.querySelector('.card-img-mask');
        const img = card.querySelector('.card-img');
        const textElements = card.querySelectorAll('.card-anim-text');

        if (imgMask) {
          gsap.fromTo(
            imgMask,
            { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
            {
              clipPath: 'inset(0 0% 0 0)',
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
              },
            }
          );
        }

        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
              },
            }
          );
        }
      });

      // 3. What We Don't Take On Card Scroll Animation
      if (dontTakeOnRef.current) {
        gsap.fromTo(
          dontTakeOnRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dontTakeOnRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const serviceCards = [
    {
      title: 'Full exterior repaint',
      description: 'Body, trim and fascia, with the prep itemised on the quote — and the product specified per elevation.',
      price: '$6,500 – $14,500',
      specs: 'A 2,400 sq ft two-storey runs 4–6 days with a crew of 3',
      image: '/spec-03.jpg',
    },
    {
      title: 'Stucco & masonry recoat',
      description: 'Crack routing and patching, masonry primer, then elastomeric or breathable acrylic — depending on what the wall is doing.',
      price: '$7,000 – $16,000',
      specs: 'Typically 5–7 days',
      image: '/stucco-masonry.jpg',
    },
    {
      title: 'Deck, fence & pergola staining',
      description: 'Wash, sand, and a penetrating stain chosen for altitude UV rather than shelf appeal.',
      price: '$1,400 – $4,800',
      specs: '1–3 days',
      image: '/deck-staining.jpg',
    },
    {
      title: 'Trim, fascia & wood-rot repair',
      description: "We don't paint over rot. Soft boards are cut out, replaced, primed on all six sides, then painted.",
      price: '$1,800 – $5,200 as an add-on',
      specs: 'Occasionally standalone',
      image: '/wood-rot-repair.jpg',
    },
    {
      title: 'HOA & multi-building repaints',
      description: 'Phased so no building is masked over a weekend, with a written schedule the board can circulate.',
      price: 'Quoted per project',
      specs: 'Quoted per project',
      image: '/hoa-repaints.jpg',
    },
    {
      title: 'Colour consultation & covenant submission',
      description: 'Included with any full repaint — large drawdown samples on your actual walls, and the HOA packet handled for you.',
      price: 'Included with any full repaint',
      specs: 'Two hours on-site',
      image: '/colour-consultation.jpg',
    }
  ];

  const dontTakeOnItems = [
    {
      title: "Interior painting — a different trade with a different crew and a different way of failing",
    },
    {
      title: "Cabinet refinishing",
    },
    {
      title: "Roofing and gutters (we'll refer you to people we trust)",
    },
    {
      title: "Lead-paint abatement beyond RRP-compliant renovation",
    },
    {
      title: "Shared-lead marketplace jobs — direct estimates only",
    },
    {
      title: "Jobs under $1,200, which doesn't cover a crew day",
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F6F3] text-[#131312] selection:bg-[#AAB8A2]">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section (100vh) */}
      <section className="relative w-full h-screen h-[100vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-28 pb-14 px-6 sm:px-12 lg:px-16 select-none">
        
        {/* AI Hero Background Image Container */}
        <div 
          ref={heroImageWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none origin-center"
        >
          <img 
            ref={heroImageRef}
            src="/services-hero.jpg" 
            alt="Ninebark Exterior Services Hero" 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/45 to-[#131312]/30" />
        </div>

        {/* Top Tagline */}
        <div ref={tagRef} className="relative z-10 max-w-[1700px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#AAB8A2] animate-pulse"></span>
            Painting services
          </div>
        </div>

        {/* Lower Left Title & Content */}
        <div className="relative z-10 max-w-[1700px] mx-auto w-full">
          <div className="max-w-4xl space-y-5 text-left">
            <div className="space-y-1 overflow-hidden">
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title1Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  What we do — and what
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title2Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  the number usually looks like
                </h1>
              </div>
            </div>

            <div className="overflow-hidden py-1">
              <p 
                ref={subtextRef}
                className="text-sm sm:text-lg lg:text-xl font-light text-slate-200/95 max-w-2xl leading-relaxed drop-shadow"
              >
                Every range below is a genuine ballpark for this market, not a teaser rate. The exact number comes from Mari walking your house, and it arrives itemised — prep, line by line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Asymmetrical Service Rows (Sharp Edges, Alternating Photo Left / Photo Right) */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="space-y-28 sm:space-y-36">
          {serviceCards.map((service, index) => {
            const isPhotoLeft = index % 2 === 0;

            return (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* PHOTO COLUMN */}
                <div className={`lg:col-span-6 ${isPhotoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Sharp Edges Image Container (rounded-none) */}
                  <div className="card-img-mask relative aspect-[4/3] sm:aspect-[16/11] rounded-none overflow-hidden shadow-2xl bg-[#E6E6E1] group">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-none"
                    />
                  </div>
                </div>

                {/* TEXT CONTENT COLUMN */}
                <div className={`lg:col-span-6 space-y-5 ${isPhotoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h2 className="card-anim-text title-serif-light text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-[#131312]">
                    {service.title}
                  </h2>

                  <p className="card-anim-text text-base sm:text-lg text-[#45443F] font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="card-anim-text space-y-1 pt-2">
                    <div className="text-xl sm:text-2xl font-semibold text-[#131312] font-sans">
                      {service.price}
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-[#6F6E67]">
                      {service.specs}
                    </div>
                  </div>

                  <div className="card-anim-text pt-4">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-4 px-7 py-3.5 rounded-full bg-[#131312] hover:bg-[#6B7263] text-white transition-all shadow-md group text-decoration-none"
                    >
                      <span className="font-mono text-xs font-semibold tracking-wider">Request elevation quote</span>
                      <div className="w-5 h-5 rounded-full bg-white text-[#131312] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* "What we don't take on" Card Section (Before Footer) */}
      <section className="pb-28 sm:pb-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div 
          ref={dontTakeOnRef}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-[#B5B4AC]/20 shadow-sm space-y-8"
        >
          {/* Section Header & Quote */}
          <div className="space-y-3">
            <h3 className="title-serif-light text-2xl sm:text-4xl text-[#131312]">
              What we don't take on
            </h3>
            <p className="text-sm sm:text-base text-[#6F6E67] font-light italic">
              "I'd rather be the best exterior painter in this county than a mediocre everything." — Mari
            </p>
          </div>

          {/* Grid of Excluded Items */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 pt-2">
            {dontTakeOnItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-[#888880] text-base leading-none font-sans select-none pt-0.5">✕</span>
                <p className="text-sm sm:text-base text-[#45443F] font-light leading-relaxed">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
