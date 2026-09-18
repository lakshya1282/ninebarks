import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const containerRef = useRef(null);
  const titleLinesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleLinesRef.current,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 space-y-1">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-gray-900 inline-block">
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[0] = el} className="block">Let's discuss</span></div>
            <div className="overflow-hidden py-1"><span ref={el => titleLinesRef.current[1] = el} className="block">your project</span></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Ready to transform your home's exterior? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <form className="bg-[#F6F6F3]/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 ml-1">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300 outline-none"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 ml-1">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300 outline-none"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300 outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2 mb-10">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 ml-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-200 focus:border-black focus:ring-0 transition-colors duration-300 outline-none resize-none"
              placeholder="Tell us about your home..."
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full bg-black text-white py-5 rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 group"
          >
            Send Message
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
