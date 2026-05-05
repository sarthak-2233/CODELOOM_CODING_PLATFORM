// AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-[#f9fdf9] mb-2 uppercase">
              Admin <span className="text-[#b5fe00]">Management</span>
            </h1>
            <p className="text-[#a7aca9] max-w-lg font-light tracking-wide">
              Command center for algorithmic problem sets. Execute architectural modifications to the system logic with precision and speed.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#a7aca9]">System Uptime</p>
              <p className="font-['Space_Grotesk'] font-bold text-[#68fcbf]">99.998%</p>
            </div>
            <div className="h-10 w-[1px] bg-[#444946]/30"></div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#a7aca9]">Active Instances</p>
              <p className="font-['Space_Grotesk'] font-bold text-[#68fcbf]">1,402</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Card 1: Create Problem */}
        <div className="lg:col-span-2 bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer relative overflow-hidden h-[320px] flex flex-col justify-between border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[160px]">add_box</span>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-[#b5fe00]/10 flex items-center justify-center mb-6 border border-[#b5fe00]/20 group-hover:bg-[#b5fe00] group-hover:text-[#476700] transition-all duration-300">
              <span className="material-symbols-outlined">add_box</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-3xl font-semibold mb-2 text-[#f9fdf9]">Create Problem</h3>
            <p className="text-[#a7aca9] text-sm leading-relaxed max-w-sm">
              Initialize a new algorithmic challenge. Define constraints, test cases, and metadata for global deployment.
            </p>
          </div>
          <div className="flex items-center text-[#b5fe00] text-xs font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform">
            Initialize Deployment <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
          </div>
        </div>

        {/* Card 2: Video Solution */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="w-12 h-12 rounded-full bg-[#006c4b]/20 flex items-center justify-center mb-6 border border-[#006c4b]/40 group-hover:border-[#68fcbf] transition-all">
            <span className="material-symbols-outlined text-[#68fcbf]">smart_display</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Video Solution</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Upload and sync high-resolution solution walkthroughs.
            </p>
          </div>
          <div className="mt-6">
            <span className="bg-[#68fcbf]/10 text-[#68fcbf] text-[9px] px-2 py-1 rounded-full border border-[#68fcbf]/20">LIVE_SYNC</span>
          </div>
        </div>

        {/* Card 3: System Status */}
        <div className="bg-[#1a211e] rounded-lg p-8 flex flex-col justify-between border border-[#444946]/10">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-widest text-[#a7aca9] uppercase">CPU_LOAD</span>
              <span className="text-[#b5fe00] text-xs font-bold">12%</span>
            </div>
            <div className="h-1 bg-[#202724] rounded-full overflow-hidden">
              <div className="h-full bg-[#b5fe00] w-[12%]"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] tracking-widest text-[#a7aca9] uppercase">MEM_ALLOC</span>
              <span className="text-[#68fcbf] text-xs font-bold">4.2GB</span>
            </div>
            <div className="h-1 bg-[#202724] rounded-full overflow-hidden">
              <div className="h-full bg-[#68fcbf] w-[45%]"></div>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-[10px] text-[#a7aca9] uppercase tracking-widest mb-2">Network Hub</p>
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border border-[#0A0F0D]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9t4GKef2RKYl0v0TqbOhpM9LdqpqfIpOHfjjViKjdr8kNpSo2tzF5cW0K026hjDpwUcQFt2vculhTLZxMBvNdmtUMOhMV0hmJl13gxD5_AbCH3_WqnQDMkzHg7ccqUoHj7h7HSXzAqoXiHFX7NnxlI-sToaXPkitAfJxI62WEXUb1xuTSSdOYybw7r2z5QCRnIAmCr8_vhtMM0wtLhgXlukS50AV6WHttNuk1ugftNbpg4BRKBEeInp_ireep33fvmeOnlR7-pA" alt="tech biometric" />
              <img className="w-6 h-6 rounded-full border border-[#0A0F0D]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKb8IYAJkAPtj3ab9UjrWgGMGsuu8az0Ts-Jr9Xitnxkz513nQApapCYcdqmdbAxwQiMooXaYM53k7h4yvslGkKFluvklqJABf2seqKF1BOufMg-Nt4YFeUQScpmPibIx1HoD-JYflXRiQ4nyuisazsgDPlIx6PVZ_k2cyABDgHm3s-oOvm54_KqQ7d9bk1p3AGms2WlYmNsPVgtqc8QjLsorXqyFcCTSZGXCzDvWD3IJFC-_W5oNqc3T0JPdf2zjaQDGPZURy2yo" alt="circuit board" />
              <img className="w-6 h-6 rounded-full border border-[#0A0F0D]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOC8iFNsJyulC8leWxDmxG5dt1HLUVNdA1-bPRq3vcU_sBnT7S8ro9j-WkzfpKkfVi6QmKdjl7CWk8pH4Eg1j6cK7iz1ddArEvstWLQNwt7J_sIn_5ShsNm7ETAck3LlRiK4bpHSV_u-V0JckvukxI9WQ1xsC_gzfqUvk5Z8UxNHtjEvfV0rf8SZUh17MhtRitp3zQkwNQMi6YGL58W03B-4UnoIMZ4hCiu8cKlI0Pn2DVIXQWhuHeAjVnmMdr97V2vWLU8EcXq84" alt="data cloud" />
              <div className="w-6 h-6 rounded-full bg-[#202724] border border-[#0A0F0D] flex items-center justify-center text-[8px] text-[#f9fdf9]">+12</div>
            </div>
          </div>
        </div>

        {/* Card 4: Update Problem */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer flex flex-col justify-between lg:h-[280px] border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="w-10 h-10 rounded-full bg-[#b5fe00]/5 flex items-center justify-center mb-6 border border-[#b5fe00]/10 group-hover:bg-[#b5fe00]/20 transition-all">
            <span className="material-symbols-outlined text-[#b5fe00]">edit_note</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Update Problem</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Modify existing logic structures or adjust difficulty tiers across the registry.
            </p>
          </div>
          <div className="pt-6 border-t border-[#444946]/10 flex justify-between items-center">
            <span className="text-[10px] text-[#a7aca9]">Last mod: 2h ago</span>
            <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100 transition-opacity">north_east</span>
          </div>
        </div>

        {/* Card 5: Delete Problem */}
        <div className="bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 group transition-all cursor-pointer flex flex-col justify-between lg:h-[280px] border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="w-10 h-10 rounded-full bg-[#ff7351]/5 flex items-center justify-center mb-6 border border-[#ff7351]/10 group-hover:bg-[#ff7351]/20 transition-all">
            <span className="material-symbols-outlined text-[#ff7351]">delete_sweep</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold mb-2 text-[#f9fdf9]">Delete Problem</h3>
            <p className="text-[#a7aca9] text-xs leading-relaxed">
              Decommission inactive or deprecated problem sets from the production environment.
            </p>
          </div>
          <div className="pt-6 border-t border-[#444946]/10 flex justify-between items-center">
            <span className="text-[10px] text-[#d53d18] font-bold uppercase tracking-tighter">Requires Authorization</span>
            <span className="material-symbols-outlined text-sm text-[#ff7351]/40">lock</span>
          </div>
        </div>

        {/* Card 6: Metric Activity */}
        <div className="lg:col-span-2 bg-[rgba(182,255,0,0.03)] backdrop-blur-[20px] rounded-lg p-8 overflow-hidden relative group border border-[rgba(182,255,0,0.1)] hover:bg-[rgba(182,255,0,0.08)] hover:border-[rgba(182,255,0,0.3)]">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#a7aca9] mb-1">Global Traffic</p>
              <h3 className="font-['Space_Grotesk'] text-4xl font-bold text-[#f9fdf9]">842.1K</h3>
            </div>
            <div className="bg-[#68fcbf]/10 text-[#68fcbf] text-[10px] px-3 py-1 rounded-full font-bold">
              +12.5% INCREMENT
            </div>
          </div>
          <div className="h-32 flex items-end space-x-1">
            <div className="flex-1 bg-[#b5fe00]/20 h-[40%] rounded-t-sm group-hover:h-[60%] transition-all duration-700"></div>
            <div className="flex-1 bg-[#b5fe00]/30 h-[60%] rounded-t-sm group-hover:h-[80%] transition-all duration-700 delay-75"></div>
            <div className="flex-1 bg-[#b5fe00]/40 h-[50%] rounded-t-sm group-hover:h-[70%] transition-all duration-700 delay-100"></div>
            <div className="flex-1 bg-[#b5fe00]/60 h-[80%] rounded-t-sm group-hover:h-[95%] transition-all duration-700 delay-150"></div>
            <div className="flex-1 bg-[#b5fe00] h-[70%] rounded-t-sm group-hover:h-[85%] transition-all duration-700 delay-200"></div>
            <div className="flex-1 bg-[#68fcbf] h-[90%] rounded-t-sm group-hover:h-[100%] transition-all duration-700 delay-300"></div>
            <div className="flex-1 bg-[#68fcbf]/60 h-[40%] rounded-t-sm group-hover:h-[55%] transition-all duration-700 delay-75"></div>
            <div className="flex-1 bg-[#68fcbf]/40 h-[60%] rounded-t-sm group-hover:h-[75%] transition-all duration-700 delay-100"></div>
            <div className="flex-1 bg-[#68fcbf]/20 h-[30%] rounded-t-sm group-hover:h-[50%] transition-all duration-700 delay-150"></div>
          </div>
        </div>
      </div>

      {/* System Log Section */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Space_Grotesk'] text-lg font-bold tracking-widest uppercase text-[#f9fdf9]">System_Log</h2>
          <button className="text-[10px] font-bold uppercase tracking-widest text-[#b5fe00] hover:underline transition-all">Download Registry</button>
        </div>
        <div className="space-y-4">
          <div className="bg-[#0f1512] p-4 rounded-xl flex items-center justify-between group hover:bg-[#1a211e] transition-colors">
            <div className="flex items-center space-x-6">
              <span className="text-[10px] font-mono text-[#a7aca9]">14:22:01</span>
              <div className="w-1.5 h-1.5 bg-[#b5fe00] rounded-full shadow-[0_0_8px_rgba(182,255,0,0.8)]"></div>
              <span className="text-xs font-bold tracking-wide text-[#f9fdf9]">PROBLEM_DEPLOYED: #X892 - Reverse Matrix Link</span>
            </div>
            <span className="text-[10px] text-[#a7aca9] uppercase">Admin: Architect_01</span>
          </div>
          <div className="bg-[#0f1512] p-4 rounded-xl flex items-center justify-between group hover:bg-[#1a211e] transition-colors">
            <div className="flex items-center space-x-6">
              <span className="text-[10px] font-mono text-[#a7aca9]">13:45:12</span>
              <div className="w-1.5 h-1.5 bg-[#68fcbf] rounded-full"></div>
              <span className="text-xs font-bold tracking-wide text-[#f9fdf9]">VIDEO_SYNC_COMPLETE: #A102 - Pathfinding Logic</span>
            </div>
            <span className="text-[10px] text-[#a7aca9] uppercase">Admin: Architect_02</span>
          </div>
          <div className="bg-[#0f1512] p-4 rounded-xl flex items-center justify-between group hover:bg-[#1a211e] transition-colors">
            <div className="flex items-center space-x-6">
              <span className="text-[10px] font-mono text-[#a7aca9]">12:10:55</span>
              <div className="w-1.5 h-1.5 bg-[#d53d18] rounded-full"></div>
              <span className="text-xs font-bold tracking-wide text-[#f9fdf9]">PROBLEM_DELETED: #Z404 - Deprecated Stack Overflow</span>
            </div>
            <span className="text-[10px] text-[#a7aca9] uppercase">Admin: Architect_01</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;