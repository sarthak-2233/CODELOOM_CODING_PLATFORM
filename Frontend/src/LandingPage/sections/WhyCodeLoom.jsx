import React from 'react';
import { Link } from 'react-router-dom';

const WhyCodeLoom = () => {
  return (
    <section className="py-24 bg-surface-container-low/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-on-surface">
              Why we built CodeLoom
            </h2>
            <div className="space-y-6">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                As developers, we were tired of context-switching between LeetCode, Obsidian, and various YouTube visualizers. The friction of learning was too high, and the retention was too low.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                CodeLoom is our answer to the "scattered brain" problem. We built an integrated environment where your code, your notes, and your mental models live in one unified technical cockpit.
              </p>
              
              {/* Quote/Manifesto Section */}
              <div className="mt-8 pt-6 border-t border-outline-variant/20">
                <p className="text-on-surface text-xl font-headline italic leading-relaxed mb-4">
                  "Precision engineered for the minds that build the future."
                </p>
                 <Link 
                  to="/manifesto" 
                  className="inline-flex items-center gap-2 text-primary-container font-medium hover:gap-3 transition-all group"
                >
                  Read our manifesto 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glow-border glass-morphism rounded-2xl p-4 aspect-video overflow-hidden">
              <img 
                alt="Interactive Editor" 
                className="w-full h-full object-cover rounded-lg opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozCdj7I1h02xpxLDngQQfY1ZppvPc0vUp6Ej_7nX_-HolYSM6ohlOwHscyXC4yh56tK7GwbNonzDepss6Dds2GDq5BWpFW0UJp4Koky2m7L4HjqXy3cCJtngCjP6cslCcbKPIkfG1Bz2oSCHw3xD8im56ZxwAh_UL6xd2xYo82pLaufk_FvfWRSj0wVTg95zm8X2aJD_dVDtJ6hyFdYha58JB8ET87SaAZY-kv62DKjFpVCOa_69RmiMRwNfSzHMzbp000nTD8ls" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCodeLoom;