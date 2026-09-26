import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowLeftRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper component for individual Before & After Interactive Slider Cards
function ProjectCard({ project, index }) {
  const [sliderValue, setSliderValue] = useState(100);
  const cardRef = useRef(null);
  const isImageRight = index % 2 === 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance mask reveal for card container
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
          },
        }
      );

      // 2. Automatic animation on scroll: slider moves from 100 (Before) to 50 (Halfway After)
      const proxy = { val: 100 };
      gsap.to(proxy, {
        val: 50,
        duration: 1.8,
        delay: 0.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 65%',
        },
        onUpdate: () => {
          setSliderValue(proxy.val);
        }
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      
      {/* TEXT CONTENT COLUMN */}
      <div className={`lg:col-span-6 space-y-5 ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
        <div>
          <h2 className="title-serif-light text-3xl sm:text-4xl lg:text-5xl text-[#131312] leading-tight">
            {project.title}
          </h2>
          <p className="font-mono text-xs text-[#6F6E67] uppercase tracking-wider mt-1.5">
            {project.subtitle}
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#45443F] font-light leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-2 pt-1 text-xs sm:text-sm font-light">
          <p className="text-[#45443F]">
            <strong className="font-semibold text-[#131312]">Scope:</strong> {project.scope}
          </p>
          <p className="text-[#45443F]">
            <strong className="font-semibold text-[#131312]">Paint:</strong> {project.paint}
          </p>
        </div>

        {/* Highlight Quote Box */}
        <div className="p-5 rounded-2xl bg-[#E6E6E1]/50 border-l-2 border-[#6B7263]">
          <p className="text-xs sm:text-sm text-[#45443F] font-light italic leading-relaxed">
            {project.quote}
          </p>
        </div>
      </div>

      {/* IMAGE SLIDER COLUMN */}
      <div className={`lg:col-span-6 space-y-4 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl select-none group bg-[#E6E6E1]">
          
          {/* AFTER Image */}
          <img 
            src={project.imageAfter} 
            alt={`${project.title} After`} 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* BEFORE Image Overlay (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden bg-[#E6E6E1]"
            style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
          >
            <img 
              src={project.imageBefore} 
              alt={`${project.title} Before`} 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[0.8] saturate-[0.4] sepia-[0.25]"
            />
          </div>

          {/* Badges */}
          <div 
            className="absolute top-4 left-4 bg-[#131312]/80 backdrop-blur-md text-white font-mono text-xs px-3 py-1.5 rounded-md font-medium tracking-wider transition-opacity duration-300 pointer-events-none"
            style={{ opacity: sliderValue > 15 ? 1 : 0 }}
          >
            Before
          </div>
          <div 
            className="absolute top-4 right-4 bg-[#131312]/80 backdrop-blur-md text-white font-mono text-xs px-3 py-1.5 rounded-md font-medium tracking-wider transition-opacity duration-300 pointer-events-none"
            style={{ opacity: sliderValue < 85 ? 1 : 0 }}
          >
            After
          </div>

          {/* Vertical Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-10"
            style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-[#131312] border border-black/10 group-hover:scale-110 transition-transform">
              <ArrowLeftRight size={15} strokeWidth={2.5} />
            </div>
          </div>

          {/* Invisible Range Drag Input */}
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
            aria-label="Before and after slider"
          />
        </div>

        {/* Range Slider Track & Caption */}
        <div className="space-y-3 px-1">
          <div className="relative w-full h-1.5 bg-[#E6E6E1] rounded-full">
            <div 
              className="absolute top-0 bottom-0 left-0 bg-[#131312] rounded-l-full" 
              style={{ width: `${sliderValue}%` }}
            />
            <div 
              className="absolute top-1/2 w-4 h-4 bg-[#131312] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"
              style={{ left: `${sliderValue}%` }}
            />
          </div>

          <p className="text-xs sm:text-sm text-[#6F6E67] font-light">
            {project.caption}
          </p>
        </div>
      </div>

    </div>
  );
}

export default function BeforeAfterPage() {
  const containerRef = useRef(null);
  const heroImageWrapperRef = useRef(null);
  const heroImageRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtextRef = useRef(null);
  const tagRef = useRef(null);

  // Parallax Banner + Overlay Form Refs
  const parallaxContainerRef = useRef(null);
  const parallaxCardRef = useRef(null);
  const parallaxImgRef = useRef(null);

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

      // 2. Bottom 50vh Parallax Banner & Overlay Contact Form Animations
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

  const projects = [
    {
      title: 'Water Valley two-storey stucco',
      subtitle: 'Water Valley, Windsor · 2025 · 7 days, crew of 4',
      description: 'Chalking so far gone it came off on a hand, plus hairline cracking across the south gable from freeze-thaw. Cracks routed and patched, masonry primer, then a recoat in a warmer greige the HOA had already approved for the street. The deck was done the same week so the whole exterior reads as one finished project.',
      scope: 'Full stucco recoat + rear deck and pergola stain, two-storey, ~3,100 sq ft plus 600 sq ft of deck.',
      paint: 'Loxon XP masonry — body Accessible Beige SW 7036, trim Pure White SW 7005, shutters Peppercorn SW 7674; deck in a penetrating semi-transparent Cedar Tone',
      quote: 'The HOA colour packet was prepared and submitted by Ninebark; board approval came back in 9 days and the job started on schedule.',
      caption: 'Water Valley, Windsor · 2025 — same house, same angle. Drag the line or use the slider.',
      imageBefore: '/stucco-masonry.jpg',
      imageAfter: '/stucco-masonry.jpg',
    },
    {
      title: 'Harmony corridor south-wall failure',
      subtitle: 'Harmony / Fossil Creek, Fort Collins · 2024 · 5 days, crew of 3',
      description: 'Painted three years earlier by another contractor. The north and east walls were fine; the south and west had chalked to primer. Same house, same paint, different sun. This is the job that made Ninebark start writing elevation-specific product into every quote — and the homeowner had already paid once, which is exactly why it matters.',
      scope: 'Full repaint after a 3-year-old paint job failed on two elevations. Two-storey, ~2,400 sq ft.',
      paint: 'Emerald Rain Refresh on south + west, Duration on north + east — deliberately two products. Trim Snowbound SW 7004',
      quote: 'The failed walls were photographed beside the intact ones on the same house — far more convincing than any before/after of two different homes.',
      caption: 'Harmony / Fossil Creek, Fort Collins · 2024 — same house, same angle. Drag the line or use the slider.',
      imageBefore: '/spec-03.jpg',
      imageAfter: '/spec-03.jpg',
    },
    {
      title: 'Timnath new-build, builder-grade to specified',
      subtitle: 'Timnath · 2026 · 4 days, crew of 3',
      description: 'A builder-grade single-coat finish that had never really covered, on a street of eleven houses in three colours. Repainted into a palette that reads as deliberate rather than allocated. Two neighbours booked off the back of it before the masking came down.',
      scope: 'Full repaint of a 7-year-old builder-finished home, body + trim + garage doors, ~2,800 sq ft.',
      paint: 'Duration — body Dovetail SW 7018, trim Extra White SW 7006, garage doors Urbane Bronze SW 7048',
      quote: 'Garage doors — the largest single surface on most new-build façades and almost always left builder-white — carried the whole change.',
      caption: 'Timnath · 2026 — same house, same angle. Drag the line or use the slider.',
      imageBefore: '/before-after-hero.jpg',
      imageAfter: '/before-after-hero.jpg',
    },
    {
      title: 'Registry Ridge fascia rot + repaint',
      subtitle: 'Registry Ridge, Fort Collins · 2024 · 3 days, crew of 2',
      description: 'Two previous contractors had painted straight over soft fascia. A screwdriver went through it in four places on the walkthrough. All of it was cut out and replaced, primed on six sides, then painted — the repair is the job, and the paint is what makes it invisible.',
      scope: 'Wood-rot repair (fascia, two window sills, one porch post base) + full trim repaint and body spot-touch. Single storey, ~1,500 sq ft.',
      paint: 'Duration — trim Pure White SW 7005, shutters & door Naval SW 6244',
      quote: "The screwdriver test is filmed on every walkthrough. Watch it on the wood-rot page — it's the most-watched thing we've ever posted.",
      caption: 'Registry Ridge, Fort Collins · 2024 — same house, same angle. Drag the line or use the slider.',
      imageBefore: '/wood-rot-repair.jpg',
      imageAfter: '/wood-rot-repair.jpg',
    },
    {
      title: 'Harmony Club HOA, four-building phase',
      subtitle: 'Harmony Club, Fort Collins · 2025 · 19 working days, both crews, 6 painters',
      description: 'Sequenced one building at a time with a written schedule the board circulated to residents a week ahead, so nobody woke to a masked window without warning. Zero resident complaints logged across the phase — which is what won Phase 2.',
      scope: 'Phase 1 of a multi-year HOA repaint — 4 buildings, 22 units, body + trim + all common-area railings.',
      paint: 'Emerald — body Anew Gray SW 7030, trim Alabaster SW 7008; railings in DTM acrylic, Iron Ore SW 7069',
      quote: 'The deliverable the board actually valued was the schedule, not the paint.',
      caption: 'Harmony Club, Fort Collins · 2025 — same house, same angle. Drag the line or use the slider.',
      imageBefore: '/hoa-repaints.jpg',
      imageAfter: '/hoa-repaints.jpg',
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F6F3] text-[#131312] selection:bg-[#AAB8A2]">
      {/* Navbar Navigation */}
      <Navbar />

      {/* Hero Section (100vh) */}
      <section className="relative w-full h-screen h-[100vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-28 pb-14 px-6 sm:px-12 lg:px-16 select-none">
        
        {/* Hero Background Image Container */}
        <div 
          ref={heroImageWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none origin-center"
        >
          <img 
            ref={heroImageRef}
            src="/before-after-hero.jpg" 
            alt="Ninebark Before & After Hero" 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/45 to-[#131312]/30" />
        </div>

        {/* Top Tagline */}
        <div ref={tagRef} className="relative z-10 max-w-[1700px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#AAB8A2] animate-pulse"></span>
            Before & after
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
                  Drag the line. That's the
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title2Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  same house, same angle.
                </h1>
              </div>
            </div>

            <div className="overflow-hidden py-1">
              <p 
                ref={subtextRef}
                className="text-sm sm:text-lg lg:text-xl font-light text-slate-200/95 max-w-2xl leading-relaxed drop-shadow"
              >
                Six real projects across the service area. Photos are shared with each homeowner's permission — neighbourhood only, never an address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section: 5 Detailed Before/After Cards */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="space-y-28 sm:space-y-36">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
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

      {/* Contact Form Overlay Section (Just Before Footer) */}
      <section className="py-20 sm:py-28 bg-[#F6F6F3] px-6 sm:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-[#B5B4AC]/30 shadow-sm space-y-8">
          {/* Header text from user screenshot */}
          <div className="space-y-3">
            <p className="text-base sm:text-xl text-[#131312] font-light leading-relaxed">
              Mari answers every estimate request the same day she gets it — and you'll have an itemised written quote within two business days of her walking your house. Itemised means you can see the prep, line by line, and hold anyone <span className="text-[#6F6E67]">else's quote up against it.</span>
            </p>
          </div>

          {/* Form Fields: Name, Phone, Email */}
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

            {/* Dark Pill CTA Button matching screenshot */}
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

          {/* Subtext Notice matching screenshot */}
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
