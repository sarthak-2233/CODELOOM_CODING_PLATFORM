// Manifesto.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './../sections/Footer';

const ManifestoPage = () => {
  return (
    <div className="font-body selection:bg-[#b5fe00] selection:text-[#415e00] bg-[#0a0f0d] text-[#f9fdf9] overflow-x-hidden">
      {/* Use the provided Navbar component */}
      <Navbar />

      <main className="pt-24">
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(182,255,0,0.08)_0%,transparent_60%)] animate-pulse"></div>
            <img
              alt="A sprawling dark landscape with interconnected neon lime grid lines suggesting a complex neural network or city layout at night."
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida/ADBb0uiCIup1WabBHvt9JR0oL_nFpRkYZkC41PVLcFp9obNPdoNd8Uqx8RKb6vsIyMu6a9RKPqKNnlS6yYG7rOpzbFORi8qXOIo7FRVd60C4kDmZJq_rslMUFGXxaXK6luMfdtxO4RvPXPXJ2_wCJ5WMmzmIW6pKYN7Z4XBMERGSPxrC_hFujzt5yIeLDWS1V5NlTPmKNoPzQpWcBVCZYtY4W7m0acaTYYY0IxlIM93AxZRgrIcsOvFs17ZCu5NxK_lNI69L-OQNOnUbyA"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] via-transparent to-[#0a0f0d]"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#b5fe00]/10 border border-[#b5fe00]/20 text-[#e9ffbd] mb-8 animate-pulse">
                  <span className="material-symbols-outlined text-sm animate-spin-slow">
                    auto_awesome
                  </span>
                  <span className="text-[10px] font-['Inter'] font-bold tracking-[0.3em] uppercase">
                    The Luminescent Architect
                  </span>
                </div>
                <h1 className="font-['Space_Grotesk'] text-6xl md:text-[10rem] font-bold tracking-tighter text-[#f9fdf9] mb-8 leading-[0.8] shadow-text">
                  The CodeLoom <br />
                  <span className="text-[#b5fe00]">Manifesto</span>
                </h1>
                <div className="max-w-3xl bg-[#b5fe00]/5 backdrop-blur-sm p-8 md:p-12 rounded-xl mt-12 border-l-4 border-l-[#b5fe00] text-left relative overflow-hidden group">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#b5fe00]/5 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-1000"></div>
                  <p className="text-[#a7aca9] text-xl font-['Inter'] leading-relaxed">
                    Engineering a new paradigm for the architects of tomorrow.
                    We believe code shouldn't just be written; it should be
                    woven into a tapestry of clarity and precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Problem - Redesigned */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <span className="text-[#b5fe00] font-['Inter'] tracking-widest uppercase text-sm font-bold">
                    The Challenge
                  </span>
                  <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                    The <br />
                    <span className="text-[#e9ffbd]/40">Scattered</span> <br />
                    Brain
                  </h2>
                </div>
                <p className="text-xl text-[#a7aca9] font-['Inter'] leading-relaxed max-w-md">
                  Developers spend 40% of their time context-switching. Friction
                  exists in the invisible space between your IDE, your
                  documentation, and your terminal.
                </p>
                <div className="space-y-8">
                  <div className="group p-6 bg-[#b5fe00]/5 backdrop-blur-sm rounded-lg ring-1 ring-[#b5fe00]/10 hover:ring-[#d53d18]/40 transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="material-symbols-outlined text-[#d53d18] p-2 bg-[#d53d18]/10 rounded">
                        segment
                      </span>
                      <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#f9fdf9]">
                        Cognitive Fragmentation
                      </h4>
                    </div>
                    <p className="text-[#a7aca9] text-sm pl-12 leading-relaxed">
                      Shifting mental models between documentation and active
                      code slows down the flow state.
                    </p>
                  </div>
                  <div className="group p-6 bg-[#b5fe00]/5 backdrop-blur-sm rounded-lg ring-1 ring-[#b5fe00]/10 hover:ring-[#b5fe00]/40 transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="material-symbols-outlined text-[#b5fe00] p-2 bg-[#b5fe00]/10 rounded">
                        sync_disabled
                      </span>
                      <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#f9fdf9]">
                        Asynchronous Learning
                      </h4>
                    </div>
                    <p className="text-[#a7aca9] text-sm pl-12 leading-relaxed">
                      Static tutorials fail to keep up with the velocity of
                      dynamic package updates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 relative">
                <div className="relative z-10 bg-[#b5fe00]/5 backdrop-blur-sm p-4 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center ring-1 ring-[#e9ffbd]/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(182,255,0,0.1)_0%,transparent_50%)]"></div>
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5">
                    <img
                      alt="A sophisticated technical diagram visualized as a three-dimensional glass object, showing layers of data streams and terminal outputs overlaying."
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida/ADBb0uh7DG2PGarcXFMOqrRCkG7HwLy-QJfOyOOrRoe_CVUGl746oVBlqyHcVfAN6my83zdWETMR9HaYSq9q0Wbmy43Lu9rSyoAOqVDNc258Ze9nNhTPFjn2CkYuiZ9YmAKMmhvfWdX1HVh-xeJ8FfWhWUx8lritb7W42E7r_pdp9eMCPMMIrA4NvXfTB7PaKG2pqnv5zZ8MD7MCnDjdl866Dn620-MO_sKHJJf_c5RrYrClmFe4GHcJTYrCjvk-iG-Lq351jdPNd6xm"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#b5fe00]/20 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute -top-12 -left-12 w-32 h-32 border border-[#b5fe00]/20 rounded-full flex items-center justify-center -z-10">
                  <div className="w-24 h-24 border border-[#b5fe00]/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

       
        {/* Section 4: Core Principles - Redesigned */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#e9ffbd]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none text-[#f9fdf9]">
                  Our Core <span className="text-[#b5fe00]">Principles</span>
                </h2>
                <p className="text-xl text-[#a7aca9] font-['Inter'] leading-relaxed">
                  We don't follow trends; we set foundations. Our core
                  principles are the steel beams that support the Loom
                  ecosystem.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-[1px] bg-[#b5fe00]/30 mb-4"></div>
                <span className="text-xs font-['Inter'] tracking-[0.5em] text-[#b5fe00]/60 uppercase">
                  System Integrity
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#b5fe00]/10 rounded-2xl overflow-hidden bg-[#b5fe00]/5 backdrop-blur-sm">
              {/* Card 1 */}
              <div className="p-12 border-b md:border-b-0 md:border-r border-[#b5fe00]/10 group hover:bg-[#b5fe00]/5 transition-all duration-500">
                <div className="mb-12 flex justify-between items-start">
                  <span className="font-['Space_Grotesk'] text-5xl font-light text-[#b5fe00]/20 group-hover:text-[#b5fe00]/40 transition-colors">
                    01
                  </span>
                  <span className="material-symbols-outlined text-4xl text-[#b5fe00]/40 group-hover:text-[#b5fe00] transition-colors">
                    grid_view
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold mb-6 text-[#f9fdf9]">
                  Clarity by <br />
                  Design
                </h3>
                <p className="text-[#a7aca9] leading-relaxed mb-8">
                  Complexity is the enemy of progress. We strip away the
                  unnecessary to reveal the elegant skeleton of your logic.
                </p>
                <div className="w-8 h-8 rounded-full border border-[#b5fe00]/20 flex items-center justify-center group-hover:w-full group-hover:justify-start group-hover:px-4 transition-all duration-500 overflow-hidden bg-[#b5fe00]/10">
                  <span className="material-symbols-outlined text-sm shrink-0">
                    arrow_forward
                  </span>
                  <span className="ml-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn about transparency
                  </span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="p-12 border-b md:border-b-0 md:border-r border-[#b5fe00]/10 group hover:bg-[#b5fe00]/5 transition-all duration-500">
                <div className="mb-12 flex justify-between items-start">
                  <span className="font-['Space_Grotesk'] text-5xl font-light text-[#b5fe00]/20 group-hover:text-[#b5fe00]/40 transition-colors">
                    02
                  </span>
                  <span className="material-symbols-outlined text-4xl text-[#68fcbf]/40 group-hover:text-[#68fcbf] transition-colors">
                    bolt
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold mb-6 text-[#f9fdf9]">
                  Frictionless <br />
                  Growth
                </h3>
                <p className="text-[#a7aca9] leading-relaxed mb-8">
                  Scaling a codebase shouldn't feel like moving a mountain. Our
                  tools evolve as your architecture matures.
                </p>
                <div className="w-8 h-8 rounded-full border border-[#b5fe00]/20 flex items-center justify-center group-hover:w-full group-hover:justify-start group-hover:px-4 transition-all duration-500 overflow-hidden bg-[#b5fe00]/10">
                  <span className="material-symbols-outlined text-sm shrink-0">
                    arrow_forward
                  </span>
                  <span className="ml-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore scalability
                  </span>
                </div>
              </div>
              {/* Card 3 */}
              <div className="p-12 group hover:bg-[#b5fe00]/5 transition-all duration-500">
                <div className="mb-12 flex justify-between items-start">
                  <span className="font-['Space_Grotesk'] text-5xl font-light text-[#b5fe00]/20 group-hover:text-[#b5fe00]/40 transition-colors">
                    03
                  </span>
                  <span className="material-symbols-outlined text-4xl text-[#b5fe00]/40 group-hover:text-[#b5fe00] transition-colors">
                    hub
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-3xl font-bold mb-6 text-[#f9fdf9]">
                  Community <br />
                  Intelligence
                </h3>
                <p className="text-[#a7aca9] leading-relaxed mb-8">
                  The best code is collaborative. CodeLoom facilitates the
                  collective wisdom of thousands of engineers.
                </p>
                <div className="w-8 h-8 rounded-full border border-[#b5fe00]/20 flex items-center justify-center group-hover:w-full group-hover:justify-start group-hover:px-4 transition-all duration-500 overflow-hidden bg-[#b5fe00]/10">
                  <span className="material-symbols-outlined text-sm shrink-0">
                    arrow_forward
                  </span>
                  <span className="ml-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Join the community
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Pledge */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-full aspect-square bg-[radial-gradient(circle_at_center,rgba(182,255,0,0.05)_0%,transparent_70%)] -z-10"></div>
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto bg-[#b5fe00]/5 backdrop-blur-sm border-y border-y-[#b5fe00]/20 p-12 md:p-24 relative rounded-none md:rounded-3xl">
              <div className="absolute top-0 right-0 p-12 text-[#b5fe00]/5 pointer-events-none">
                <span className="material-symbols-outlined text-[15rem]">
                  format_quote
                </span>
              </div>
              <blockquote className="relative z-10">
                <p className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold leading-[1.05] text-[#b5fe00] mb-16 italic tracking-tight max-w-4xl">
                  "We don't build software just to solve problems. We build
                  software to empower the human imagination to build things we
                  haven't even dreamed of yet."
                </p>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <footer className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        alt="A professional headshot of a visionary software engineer, a young woman with a focused expression."
                        className="w-20 h-20 rounded-full border-2 border-[#e9ffbd]/20 grayscale hover:grayscale-0 transition-all duration-700 object-cover"
                        src="https://lh3.googleusercontent.com/aida/ADBb0ujO8lsWYwJ04qXTq-NT7xPyxqIhjY8pNqMQQzMB3H2czl3YwOWWxfB0b_oU2CXNKCCd7zbXVNyhG7PZzW82lTXinoeX2vZTJftcvATTvIV8PsicH2J8U-Tp7gZwc7J7SXD8bX50rpi9YChDjhyS1ri_BLS99bjnQ-_zeAJPfhGXJfezANqmrcVWculmlJvVaKN8tBUXn85rFV4woH6Zn-IsKdFf5ZfQH8A50tTFakbWWN9SvDpnuFFVGK71zhBkn9SAV1WEkTU7AQ"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#b5fe00] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#324a00] text-xs font-bold">
                          verified
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#f9fdf9] font-bold text-2xl font-['Space_Grotesk']">
                        Alex Rivera
                      </p>
                      <p className="text-[#a7aca9] text-xs font-['Inter'] tracking-widest uppercase">
                        Chief Architect, CodeLoom
                      </p>
                    </div>
                  </footer>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 border border-[#b5fe00]/20 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#b5fe00] rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#a7aca9]">
                        Active Visionary
                      </span>
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 6: Call to Action - Redesigned */}
        <section className="py-40 relative">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-4">
                <span className="text-[#b5fe00] font-['Inter'] text-sm tracking-[0.4em] uppercase font-bold">
                  Ready to transcend?
                </span>
                <h2 className="font-['Space_Grotesk'] text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] shadow-text">
                  START <br />THE <span className="text-[#b5fe00]">LOOM</span>
                </h2>
              </div>
              <p className="text-xl text-[#a7aca9] max-w-2xl mx-auto font-['Inter']">
                Join 50,000+ developers building the future of the web with
                luminescent precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <button className="group px-12 py-6 bg-[#b5fe00] text-[#324a00] rounded-full font-['Space_Grotesk'] font-bold text-xl flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-[0_0_20px_rgba(182,255,0,0.2)] active:scale-95">
                  Initialize New Instance
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                    add_circle
                  </span>
                </button>
                <button className="px-12 py-6 border border-[#e9ffbd]/30 text-[#e9ffbd] rounded-full font-['Space_Grotesk'] font-bold text-xl flex items-center justify-center gap-4 hover:bg-[#e9ffbd]/10 transition-all active:scale-95">
                  Read Whitepaper
                  <span className="material-symbols-outlined">menu_book</span>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#b5fe00]/5 to-transparent -z-10"></div>
        </section>
      </main>

      {/* Use the provided Footer component */}
      <Footer />

      {/* Global styles for custom effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .shadow-text {
          text-shadow: 0 0 12px rgba(182, 255, 0, 0.4);
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      ` }} />
    </div>
  );
};

export default ManifestoPage;