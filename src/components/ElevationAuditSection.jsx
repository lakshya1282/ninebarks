import React from 'react';
import ParallaxImage from './ParallaxImage';

export default function ElevationAuditSection() {
  return (
    <section className="relative z-20 bg-white pt-12 sm:pt-16 pb-2 sm:pb-4 px-6 sm:px-16 overflow-hidden border-t border-[#E5E5DF]">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Top Feature Headers (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-12 sm:mb-16">
          {/* Feature 1 */}
          <div className="flex flex-col space-y-4">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-[#F6F6F3] flex items-center justify-center text-[#111115] text-xl shadow-sm border border-[#EBEBE6]">
              ◐
            </div>
            {/* Title */}
            <h3 
              className="text-[#111115] text-xl sm:text-2xl font-medium tracking-tight"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              Elevation-specified
            </h3>
            {/* Description */}
            <p 
              className="text-[#6F6E67] text-sm sm:text-base leading-relaxed font-light max-w-lg"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              Higher-UV coatings on the south and west, the standard line where the sun doesn't land. Written into every quote.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col space-y-4">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-[#F6F6F3] flex items-center justify-center text-[#111115] text-xl shadow-sm border border-[#EBEBE6]">
              ☰
            </div>
            {/* Title */}
            <h3 
              className="text-[#111115] text-xl sm:text-2xl font-medium tracking-tight"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              Prep you can audit
            </h3>
            {/* Description */}
            <p 
              className="text-[#6F6E67] text-sm sm:text-base leading-relaxed font-light max-w-lg"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              Scrape, sand, spot-prime, caulk, rot cut out and replaced — each its own line, so a cheaper quote has nowhere to hide.
            </p>
          </div>
        </div>

        {/* Bottom Cards (2 columns: left portrait with quote badge, right landscape video/image showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-8 group shadow-sm">
            <ParallaxImage 
              src="/painter-portrait.jpg" 
              alt="Elevation Painter Specialist" 
              containerClassName="absolute inset-0 w-full h-full"
              imageClassName="transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Left Floating Badge */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 max-w-md shadow-lg border border-white/40">
              <div className="flex justify-between items-start mb-2">
                <p 
                  className="text-[#111115] text-base sm:text-lg font-medium pr-4"
                  style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                >
                  "We stayed until it got dark."
                </p>
                <span className="text-[#111115] text-xl font-serif">“</span>
              </div>
              <p 
                className="text-[#76766F] text-xs sm:text-sm font-light"
                style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
              >
                The first family to view it, spring 2026
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-8 group shadow-sm">
            <ParallaxImage 
              src="/modern-house.jpg" 
              alt="Modern House Exterior" 
              containerClassName="absolute inset-0 w-full h-full"
              imageClassName="transition-transform duration-700 group-hover:scale-105"
            />
            {/* Video Scrubber bar effect */}
            <div className="relative z-10 w-full bg-white/20 backdrop-blur-md h-2 rounded-full overflow-hidden p-0.5 border border-white/30">
              <div className="bg-white h-full rounded-full w-2/3 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
