import React from 'react';

export default function PaintIsntTheProblem() {
  return (
    <section className="bg-white text-[#111115] flex flex-col justify-center items-center pt-8 sm:pt-14 pb-2 sm:pb-4 px-6 sm:px-16 relative z-20">
      <div className="max-w-[1400px] mx-auto w-full text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        
        {/* Main Display Title */}
        <h2 
          className="text-[#000000] max-w-6xl text-center"
          style={{ 
            fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(38px, 6.8vw, 112px)',
            lineHeight: 0.96,
            letterSpacing: '-0.045em',
            color: '#000000'
          }}
        >
          The Paint Isn’t <br className="hidden sm:inline" />
          the Problem
        </h2>

        {/* Center-Aligned Detail Paragraph */}
        <div className="max-w-3xl text-center w-full pt-1">
          <p 
            className="text-base sm:text-lg lg:text-xl text-[#6F6E67] leading-relaxed font-light"
            style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
          >
            <strong className="font-medium text-[#111115]">Most people who call us</strong> already have the name — from a neighbour, a van, or a board.{' '}
            <strong className="font-medium text-[#111115]">What they want to know is</strong> why the finish failed last time, and why it won't this time.{' '}
            <span className="text-[#111115]">That's the whole conversation.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
