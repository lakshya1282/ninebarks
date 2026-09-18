import React, { useState } from 'react';
import { Play, ExternalLink, Film, Code, Palette, Sparkles } from 'lucide-react';
import ParallaxImage from './ParallaxImage';

const projects = [
  {
    id: 'hero-showreel',
    title: 'Ninebark 2026 Master Showreel',
    category: 'Video Production',
    isVideo: true,
    videoSrc: '/videos/hero-showreel.mp4',
    description: 'A 4K cinematic showreel featuring motion design, 3D brand reveals, and visual effects created for global clients.',
    tags: ['Video', '4K Reel', 'Motion Graphics'],
    client: 'Ninebark Originals',
    featured: true
  },
  {
    id: 'quantum-pay',
    title: 'QuantumPay Digital Platform',
    category: 'Web App',
    isVideo: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Real-time financial analytics dashboard built with React, interactive charting, and dark glassmorphic UI.',
    tags: ['React', 'Dashboard', 'Fintech'],
    client: 'Quantum Corp'
  },
  {
    id: 'lumina-brand',
    title: 'Lumina Spatial Design System',
    category: 'Brand Design',
    isVideo: false,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Complete visual identity, design tokens, and UI system for an augmented reality hardware company.',
    tags: ['Design System', 'Branding', 'Figma'],
    client: 'Lumina AR'
  },
  {
    id: 'nebula-cloud',
    title: 'Nebula Cloud Enterprise Web App',
    category: 'Web App',
    isVideo: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'High-throughput cloud management portal with automated devops workflows and sleek dark theme.',
    tags: ['Vite', 'React', 'Cloud API'],
    client: 'Nebula Inc'
  }
];

export default function Showcase({ onOpenReel }) {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="showcase" className="py-24 relative bg-slate-950 border-t border-slate-900">
      <div className="container">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              <Sparkles size={14} />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Featured <span className="gradient-text">Work & Case Studies</span>
            </h2>
            <p className="text-slate-400">
              Explore our latest projects across video production, web app development, and interactive design.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {['All', 'Video Production', 'Web App', 'Brand Design'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none ${
                  filter === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className={`glass-card overflow-hidden group border border-slate-800 hover:border-cyan-500/40 transition-all ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Media Preview Container */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                {project.isVideo ? (
                  <div className="relative w-full h-full">
                    <video
                      src={project.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                    
                    {/* Play Overlay Button */}
                    <button
                      onClick={onOpenReel}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 group-hover:scale-110 transition-transform cursor-pointer border-none"
                    >
                      <Play size={28} className="fill-slate-950 ml-1" />
                    </button>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 flex items-center gap-1.5">
                        <Film size={12} />
                        FLAGSHIP VIDEO REEL
                      </span>
                    </div>
                  </div>
                ) : (
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    containerClassName="w-full h-full"
                    imageClassName="group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  </ParallaxImage>
                )}
              </div>

              {/* Details Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-cyan-400">{project.client}</span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {project.isVideo ? (
                    <button
                      onClick={onOpenReel}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer border-none bg-transparent"
                    >
                      Watch Full Screen
                      <ExternalLink size={14} />
                    </button>
                  ) : (
                    <a
                      href="#contact"
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      View Project Details
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
