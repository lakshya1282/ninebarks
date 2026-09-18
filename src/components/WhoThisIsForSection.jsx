import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const reviewsData = [
  {
    num: '01',
    author: 'Eleanor Vance',
    role: 'Homeowner, Boulder South Wall',
    rating: '★★★★★',
    text: "Two years in, the south-facing elevation looks identical to the day they packed up. Every other quote wanted to put the same paint everywhere.",
  },
  {
    num: '02',
    author: 'Marcus Vance',
    role: 'HOA Board President, Alpine Heights',
    rating: '★★★★★',
    text: 'Itemised prep meant zero surprises for the board. They replaced rot we didn’t even know was hiding behind the fascia.',
  },
  {
    num: '03',
    author: 'Sarah & Liam Miller',
    role: 'Custom Build Owners, Evergreen',
    rating: '★★★★★',
    text: 'Started on the exact Monday promised and finished early. Communication was daily. Worth every single dollar for peace of mind.',
  },
  {
    num: '04',
    author: 'Julian Thorne',
    role: 'Architect, Mountain Modern Studio',
    rating: '★★★★★',
    text: 'Ninebark is the only painter we specify for high-altitude cedar trim. Their UV coating chemistry knowledge is unmatched.',
  },
  {
    num: '05',
    author: 'David & Clara Wright',
    role: 'Residential Estate, Aspen Ridge',
    rating: '★★★★★',
    text: 'The crew left the site cleaner than they found it every evening. The UV-resistant finish still shines in high noon heat.',
  },
  {
    num: '06',
    author: 'Hannah Sterling',
    role: 'Property Director, Pinecrest Estates',
    rating: '★★★★★',
    text: 'They itemized every single step from scraping to spot-priming. A truly professional experience from start to finish.',
  },
];

export default function WhoThisIsForSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
  };

  const currentReview = reviewsData[currentIndex];

  // Get initials for avatar
  const getInitials = (name) => {
    const parts = name.split(/[\s&]+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Split text into headline and body
  const dotIndex = currentReview.text.indexOf('. ');
  const headline = dotIndex !== -1 ? currentReview.text.slice(0, dotIndex + 1) : currentReview.text;
  const body = dotIndex !== -1 ? currentReview.text.slice(dotIndex + 1).trim() : '';

  return (
    <section className="relative z-20 bg-white py-24 sm:py-32 px-6 sm:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* Left Side: Header & CTA */}
          <div className="w-full lg:w-[35%] space-y-6 sm:space-y-8 lg:pr-8">
            <div className="inline-block border border-[#111115]/20 rounded-full px-4 py-1.5">
              <span 
                className="text-[#111115] text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
              >
                · REVIEWS ·
              </span>
            </div>
            
            <h2 
              className="text-[#111115] text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight"
              style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
            >
              What Our Clients Say
            </h2>
            
            <button className="bg-[#111115] text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-4 hover:bg-[#111115]/90 transition-colors w-fit">
              <span className="text-sm font-medium">Get a Free Quote</span>
              <div className="bg-white text-[#111115] rounded-full p-1.5">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>

          {/* Right Side: Slider */}
          <div className="w-full lg:w-[65%] flex flex-col relative mt-8 lg:mt-0">
            <div className="w-full flex items-center relative">
              {/* Desktop Previous Button */}
              <button 
                onClick={prevReview}
                className="hidden sm:flex absolute left-0 z-10 -translate-x-1/2 w-12 h-12 bg-white border border-[#111115]/10 rounded-full items-center justify-center shadow-sm hover:shadow-md hover:-translate-x-[55%] transition-all text-[#111115]"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Review Card */}
              <div className="flex-1 bg-[#F8F8F7] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 min-h-[380px] flex flex-col justify-center w-full">
                <div className="space-y-6 sm:space-y-8">
                  <h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#111115] leading-tight"
                    style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                  >
                    {headline}
                  </h3>
                  
                  {body && (
                    <p 
                      className="text-[#6F6E67] text-base sm:text-lg leading-relaxed max-w-2xl"
                      style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                    >
                      {body}
                    </p>
                  )}

                  <div className="pt-8 mt-4 border-t border-[#111115]/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#111115] text-white flex items-center justify-center text-sm font-medium shrink-0">
                      {getInitials(currentReview.author)}
                    </div>
                    <div>
                      <p 
                        className="text-[#111115] font-medium"
                        style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                      >
                        {currentReview.author}
                      </p>
                      <p 
                        className="text-[#6F6E67] text-sm"
                        style={{ fontFamily: '"PP Neue Montreal", "Neue Montreal", system-ui, sans-serif' }}
                      >
                        {currentReview.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Next Button */}
              <button 
                onClick={nextReview}
                className="hidden sm:flex absolute right-0 z-10 translate-x-1/2 w-12 h-12 bg-white border border-[#111115]/10 rounded-full items-center justify-center shadow-sm hover:shadow-md hover:translate-x-[55%] transition-all text-[#111115]"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex sm:hidden justify-center gap-4 mt-8 w-full">
              <button 
                onClick={prevReview}
                className="w-12 h-12 bg-white border border-[#111115]/10 rounded-full flex items-center justify-center shadow-sm text-[#111115]"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextReview}
                className="w-12 h-12 bg-white border border-[#111115]/10 rounded-full flex items-center justify-center shadow-sm text-[#111115]"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
