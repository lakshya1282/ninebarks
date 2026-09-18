import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Clock, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Production & Showreel',
    budget: '$10k - $25k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        service: 'Video Production & Showreel',
        budget: '$10k - $25k',
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950 border-t border-slate-900">
      <div className="radial-glow bg-blue-600/10 w-[500px] h-[500px] bottom-0 right-0" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Value Prop */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                <Sparkles size={14} />
                <span>Let's Build Together</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Have a Project in <span className="gradient-text">Mind?</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you need a high-impact video showreel, a full React web application, or a brand system, Ninebark is ready to collaborate.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 pt-4">
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400">Direct Email</h4>
                  <a href="mailto:hello@ninebark.studio" className="text-base font-semibold text-white hover:text-cyan-400 transition-colors">
                    hello@ninebark.studio
                  </a>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400">Studio Location</h4>
                  <p className="text-base font-semibold text-white">
                    San Francisco, CA & Digital Global
                  </p>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400">Response SLA</h4>
                  <p className="text-base font-semibold text-white">
                    Guaranteed within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 border border-slate-800 relative">
              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm">
                    Thank you for reaching out to Ninebark Studio. We'll review your project details and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Send an Enquiry</h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      >
                        <option>Video Production & Showreel</option>
                        <option>React Web Application</option>
                        <option>Brand System & UI Design</option>
                        <option>Interactive 3D / WebGL</option>
                        <option>Full Digital Product</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                      >
                        <option>$5k - $10k</option>
                        <option>$10k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                      Project Goals & Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your brand, scope, timelines, or video showcase requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    <Send size={18} />
                    <span>Submit Project Brief</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
