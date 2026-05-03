// Manifesto.js
import React from 'react';

// No CSS imports needed - all styles are Tailwind classes
const Manifesto = () => {
  return (
    <div className="font-body selection:bg-[#b5fe00] selection:text-[#415e00] bg-[#0a0f0d] text-[#f9fdf9]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center">
        <nav className="bg-lime-400/10 backdrop-blur-xl rounded-full mt-6 mx-auto max-w-fit px-8 py-3 ring-1 ring-lime-400/20 shadow-[0_0_20px_rgba(182,255,0,0.15)] flex items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-[#f9fdf9] font-['Space_Grotesk']">CodeLoom</div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-[#f9fdf9]/70 hover:text-[#b5fe00] transition-colors font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300" href="#">Platform</a>
            <a className="text-[#f9fdf9]/70 hover:text-[#b5fe00] transition-colors font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300" href="#">Courses</a>
            <a className="text-[#f9fdf9]/70 hover:text-[#b5fe00] transition-colors font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300" href="#">Docs</a>
            <a className="text-[#f9fdf9]/70 hover:text-[#b5fe00] transition-colors font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300" href="#">Community</a>
            <a className="text-[#f9fdf9]/70 hover:text-[#b5fe00] transition-colors font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-4 border-l border-lime-400/20 pl-6">
            <button className="text-[#b5fe00] font-['Space_Grotesk'] tracking-tight text-sm font-semibold hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer">Dashboard</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="A sprawling dark landscape with interconnected neon lime grid lines suggesting a complex neural network or city layout at night." 
              className="w-full h-full object-cover opacity-20" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uiCIup1WabBHvt9JR0oL_nFpRkYZkC41PVLcFp9obNPdoNd8Uqx8RKb6vsIyMu6a9RKPqKNnlS6yYG7rOpzbFORi8qXOIo7FRVd60C4kDmZJq_rslMUFGXxaXK6luMfdtxO4RvPXPXJ2_wCJ5WMmzmIW6pKYN7Z4XBMERGSPxrC_hFujzt5yIeLDWS1V5NlTPmKNoPzQpWcBVCZYtY4W7m0acaTYYY0IxlIM93AxZRgrIcsOvFs17ZCu5NxK_lNI69L-OQNOnUbyA"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] via-transparent to-[#0a0f0d]"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5fe00]/10 border border-[#b5fe00]/20 text-[#e9ffbd] mb-8 animate-pulse">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span className="text-xs font-['Inter'] font-medium tracking-[0.2em] uppercase">The Luminescent Architect</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-8xl font-bold tracking-tighter text-[#f9fdf9] mb-6 leading-[0.9] shadow-text">
              The CodeLoom <br/><span className="text-[#b5fe00]">Manifesto</span>
            </h1>
            <p className="max-w-2xl mx-auto text-[#a7aca9] text-lg md:text-xl font-['Inter'] leading-relaxed mb-12">
              Engineering a new paradigm for the architects of tomorrow. We believe code shouldn't just be written; it should be woven into a tapestry of clarity and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-[#b5fe00] text-[#324a00] rounded-full font-['Space_Grotesk'] font-bold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(182,255,0,0.2)] active:scale-95">
                Initialize Core
              </button>
              <button className="px-10 py-4 border border-[#e9ffbd]/20 bg-[#e9ffbd]/5 text-[#e9ffbd] rounded-full font-['Space_Grotesk'] font-bold text-lg hover:bg-[#e9ffbd]/10 transition-all active:scale-95">
                Read Whitepaper
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: The Problem */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="bg-[#b5fe00]/10 backdrop-blur-sm p-8 rounded-xl ring-1 ring-[#e9ffbd]/20 relative overflow-hidden">
                  <img 
                    alt="A sophisticated technical diagram visualized as a three-dimensional glass object, showing layers of data streams and terminal outputs overlManifestoing." 
                    className="w-full h-auto rounded-lg" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0uh7DG2PGarcXFMOqrRCkG7HwLy-QJfOyOOrRoe_CVUGl746oVBlqyHcVfAN6my83zdWETMR9HaYSq9q0Wbmy43Lu9rSyoAOqVDNc258Ze9nNhTPFjn2CkYuiZ9YmAKMmhvfWdX1HVh-xeJ8FfWhWUx8lritb7W42E7r_pdp9eMCPMMIrA4NvXfTB7PaKG2pqnv5zZ8MD7MCnDjdl866Dn620-MO_sKHJJf_c5RrYrClmFe4GHcJTYrCjvk-iG-Lq351jdPNd6xm"
                  />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e9ffbd]/10 blur-[80px] rounded-full"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-semibold mb-6 tracking-tight">The <span className="text-[#e9ffbd]">Scattered</span> Brain</h2>
                <p className="text-[#a7aca9] text-lg leading-relaxed mb-8">
                  Developers spend 40% of their time context-switching. Friction exists in the invisible space between your IDE, your documentation, and your terminal. This fragmentation isn't just a nuance—it's a tax on creativity.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#b92902]/20 text-[#d53d18]">
                      <span className="material-symbols-outlined">segment</span>
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] font-bold text-[#f9fdf9]">Cognitive Fragmentation</h4>
                      <p className="text-[#a7aca9] text-sm">Shifting mental models between documentation and active code slows down the flow state.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#b92902]/20 text-[#d53d18]">
                      <span className="material-symbols-outlined">sync_disabled</span>
                    </div>
                    <div>
                      <h4 className="font-['Space_Grotesk'] font-bold text-[#f9fdf9]">Asynchronous Learning</h4>
                      <p className="text-[#a7aca9] text-sm">Static tutorials fail to keep up with the velocity of dynamic package updates.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Vision */}
        <section className="py-24 bg-[#0f1512]/50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold mb-8 tracking-tighter">A Unified <span className="italic font-light">Visual-First</span> Ecosystem</h2>
              <p className="text-xl text-[#a7aca9] font-['Inter'] leading-relaxed mb-16">
                We are building the first high-frequency development environment that visualizes code architecture in real-time. CodeLoom isn't a tool; it's a telescope for complexity, allowing you to see the galaxy of your project from a single interface.
              </p>
              <div className="aspect-video relative rounded-lg overflow-hidden border border-[#444946]/30 group">
                <img 
                  alt="A premium panoramic view of a futuristic code editor interface that uses holographic elements and glassmorphic panels." 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhPiugchgT1PYgZ9ocgQV9djSkhL-1uMWCuoFzepqRkeoCLllmjXz_vkPXA2bPlexeqsUx0p6aDrkhDvKalh-I7TIw5W2MxjT9bfCExBsgxCgSEkWbyFPKx477R6TlQ9wd5rU6JGsdtW5JFgLfzQI_YXYneUYNw1DYbXxgYaIcoZ7jrytzjovVGj5M5OQw2Dpo-vibqfH7Qo6yrX4qobpr9sna5K3KvBqCeA2aknUGjkv7GcQnc7ssZiJb1Sg4bIxAbYmOlQROZ"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-20 h-20 bg-[#b5fe00] text-[#324a00] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Core Principles */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#e9ffbd]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Core Principles</h2>
              <div className="h-1 w-20 bg-[#b5fe00] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#e9ffbd]/10 backdrop-blur-sm p-10 rounded-xl ring-1 ring-[#e9ffbd]/10 hover:ring-[#e9ffbd]/40 transition-all group">
                <div className="w-14 h-14 bg-[#b5fe00]/20 rounded-lg flex items-center justify-center mb-8 text-[#e9ffbd] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">grid_view</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-4">Clarity by Design</h3>
                <p className="text-[#a7aca9] leading-relaxed">Complexity is the enemy of progress. We strip away the unnecessary to reveal the elegant skeleton of your logic.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-[#e9ffbd]/10 backdrop-blur-sm p-10 rounded-xl ring-1 ring-[#e9ffbd]/10 hover:ring-[#e9ffbd]/40 transition-all group">
                <div className="w-14 h-14 bg-[#006c4b]/20 rounded-lg flex items-center justify-center mb-8 text-[#68fcbf] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-4">Frictionless Growth</h3>
                <p className="text-[#a7aca9] leading-relaxed">Scaling a codebase shouldn't feel like moving a mountain. Our tools evolve as your architecture matures.</p>
              </div>
              {/* Card 3 */}
              <div className="bg-[#e9ffbd]/10 backdrop-blur-sm p-10 rounded-xl ring-1 ring-[#e9ffbd]/10 hover:ring-[#e9ffbd]/40 transition-all group">
                <div className="w-14 h-14 bg-[#d9f0e9]/20 rounded-lg flex items-center justify-center mb-8 text-[#e7fef7] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">hub</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-4">Community Intelligence</h3>
                <p className="text-[#a7aca9] leading-relaxed">The best code is collaborative. CodeLoom facilitates the collective wisdom of thousands of engineers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Pledge */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-[#e9ffbd]/10 backdrop-blur-sm border-l-4 border-[#b5fe00] p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#e9ffbd]/10 select-none">
                <span className="material-symbols-outlined text-9xl">format_quote</span>
              </div>
              <blockquote className="relative z-10">
                <p className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold leading-[1.1] text-[#b5fe00] mb-12 italic">
                  "We don't build software just to solve problems. We build software to empower the human imagination to build things we haven't even dreamed of yet."
                </p>
                <footer className="flex items-center gap-6">
                  <img 
                    alt="A professional headshot of a visionary software engineer, a young woman with a focused expression." 
                    className="w-16 h-16 rounded-full border-2 border-[#e9ffbd]/20" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujO8lsWYwJ04qXTq-NT7xPyxqIhjY8pNqMQQzMB3H2czl3YwOWWxfB0b_oU2CXNKCCd7zbXVNyhG7PZzW82lTXinoeX2vZTJftcvATTvIV8PsicH2J8U-Tp7gZwc7J7SXD8bX50rpi9YChDjhyS1ri_BLS99bjnQ-_zeAJPfhGXJfezANqmrcVWculmlJvVaKN8tBUXn85rFV4woH6Zn-IsKdFf5ZfQH8A50tTFakbWWN9SvDpnuFFVGK71zhBkn9SAV1WEkTU7AQ"
                  />
                  <div>
                    <p className="text-[#f9fdf9] font-bold text-xl font-['Space_Grotesk']">Alex Rivera</p>
                    <p className="text-[#a7aca9] text-sm font-['Inter'] tracking-widest uppercase">Chief Architect, CodeLoom</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Section 6: Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="A wide-angle abstract background featuring blurred light trails in lime green and emerald colors moving across a deep black void." 
              className="w-full h-full object-cover opacity-10" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugnadztCvvlyBCJ3BepjREnpMZHd_dGfllFm-PyDO2gjsJuwxcruGU4tEYaPtF-KljYpHSfXt_EWihgaWYjVwFpGL6h1IeLSDPHc0elLjJuAi_qY-P3s2VAVLNHMxitG39HPPZ1rSAiYKc6L4f2JJtBcwuIDuFK9dyn9xWgLfnIP4UOh7B6An03w5EeAMcUfDIHVQAOj_y7vvKR1QaTI3RmNDWbomfMEMo_G1HY1EixdP40ApuoCtiH7GQ3BDc2Mf3feq7_6Qi9IQ"
            />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">Ready to <span className="text-[#b5fe00]">Loom?</span></h2>
              <p className="text-[#a7aca9] text-lg mb-12">Join 50,000+ developers building the future of the web with luminescent precision.</p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-[#b5fe00] text-[#324a00] rounded-full font-['Space_Grotesk'] font-bold text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_20px_rgba(182,255,0,0.2)] active:scale-95">
                  <span className="material-symbols-outlined">add_circle</span>
                  Build New Instance
                </button>
                <button className="px-12 py-5 border border-[#e9ffbd]/30 text-[#e9ffbd] rounded-full font-['Space_Grotesk'] font-bold text-xl flex items-center justify-center gap-3 hover:bg-[#e9ffbd]/10 transition-all active:scale-95">
                  <span className="material-symbols-outlined">menu_book</span>
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0F0D] border-t border-lime-400/10 w-full py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-lg font-bold text-[#f9fdf9] font-['Space_Grotesk']">CodeLoom</div>
            <p className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50">© 2024 CodeLoom. Engineered for the Luminescent Architect.</p>
          </div>
          <div className="flex gap-8">
            <a className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50 hover:text-[#b5fe00] transition-colors" href="#">Terms</a>
            <a className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50 hover:text-[#b5fe00] transition-colors" href="#">Privacy</a>
            <a className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50 hover:text-[#b5fe00] transition-colors" href="#">Status</a>
            <a className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50 hover:text-[#b5fe00] transition-colors" href="#">Twitter</a>
            <a className="font-['Inter'] text-xs uppercase tracking-widest text-[#f9fdf9]/50 hover:text-[#b5fe00] transition-colors" href="#">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Add required style for text-glow effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        .shadow-text {
          text-shadow: 0 0 12px rgba(182, 255, 0, 0.4);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      ` }} />
    </div>
  );
};

export default Manifesto;