import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function WhoThisIsFor() {
  return (
    <section id="about" className="py-24 sm:py-36 bg-[#F6F6F3] text-[#111115] border-t border-[#B5B4AC]/40 relative z-20">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-16">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Eyebrow, Title & Sub-paragraph */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#6F6E67] tracking-widest uppercase block">
                (01) ABOUT NINEBARK
              </span>
              <h2 className="title-serif-light text-4xl sm:text-5xl lg:text-6xl text-[#111115] font-light leading-tight">
                Who this is for
              </h2>
            </div>

            <p className="text-detail-light text-base sm:text-lg text-[#6F6E67] leading-relaxed max-w-md pt-2">
              We create long-lasting exterior finishes where preparation and UV science exist in perfect balance. Every project is engineered to withstand Colorado's extreme altitude exposure.
            </p>
          </div>

          {/* Right Column: Enforced Large Editorial Text (54px / clamp(32px, 3.2vw, 54px)) */}
          <div className="lg:col-span-7 space-y-10">
            <p
              className="editorial-hero-para"
              style={{
                fontFamily: 'Inter, "Inter Fallback", system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(28px, 2.8vw, 48.7px)',
                lineHeight: '1.22',
                letterSpacing: 'normal',
                wordSpacing: '0.06em',
              }}
            >
              <strong className="font-medium text-[#111115]" style={{ fontWeight: 500 }}>
                Most people who call us
              </strong>{' '}
              <span className="text-[#6F6E67] font-light">already have the name —</span>{' '}
              <strong className="font-medium text-[#111115]" style={{ fontWeight: 500 }}>
                from a neighbour, a van, or a board.
              </strong>{' '}
              <span className="text-[#6F6E67] font-light">What they want to know is</span>{' '}
              <strong className="font-medium text-[#111115]" style={{ fontWeight: 500 }}>
                why the finish failed last time, and why it won't this time.
              </strong>{' '}
              <span className="text-[#6F6E67] font-light">That's the whole conversation.</span>
            </p>

            {/* Pill CTA Button */}
            <div className="pt-2">
              <a
                href="#process"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111115] hover:bg-[#6B7263] text-white font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl group text-decoration-none"
              >
                <span>Our Process</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#111115] transition-colors">
                  <ArrowRight size={14} />
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
