import React from 'react';
import Button from '../components/Button';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden bg-grid">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-headline font-bold text-on-surface leading-[1.1] tracking-tight mb-8">
              Master algorithms, memory-friendly notes, and <span className="text-primary-container">DSANotesVisuals.</span>
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 font-body leading-relaxed">
              CodeLoom blends hands-on DSA practice, concise developer notes, and interactive visual tools — crafted to help engineers learn faster, retain more, and ship with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Start Learning</Button>
              <Button variant="secondary">Explore Content</Button>
            </div>
          </div>
          <div className="relative">
            <div className="glow-border glass-morphism rounded-2xl p-6 overflow-hidden">
              <img 
                alt="Data Structure Visualization" 
                className="w-full rounded-lg" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrUyq6AbKrEOuKHYH__pDh0qx-TrsltkufCXdibG9AKiPNu5LsNCeSIqq5JjC1ckjJ7JiujValqSqSktxXIMKXGmELMbE1wf_iEaV2jZPnLeHPYX57iHClNgbRiZIJC-hjibnG1ksacpkSHXbKWhla7XuQPnSsl9wgDn_-_eumnSMLqHP0O0amUxEFKwytshwmAG1GG3tQ_QJr0W7RS1DBnBNo0409lJ5vpbvArOJgsteSpNn1urucJK0DxE7yZRivxAJM_00rGkg" 
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/15 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;