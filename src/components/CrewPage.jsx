import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight, ShieldCheck, UserCheck, Award, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CrewPage() {
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
      // 1. Hero Entrance Timeline (100vh hero matching existing layout)
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

      // 2. Card Scroll Animations
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
            },
          }
        );
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

  const crewValues = [
    {
      icon: UserCheck,
      title: 'Mari & Lead Craftspeople',
      description: 'Mari walks every job site personally. Every estimate is itemised line by line by the exact team lead who executes the prep.',
      metric: 'Owner-operated',
      submetric: 'Direct oversight on all jobs'
    },
    {
      icon: ShieldCheck,
      title: 'EPA RRP Lead-Safe Certified',
      description: 'Our crews are fully certified for historic home restorations (pre-1978). Complete containment, HEPA vacuuming, and environmental protection.',
      metric: '100% Certified',
      submetric: 'Full lead-safe compliance'
    },
    {
      icon: Award,
      title: 'Zero Subcontractors',
      description: 'We do not pass your home to third-party day laborers. Every painter on your house is an experienced, long-standing Ninebark crew member.',
      metric: 'W-2 Dedicated Crew',
      submetric: 'Consistent quality control'
    },
    {
      icon: HeartHandshake,
      title: 'Written Daily Schedules',
      description: 'No unannounced arrivals or masked windows over weekends. We sequence one elevation or building at a time with clear resident notice.',
      metric: 'Structured Workflow',
      submetric: 'Respected property boundaries'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F6F3] text-[#131312] selection:bg-[#AAB8A2]">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Section (100vh with Team Backs-to-Camera Hero Image) */}
      <section className="relative w-full h-screen h-[100vh] min-h-[650px] overflow-hidden flex flex-col justify-between pt-28 pb-14 px-6 sm:px-12 lg:px-16 select-none">
        
        {/* Team Hero Background Image (Facing backs to camera) */}
        <div 
          ref={heroImageWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none origin-center"
        >
          <img 
            ref={heroImageRef}
            src="/crew-hero.jpg" 
            alt="Ninebark Crew Team Facing Backs To Camera" 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/95 via-[#131312]/50 to-[#131312]/35 z-10" />
        </div>

        {/* Top Tagline */}
        <div ref={tagRef} className="relative z-20 max-w-[1700px] mx-auto w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#AAB8A2] animate-pulse"></span>
            Our crew & culture
          </div>
        </div>

        {/* Lower Left Title & Content */}
        <div className="relative z-20 max-w-[1700px] mx-auto w-full">
          <div className="max-w-4xl space-y-5 text-left">
            <div className="space-y-1 overflow-hidden">
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title1Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  The whole company exists
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 
                  ref={title2Ref}
                  className="title-serif-light text-3xl sm:text-5xl lg:text-7xl xl:text-[4.5rem] font-light text-white leading-[1.02] tracking-tight drop-shadow-md inline-block"
                >
                  because one wall failed.
                </h1>
              </div>
            </div>

            <div className="overflow-hidden py-1">
              <p 
                ref={subtextRef}
                className="text-sm sm:text-lg lg:text-xl font-light text-slate-200/95 max-w-2xl leading-relaxed drop-shadow"
              >
                Mari started Ninebark to fix what standard contractors ignore: altitude UV exposure, hasty prep, and subcontracted guesswork. We build long-term relationships through craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Crew Values & Standards Grid Section */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 max-w-[1700px] mx-auto">
        <div className="space-y-6 mb-16 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6B7263]"></span>
            <span className="font-mono text-xs text-[#6F6E67] uppercase tracking-widest">
              Craftsmanship & Accountability
            </span>
          </div>
          <h2 className="title-serif-light text-3xl sm:text-5xl text-[#131312] leading-tight">
            How our crews work on your home
          </h2>
          <p className="text-base sm:text-lg text-[#45443F] font-light leading-relaxed">
            Every crew is led by seasoned painters who take pride in meticulous surface preparation, elevation-specific coating, and clean site management.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {crewValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div 
                key={idx}
                ref={el => cardsRef.current[idx] = el}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-[#B5B4AC]/30 shadow-sm flex flex-col justify-between space-y-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6E6E1] text-[#131312] flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F6F6F3] text-[#6F6E67] border border-[#B5B4AC]/30">
                      {value.metric}
                    </span>
                  </div>

                  <h3 className="title-serif-light text-2xl sm:text-3xl text-[#131312]">
                    {value.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#45443F] font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B5B4AC]/20 flex items-center justify-between text-xs font-mono text-[#6F6E67]">
                  <span>{value.submetric}</span>
                  <span className="text-[#131312] font-semibold">Ninebark Standard</span>
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
