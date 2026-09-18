import React from 'react';
import { Video, Code2, Layers, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Cinematic Media & Video Production',
    description: '4K video showreels, commercial production, motion design, and visual storytelling tailored to elevate premium brands.',
    tags: ['4K Video Editing', 'Motion Graphics', 'Color Grading', 'Sound Design'],
    highlight: 'Featured in hero showreel'
  },
  {
    icon: Code2,
    title: 'Modern Web & React Applications',
    description: 'Ultra-fast, responsive web applications engineered with React, Vite, and modern API architectures for seamless UX.',
    tags: ['React.js', 'Vite', 'Component Systems', 'Performance First'],
    highlight: 'Production Ready'
  },
  {
    icon: Layers,
    title: 'Brand Identity & Design Systems',
    description: 'Comprehensive digital design systems, dark-mode visual identities, custom typography, and component libraries.',
    tags: ['Design Systems', 'UI/UX Design', 'Design Tokens', 'Figma Libraries'],
    highlight: 'Scalable Architecture'
  },
  {
    icon: Cpu,
    title: 'Interactive WebGL & 3D Media',
    description: 'Immersive browser experiences using WebGL, interactive 3D product previews, and micro-animated landing pages.',
    tags: ['Three.js', 'Micro-Animations', 'Interactive Canvas', 'Creative Coding'],
    highlight: 'Next-Gen UX'
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-slate-950 border-t border-slate-900">
      {/* Background Glow */}
      <div className="radial-glow bg-cyan-600/10 w-[450px] h-[450px] top-1/2 left-0" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-cyan-400 border border-cyan-500/20">
            <Sparkles size={14} />
            <span>Capabilities & Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Everything You Need to <span className="gradient-text">Dominate Digital</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Ninebark bridges the gap between high-end video production and cutting-edge web software engineering.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="glass-card p-8 relative flex flex-col justify-between group">
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                      {service.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Tags list */}
                <div className="pt-6 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-400 border border-slate-800 flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} className="text-cyan-400" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
