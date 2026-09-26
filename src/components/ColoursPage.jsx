import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ColoursPage() {
  const containerRef = useRef(null);
  const heroImageWrapperRef = useRef(null);
  const heroImageRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtextRef = useRef(null);
  const tagRef = useRef(null);
  const cardsRef = useRef([]);

  // Parallax Banner + Overlay Form Refs
  const parallaxContainerRef = useRef(null);
  const parallaxCardRef = useRef(null);
  const parallaxImgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline (100vh hero matching Services & Before/After layout)
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

      // Hero image parallax
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

      // 2. Alternating Cards Scroll Animations (Mask Reveal)
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

      // 3. 50vh Parallax Image Banner Animation
      if (parallaxContainerRef.current && parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: 15, scale: 1.15 },
          {
            yPercent: -15,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const colorSchemes = [
    {
      title: 'Old Town Restored',
      description: 'Pre-1940 clapboard — reads period-correct without being twee.',
      swatches: [
        { color: '#66756C', name: 'Body: Rosemary SW 6187' },
        { color: '#F2EFDF', name: 'Trim: Alabaster SW 7008' },
        { color: '#883133', name: 'Accent: Fireweed SW 6328 (door)' },
      ],
      image: '/old-town-after.jpg',
    },
    {
      title: 'Front Range Greige',
      description: '2000s stucco — the safest HOA approval in the county.',
      swatches: [
        { color: '#D6CEBE', name: 'Body: Accessible Beige SW 7036' },
        { color: '#F4F3EE', name: 'Trim: Pure White SW 7005' },
        { color: '#566061', name: 'Accent: Peppercorn SW 7674 (shutters)' },
      ],
      image: '/stucco-masonry.jpg',
    },
    {
      title: 'Foothill Slate',
      description: 'New-build repaints — the garage door does the work.',
      swatches: [
        { color: '#979187', name: 'Body: Dovetail SW 7018' },
        { color: '#F5F5F0', name: 'Trim: Extra White SW 7006' },
        { color: '#54514C', name: 'Accent: Urbane Bronze SW 7048 (garage)' },
      ],
      image: '/spec-03.jpg',
    },
    {
      title: 'Cottonwood',
      description: 'Small single-storeys — makes them read larger.',
      swatches: [
        { color: '#E8E3D8', name: 'Body: Shoji White SW 7042' },
        { color: '#F2EFE9', name: 'Trim: Snowbound SW 7004' },
        { color: '#3B4E5D', name: 'Accent: Naval SW 6244 (door)' },
      ],
      image: '/wood-rot-repair.jpg',
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F6F3] text-[#131312] selection:bg-[#AAB8A2]">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section (100vh) */}
      <section className="relative w-full h-screen h-[100vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-28 pb-14 px-6 sm:px-12 lg:px-16 select-none">
        
        {/* Hero AI Background Image */}
        <div 
          ref={heroImageWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none origin-center"
        >
          <img 
            ref={heroImageRef}
            src="/colors-hero.jpg" 
            alt="Ninebark Color Schemes Hero" 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/45 to-[#131312]/30" />
        </div>

        {/* Top Tagline */}
        <div ref={tagRef} className="relative z-10 max-w-[1700px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#AAB8A2] animate-pulse"></span>
            Colour library
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
                  Schemes that actually sell —
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title2Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  on real houses, not swatches
                </h1>
              </div>
            </div>

            <div className="overflow-hidden py-1">
              <p 
                ref={subtextRef}
                className="text-sm sm:text-lg lg:text-xl font-light text-slate-200/95 max-w-2xl leading-relaxed drop-shadow"
              >
                Every scheme below is on a house we painted in this service area. A two-inch chip lies about a whole wall; a whole wall doesn't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Color Cards Section (Photo Left, Text Right then alternate) */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="space-y-28 sm:space-y-36">
          {colorSchemes.map((scheme, index) => {
            const isPhotoLeft = index % 2 === 0;

            return (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* PHOTO COLUMN */}
                <div className={`lg:col-span-6 ${isPhotoLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="card-img-mask relative aspect-[4/3] sm:aspect-[16/11] rounded-none overflow-hidden shadow-2xl bg-[#E6E6E1] group">
                    <img 
                      src={scheme.image} 
                      alt={scheme.title} 
                      className="card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-none"
                    />
                  </div>
                </div>

                {/* TEXT CONTENT & COLOR SWATCHES COLUMN */}
                <div className={`lg:col-span-6 space-y-6 ${isPhotoLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h2 className="card-anim-text title-serif-light text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-[#131312]">
                    {scheme.title}
                  </h2>

                  {/* Swatches Visual Indicator Row */}
                  <div className="card-anim-text flex items-center gap-3 py-1">
                    {scheme.swatches.map((swatch, sIdx) => (
                      <div key={sIdx} className="group/swatch relative">
                        <div 
                          className="w-10 h-10 rounded-full border border-black/10 shadow-md transition-transform group-hover/swatch:scale-110"
                          style={{ backgroundColor: swatch.color }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Swatches Color Breakdown Detail */}
                  <div className="card-anim-text space-y-1.5 pt-1 text-xs sm:text-sm font-light">
                    {scheme.swatches.map((swatch, sIdx) => (
                      <p key={sIdx} className="text-[#45443F]">
                        <strong className="font-semibold text-[#131312]">{swatch.name.split(':')[0]}:</strong> {swatch.name.split(':')[1]}
                      </p>
                    ))}
                  </div>

                  <p className="card-anim-text text-base sm:text-lg text-[#6F6E67] font-light leading-relaxed">
                    {scheme.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* "One Honest Warning & How the Consultation Works" Info Card Section */}
      <section className="pb-24 sm:pb-32 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#B5B4AC]/20 shadow-sm space-y-6">
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-[#45443F] font-light leading-relaxed">
              <strong className="font-semibold text-[#131312]">One honest warning:</strong> Deep saturated darks are never specified on a south or west elevation. They hold heat, they fade first, and at this altitude they will disappoint someone in year four. Mari will paint one on request, in writing, having said so.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#B5B4AC]/20">
            <p className="text-sm sm:text-base text-[#45443F] font-light leading-relaxed">
              <strong className="font-semibold text-[#131312]">How the consultation works:</strong> Large drawdown samples on your actual wall, viewed at three times of day. Never a fan deck — a two-inch chip lies about a whole wall. <a href="/services" className="underline font-medium text-[#131312] hover:text-[#6B7263] transition-colors">Colour consultation is included with any full repaint →</a>
            </p>
          </div>
        </div>
      </section>

      {/* 50vh Parallax Image Banner Section */}
      <section ref={parallaxContainerRef} className="relative z-20 bg-white w-full overflow-hidden">
        <div 
          ref={parallaxCardRef}
          className="relative overflow-hidden h-[50vh] min-h-[400px] w-full flex flex-col justify-end p-8 sm:p-16 lg:p-24"
        >
          <div className="w-full h-full absolute inset-0 overflow-hidden">
            <img
              ref={parallaxImgRef}
              src="/twilight.webp"
              alt="Twilight House Parallax"
              className="w-full h-[130%] object-cover absolute -top-[15%] left-0 right-0 no-mask"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />

          {/* Text & CTA Overlay */}
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-[1700px] mx-auto">
            <div className="max-w-3xl flex flex-col space-y-3">
              <h2 className="text-white text-3xl sm:text-5xl font-light leading-[1.1] tracking-tight">
                The sun does the damage up here.<br />
                We paint like we know it
              </h2>
              <p className="text-white/80 text-sm sm:text-base font-light">
                six projects, matched angle for angle, same house in both frames.
              </p>
            </div>

            <a
              href="#quote"
              className="shrink-0 inline-flex items-center gap-3 bg-white text-[#111115] px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:bg-white/90 self-start md:self-end text-decoration-none"
            >
              <span>Start your build</span>
              <div className="w-6 h-6 rounded-full bg-[#111115] text-white flex items-center justify-center text-xs">
                →
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Overlay Section */}
      <section className="py-20 sm:py-28 bg-[#F6F6F3] px-6 sm:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-[#B5B4AC]/30 shadow-sm space-y-8">
          <div className="space-y-3">
            <p className="text-base sm:text-xl text-[#131312] font-light leading-relaxed">
              Mari answers every estimate request the same day she gets it — and you'll have an itemised written quote within two business days of her walking your house. Itemised means you can see the prep, line by line, and hold anyone <span className="text-[#6F6E67]">else's quote up against it.</span>
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-[#6F6E67]">Name</label>
                <input 
                  type="text" 
                  placeholder="Mari Rossi"
                  className="w-full bg-transparent border-b border-[#B5B4AC]/60 pb-3 text-sm focus:border-[#131312] outline-none font-light transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-[#6F6E67]">Phone</label>
                <input 
                  type="tel" 
                  placeholder="(970) 555-0192"
                  className="w-full bg-transparent border-b border-[#B5B4AC]/60 pb-3 text-sm focus:border-[#131312] outline-none font-light transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-[#6F6E67]">Email</label>
                <input 
                  type="email" 
                  placeholder="mari@ninebarkexteriors.com"
                  className="w-full bg-transparent border-b border-[#B5B4AC]/60 pb-3 text-sm focus:border-[#131312] outline-none font-light transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#131312] text-white py-4 px-8 rounded-full flex items-center justify-between hover:bg-[#6B7263] transition-colors cursor-pointer group shadow-md"
              >
                <span className="font-mono text-sm font-medium tracking-wide">Get my ballpark price</span>
                <div className="w-8 h-8 rounded-full bg-white text-[#131312] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </form>

          <p className="text-xs text-[#6F6E67] font-light leading-relaxed pt-2">
            Prefer the full picture? The <span className="underline cursor-pointer">one-minute ballpark wizard</span> gives you a price range too. Hablamos español — estimates and the whole job can run in Spanish, on every crew, every day. · Demo form: submissions go nowhere — see the privacy notice.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
