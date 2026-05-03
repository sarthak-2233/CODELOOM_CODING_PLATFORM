import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from './../sections/Footer';
const About = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0f0d] text-[#f9fdf9] overflow-x-hidden min-h-screen">
      {/* Font and icon imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .glass-panel {
          background: rgba(182, 255, 0, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .luminescent-border {
          border: 1px solid rgba(182, 255, 0, 0.15);
        }
        
        .luminescent-border:hover {
          border: 1px solid rgba(182, 255, 0, 0.4);
          box-shadow: 0 0 20px -5px rgba(182, 255, 0, 0.2);
        }
        
        .neon-text-glow {
          text-shadow: 0 0 10px rgba(182, 255, 0, 0.3);
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[60vh] flex items-center justify-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#b5fe00] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[#006c4b] rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-6xl mx-auto px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1 rounded-full border border-[#b5fe00]/30 text-[#b5fe00] font-['Inter'] text-xs tracking-widest uppercase mb-6 bg-[#b5fe00]/5">Our Story</span>
          <h1 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tighter text-[#f9fdf9]">
            About <span className="text-[#b5fe00] neon-text-glow">CodeLoom</span>
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-[#a7aca9] max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how developers understand and interact with complex algorithms through beautiful, intuitive visualizations.
          </p>
        </div>
      </header>

      {/* Narrative Section */}
      <section className="py-32 relative bg-[#0f1512]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-semibold text-[#f9fdf9] leading-tight">Our Origin: <br /><span className="text-[#68fcbf]">Born from the Noise</span></h2>
            <div className="space-y-6 text-[#a7aca9] font-['Inter'] text-lg leading-relaxed">
              <p>CodeLoom started in a small, windowless server room where data wasn't just numbers—it was a chaotic, unreadable stream of noise. We realized that the human brain wasn't built to parse millions of rows of JSON; it was built to recognize patterns in light, movement, and space.</p>
              <p>Our founder, a systems architect tired of staring at static dashboards, decided to render a high-frequency trading database as a living, breathing nebula. That night, CodeLoom was conceived—not just as a tool, but as a new way for humans to interact with the digital void.</p>
              <p>Today, we've scaled that vision, providing developers across the globe with a cinematic interface for their most complex logic. We don't just show data; we illuminate intent.</p>
            </div>
            <div className="pt-6 border-t border-[#b5fe00]/10">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-[#b5fe00]"></div>
                <span className="font-['Inter'] text-sm uppercase tracking-widest text-[#b5fe00]">Evolving since beta 0.1</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#b5fe00]/10 blur-2xl rounded-lg group-hover:bg-[#b5fe00]/20 transition-all"></div>
            <div className="relative rounded-lg overflow-hidden luminescent-border aspect-[1.03]">
              <img 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                alt="A cinematic, high-contrast photograph of a professional developer workstation in a dark room" 
                src="https://lh3.googleusercontent.com/aida/ADBb0ujOa2y4L3yOlTdQ-Zs9gEzEjs5uAUhpc2HjVO7gh9hv-zdA7_jYrK7Bp0emgq4aYSwu8dadf8FPn0-i6PDkkGh9sZn3PQyOpEqJ0mQM0t7z2JKMeebCMBtstO83VJDpICDhm5kpZRifrb4me8ZtrQCjGP_FLS0PdVeOq7J0X8veG3x0SxO_w1eFLdLEfhkjB6AGnum_nVQwJKuU6H2stSZzPgTQ-Ebp7IinF8rknaOyv4XhgdHDb5HWh_7PKn62_k0GSOByIB9BuA" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 bg-[#0a0f0d]">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="glass-panel p-12 md:p-16 rounded-lg luminescent-border">
            <div className="inline-block p-3 rounded-full bg-[#b5fe00]/10 mb-6">
              <span className="material-symbols-outlined text-[#b5fe00] text-3xl">psychology</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold mb-6 text-[#f9fdf9]">Our Mission</h2>
            <p className="text-[#a7aca9] font-['Inter'] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              To democratize computer science education by making complex data structures and algorithms 
              accessible, visual, and intuitive for developers at every stage of their journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#b5fe00]/10">
              <div>
                <div className="text-3xl font-bold text-[#b5fe00] font-['Space_Grotesk']">50K+</div>
                <p className="text-sm text-[#a7aca9] mt-2">Active Developers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#b5fe00] font-['Space_Grotesk']">200+</div>
                <p className="text-sm text-[#a7aca9] mt-2">Algorithms Visualized</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#b5fe00] font-['Space_Grotesk']">99.9%</div>
                <p className="text-sm text-[#a7aca9] mt-2">Uptime Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-[#0f1512]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center">
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold mb-6">System Architects</h2>
            <p className="text-[#a7aca9] font-['Inter'] max-w-2xl mx-auto">The minds engineering the future of visual computation. A collective of engineers, designers, and mathematical dreamers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="glass-panel p-8 rounded-lg luminescent-border hover:scale-[1.02] transition-all group">
              <div className="mb-6 overflow-hidden rounded-lg aspect-square">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" 
                  alt="Elias Thorne - Lead Core Architect" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugD1yz8wQBfqGgvezaZJwa62069sbmwtr1xJiPHcIM283Vj3kCn5n1XUBxgrZqdMUDANdkwDdtFLd471pPoWcurymxZGPUG0iUn255v4RvTyEaORwGLTm62P-yQn_rF9OSWHBa9cBS5z25p3ScVt082rA7EhZQKbHOOf042P96spDkWBqwdpsLWSYY8GVsS_l3d5XoybfukP_Z9s_risCTooAeRjkesOV75rQJ4NFK6UxK_dLRTz77Jy9q4-tkoHEqH7ZYxOsF5" 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">Elias Thorne</h3>
                  <p className="text-[#b5fe00] font-['Inter'] text-sm tracking-wide">Lead Core Architect</p>
                </div>
                <p className="text-[#a7aca9] font-['Inter'] text-sm leading-relaxed">Elias spent a decade optimizing kernels at high-frequency trading firms before deciding to build the visual engine of his dreams.</p>
                <div className="flex gap-4 text-[#717773]">
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">terminal</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">share</span>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="glass-panel p-8 rounded-lg luminescent-border hover:scale-[1.02] transition-all group">
              <div className="mb-6 overflow-hidden rounded-lg aspect-square">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" 
                  alt="Maya Sterling - Visual Engine Lead" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uj939jGM3ktjcH-Gy5uTs6fXQNDYIMjPA3xSR15sznBQeXOEC06LbOvfxWv6vA1lOCSazX8n_rm6J-fifyv2q8s5BZHZwNCj64NIbImv6vwDV7cdEcv4lzHkAlSoukMFmd9HcLLLEj-VrruG8yyUqoPQTzktuvoLUmxV-_o46Ro_M6541mfDyh2dTCMH70y5vCbakXri8hvf48uRDtZs4vROABO422ylML_ZadzxwW8aaSRrNYDjMzqe2s0KnVQqUJ9SMKDMOFrJg" 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">Maya Sterling</h3>
                  <p className="text-[#b5fe00] font-['Inter'] text-sm tracking-wide">Visual Engine Lead</p>
                </div>
                <p className="text-[#a7aca9] font-['Inter'] text-sm leading-relaxed">A pioneer in real-time GPU rendering, Maya translates complex algorithmic patterns into cinematic visual masterpieces.</p>
                <div className="flex gap-4 text-[#717773]">
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">palette</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">code</span>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="glass-panel p-8 rounded-lg luminescent-border hover:scale-[1.02] transition-all group">
              <div className="mb-6 overflow-hidden rounded-lg aspect-square bg-[#202724] flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0" 
                  alt="Soren Voss - Data Dynamics Specialist" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujhmIYWp5kokRQzMWKQFv16VZEYvYhQ8maTU877Kw6_wJsVYmYXG5-kXw9YKyF9BFRO3sfwvuHJF51Plo4QRO3t3CieFDewtmsmEoEmy2_jsYp5v5PLzfGxdLQHu8aExjZoIlundWZHo-uJp-QN6raufRAKnntrRUjgDsi5SlxyoHpWJfCnoYk8_6iMr84yyLah_lJ1QUxSaRABCoKkhz3u_D6N8krZ7wN2ExCw8wSymUImvYdzjaRG6nw18z22RVh_gBkvaF2I" 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">Soren Voss</h3>
                  <p className="text-[#b5fe00] font-['Inter'] text-sm tracking-wide">Data Dynamics Specialist</p>
                </div>
                <p className="text-[#a7aca9] font-['Inter'] text-sm leading-relaxed">Soren focuses on the flow—ensuring that massive datasets move with the grace of fluid dynamics through our pipelines.</p>
                <div className="flex gap-4 text-[#717773]">
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">database</span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#b5fe00] text-lg">hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-32 bg-[#0a0f0d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold mb-20 text-center">System Evolution</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b5fe00]/5 via-[#b5fe00]/40 to-[#b5fe00]/5 hidden md:block"></div>
            <div className="space-y-24">
              {/* Milestone 1 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-right mb-8 md:mb-0">
                  <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">The Seed</h4>
                  <p className="text-[#a7aca9] font-['Inter']">Inception of the Core Loom engine in a garage in Palo Alto. The first algorithm was visualized.</p>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a0f0d] border-2 border-[#b5fe00] flex items-center justify-center shadow-[0_0_20px_rgba(182,255,0,0.5)]">
                  <span className="text-[#b5fe00] font-['Space_Grotesk'] font-bold text-xs">2022</span>
                </div>
                <div className="md:w-5/12 hidden md:block"></div>
              </div>
              {/* Milestone 2 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 hidden md:block"></div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a0f0d] border-2 border-[#68fcbf] flex items-center justify-center shadow-[0_0_20px_rgba(104,252,191,0.5)]">
                  <span className="text-[#68fcbf] font-['Space_Grotesk'] font-bold text-xs">2023</span>
                </div>
                <div className="md:w-5/12 text-center md:text-left mt-8 md:mt-0">
                  <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">Series A &amp; Hyper-growth</h4>
                  <p className="text-[#a7aca9] font-['Inter']">CodeLoom goes viral among developer communities. The platform scales to 100k+ monthly active weavers.</p>
                </div>
              </div>
              {/* Milestone 3 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-right mb-8 md:mb-0">
                  <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f9fdf9]">The Kinetic Update</h4>
                  <p className="text-[#a7aca9] font-['Inter']">Integration of real-time physics into data structures. Objects now possess mass and momentum.</p>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a0f0d] border-2 border-[#b5fe00] flex items-center justify-center shadow-[0_0_20px_rgba(182,255,0,0.5)]">
                  <span className="text-[#b5fe00] font-['Space_Grotesk'] font-bold text-xs">2024</span>
                </div>
                <div className="md:w-5/12 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-32 relative bg-[#0f1512] overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="glass-panel p-12 md:p-20 rounded-lg luminescent-border text-center relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Network connections background" 
                src="https://lh3.googleusercontent.com/aida/ADBb0ugarfL04Q0l2aGcnI-1xrZy7G57dlyfVlVWIT5iQiiNK_jQBfJ3gnJbSEBBx1uIDbeYZ_lA5rAyWVeiJ40aE1ygWpa4a-62sLGN5Al_2RASQ3ViXaGHxc0IfdZ3iNuJVKq5fOKo4pBpVWRlgRQVsQ6PH4tZupg7W7i18DlvCTjARk1pj9KjqwocwD8ozufLs9zNTaaqN0K5GrH6iFok5bDKxrYdyNscGTH0fLtM1ElLefQNrXBae7S65VyNFYiz2KlxCiUqtSJ4" 
              />
            </div>
            <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold mb-8 text-[#f9fdf9]">Ready to Build?</h2>
            <p className="text-[#a7aca9] font-['Inter'] text-xl max-w-2xl mx-auto mb-12">
              We're looking for architects who aren't afraid of the void. Join our team and help us define the future of human-data interaction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-[#b5fe00] text-[#476700] px-12 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(182,255,0,0.4)]">
                Open Positions
              </button>
              <button className="border border-[#b5fe00]/40 text-[#b5fe00] px-12 py-5 rounded-full font-bold text-lg hover:bg-[#b5fe00]/10 transition-all active:scale-95">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;