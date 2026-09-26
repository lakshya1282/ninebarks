import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title (Jaffa Group Style) */}
        <a href="#" className="flex items-center gap-3 text-decoration-none group">
          <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white font-serif text-xs font-semibold group-hover:border-white transition-all">
            N
          </div>
          <div className="flex flex-col">
            <span className="nav-serif-regular text-sm sm:text-base tracking-[0.15em] font-semibold text-white uppercase">
              Ninebark Exteriors
            </span>
            <span className="text-[8px] tracking-widest text-slate-300 uppercase font-mono">
              Prep · Product · UV Colour
            </span>
          </div>
        </a>

        {/* Center: Navigation Links (Matching Jaffa Group Reference) */}
        <nav className="hidden lg:flex items-center gap-8 nav-serif-regular text-sm font-medium text-slate-100">
          <a href="#home" className="hover:text-white transition-colors border-b-2 border-white pb-0.5">
            Home
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>

          {/* Services Link */}
          <a href="/services" className="hover:text-white transition-colors">
            Services
          </a>

          {/* Before & After Link */}
          <a href="/before-after" className="hover:text-white transition-colors">
            Before & After
          </a>

          {/* Crew Link */}
          <a href="/crew" className="hover:text-white transition-colors">
            Crew
          </a>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center gap-1 hover:text-white cursor-pointer bg-transparent border-none p-0 text-slate-100 font-medium text-sm"
            >
              <span>Resources</span>
              <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {resourcesOpen && (
              <div className="absolute left-0 top-8 w-48 bg-[#131312]/95 backdrop-blur-md border border-white/10 rounded-lg py-2 px-3 flex flex-col gap-2 text-xs font-mono text-slate-200 shadow-2xl">
                <a href="#resources" className="hover:text-white py-1">UV Paint Care Guide</a>
                <a href="#resources" className="hover:text-white py-1">Color Palette Portfolio</a>
              </div>
            )}
          </div>

          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Right: Primary CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center bg-white text-[#111115] rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white/90 transition-colors shadow-sm text-decoration-none"
          >
            <span className="text-xs font-medium tracking-wide mr-3 ml-2">Start Your Build</span>
            <div className="bg-[#111115] text-white rounded-full p-1.5 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer transition-all border-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[75px] bg-[#131312]/95 backdrop-blur-xl border-b border-white/10 p-8 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-5 text-sm font-medium text-slate-200 nav-serif-regular">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <div className="pt-4 mt-2 border-t border-white/10 flex justify-center">
              <a
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-white text-[#111115] rounded-full pl-6 pr-2 py-2 hover:bg-white/90 transition-colors text-decoration-none"
              >
                <span className="text-sm font-medium tracking-wide mr-4">Start Your Build</span>
                <div className="bg-[#111115] text-white rounded-full p-1.5 flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
