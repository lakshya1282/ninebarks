import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AreasPage() {
  const containerRef = useRef(null);
  const heroImageWrapperRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtextRef = useRef(null);
  const tagRef = useRef(null);

  // Hover state for interactive column section
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);

  // Parallax Banner + Overlay Form Refs
  const parallaxContainerRef = useRef(null);
  const parallaxCardRef = useRef(null);
  const parallaxImgRef = useRef(null);

  // Slideshow state using existing images
  const slideshowImages = [
    '/spec-03.jpg',
    '/stucco-masonry.jpg',
    '/before-after-hero.jpg',
    '/hoa-repaints.jpg',
    '/old-town-after.jpg'
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
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

      // 2. 50vh Parallax Image Banner Animation
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

  const serviceAreas = [
    {
      title: 'Old Town / Old Town West (Fort Collins)',
      rank: '1',
      description: 'Historical clapboard & custom trim restorations requiring lead-safe EPA RRP containment.',
      image: '/old-town-after.jpg'
    },
    {
      title: 'Harmony corridor & Fossil Creek (Fort Collins)',
      rank: '2',
      description: 'Elevation-specific UV specifications for south/west facing wall sun chalking.',
      image: '/spec-03.jpg'
    },
    {
      title: 'Timnath',
      rank: '3',
      description: 'New-build single-coat upgrades, garage door contrast, and subdivision HOA coordination.',
      image: '/before-after-hero.jpg'
    },
    {
      title: 'Windsor & Water Valley',
      rank: '4',
      description: 'Two-storey stucco recoats, crack routing, and full rear deck/pergola penetrating stains.',
      image: '/stucco-masonry.jpg'
    },
    {
      title: 'Loveland (north & west)',
      rank: '5',
      description: 'Foothills weather-shielding, masonry priming, and custom architectural color matching.',
      image: '/wood-rot-repair.jpg'
    },
    {
      title: 'Wellington & Laporte / Bellvue',
      rank: '6',
      description: 'High-altitude UV paint coats and fascia wood-rot replacement.',
      image: '/hoa-repaints.jpg'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F6F3] text-[#131312] selection:bg-[#AAB8A2]">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section (100vh with House Image Slideshow using existing images) */}
      <section className="relative w-full h-screen h-[100vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-28 pb-14 px-6 sm:px-12 lg:px-16 select-none">
        
        {/* Slideshow Container */}
        <div 
          ref={heroImageWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none origin-center"
        >
          {slideshowImages.map((imgSrc, idx) => (
            <img 
              key={idx}
              src={imgSrc} 
              alt={`Ninebark Service Area House ${idx + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === currentSlideIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/45 to-[#131312]/30 z-10" />
        </div>

        {/* Top Tagline */}
        <div ref={tagRef} className="relative z-20 max-w-[1700px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#AAB8A2] animate-pulse"></span>
            Service area
          </div>
        </div>

        {/* Lower Left Title & Subtext */}
        <div className="relative z-20 max-w-[1700px] mx-auto w-full">
          <div className="max-w-4xl space-y-5 text-left">
            <div className="space-y-1 overflow-hidden">
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title1Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  Northern Colorado,
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title2Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  within reason
                </h1>
              </div>
            </div>

            <div className="overflow-hidden py-1">
              <p 
                ref={subtextRef}
                className="text-sm sm:text-lg lg:text-xl font-light text-slate-200/95 max-w-2xl leading-relaxed drop-shadow"
              >
                35 minutes from the shop is the working boundary. Past that, the job has to be big enough to justify the crew's hour on the road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Map Diagram & Frequency List Section */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Service Area Radius Diagram SVG */}
          <div className="lg:col-span-6 bg-[#E6E6E1]/60 border border-[#B5B4AC]/30 p-8 sm:p-12 rounded-3xl shadow-sm">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
              {/* Outer Dashed Working Boundary Circle */}
              <div className="absolute w-[82%] h-[82%] rounded-full border-2 border-dashed border-[#131312]/60 flex items-center justify-center">
                {/* Center Hub: Fort Collins */}
                <div className="absolute top-[48%] left-[46%] flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#131312]"></div>
                  <span className="font-semibold text-sm sm:text-base text-[#131312]">Fort Collins</span>
                </div>

                {/* Laporte */}
                <div className="absolute top-[32%] left-[34%] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45443F]"></div>
                  <span className="text-xs text-[#45443F] font-mono">Laporte</span>
                </div>

                {/* Wellington */}
                <div className="absolute top-[20%] right-[32%] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45443F]"></div>
                  <span className="text-xs text-[#45443F] font-mono">Wellington</span>
                </div>

                {/* Timnath */}
                <div className="absolute top-[56%] right-[22%] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45443F]"></div>
                  <span className="text-xs text-[#45443F] font-mono">Timnath</span>
                </div>

                {/* Windsor */}
                <div className="absolute bottom-[28%] right-[12%] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45443F]"></div>
                  <span className="text-xs text-[#45443F] font-mono">Windsor</span>
                </div>

                {/* Loveland */}
                <div className="absolute bottom-[18%] left-[40%] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45443F]"></div>
                  <span className="text-xs text-[#45443F] font-mono">Loveland</span>
                </div>
              </div>

              {/* Highway / Radius Line */}
              <div className="absolute w-[95%] h-[2px] bg-[#6B7263]/40 rotate-[-35deg]"></div>

              {/* Bottom Legend Label */}
              <div className="absolute bottom-2 text-center w-full">
                <span className="text-xs font-mono text-[#6F6E67]">
                  ~35 minutes from the shop — the working boundary
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Frequency Order Details */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="title-serif-light text-3xl sm:text-4xl lg:text-5xl text-[#131312] leading-tight">
              Where we work, in order of how often we're there
            </h2>

            <ol className="space-y-3 font-mono text-sm sm:text-base text-[#45443F] pt-2">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">1</span>
                <span>Old Town / Old Town West (Fort Collins)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">2</span>
                <span>Harmony corridor & Fossil Creek (Fort Collins)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">3</span>
                <span>Timnath</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">4</span>
                <span>Windsor</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">5</span>
                <span>Loveland (north & west)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">6</span>
                <span>Wellington</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#131312] text-white flex items-center justify-center text-xs">7</span>
                <span>Laporte / Bellvue</span>
              </li>
            </ol>

            <p className="text-sm sm:text-base text-[#6F6E67] font-light leading-relaxed pt-2">
              Greeley, Berthoud and Estes Park are "we'll take the right job" territory — a whole-house job in summer, yes; a small job in October, honestly no.
            </p>
            <p className="text-xs sm:text-sm text-[#45443F] font-mono">
              We'll tell you straight if you're outside the area we cover.
            </p>
          </div>

        </div>
      </section>

      {/* Redesigned Interactive Column Section (2 Rows: Row 1 Name, Row 2 Details, Image revealed on Hover) */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6B7263]"></span>
            <span className="font-mono text-xs text-[#6F6E67] uppercase tracking-widest">
              Your neighbourhood, specifically
            </span>
          </div>
          <h2 className="title-serif-light text-3xl sm:text-5xl text-[#131312]">
            Explore area specifications
          </h2>
        </div>

        {/* 3-Column Grid for Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {serviceAreas.map((area, index) => {
            const isHovered = hoveredAreaIndex === index;

            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredAreaIndex(index)}
                onMouseLeave={() => setHoveredAreaIndex(null)}
                className="bg-white rounded-3xl border border-[#B5B4AC]/30 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-8 relative cursor-pointer min-h-[380px] group"
              >
                {/* Background Image Revealed Smoothly on Hover */}
                <div 
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out pointer-events-none ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                >
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/95 via-[#131312]/80 to-[#131312]/50" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                  {/* ROW 1: NAME & PRIORITY RANK */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono px-3 py-1 rounded-full transition-colors duration-300 ${
                        isHovered 
                          ? 'bg-white/20 text-white border border-white/30' 
                          : 'bg-[#E6E6E1] text-[#6F6E67]'
                      }`}>
                        Rank #{area.rank}
                      </span>
                    </div>

                    <h3 className={`title-serif-light text-2xl sm:text-3xl leading-snug transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-[#131312]'
                    }`}>
                      {area.title}
                    </h3>
                  </div>

                  {/* ROW 2: DETAILS & CTA */}
                  <div className="space-y-6 pt-4 border-t border-black/10 group-hover:border-white/20 transition-colors">
                    <p className={`text-sm sm:text-base font-light leading-relaxed transition-colors duration-300 ${
                      isHovered ? 'text-slate-200' : 'text-[#45443F]'
                    }`}>
                      {area.description}
                    </p>

                    <div className="pt-2">
                      <div className={`inline-flex items-center gap-3 text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-[#131312]'
                      }`}>
                        <span>Check area schedule</span>
                        <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
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
