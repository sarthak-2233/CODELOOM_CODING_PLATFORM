import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../authSlice';

// Schema
const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRank, setSelectedRank] = useState('ADEPT');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ranks = [
    { id: 'BEGINNER', icon: 'eco', label: 'BEGINNER' },
    { id: 'ADEPT', icon: 'swords', label: 'ADEPT' },
    { id: 'ELITE', icon: 'bolt', label: 'ELITE' },
  ];

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser({ ...data, rank: selectedRank }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0F0D] text-[#F9FDF9] font-['Inter'] selection:bg-[#b5fe00] selection:text-[#415e00] overflow-x-hidden">
      {/* Mobile Layout - Visible only on small screens */}
      <div className="block md:hidden">
        <div className="relative min-h-screen py-6 px-4">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(182, 255, 0, 0.1) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#b5fe001a] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-[#006c4b1a] rounded-full blur-[100px]" />

          

          {/* Brand */}
          <div className="relative z-10 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#b5fe00] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#415e00] font-bold text-2xl">terminal</span>
              </div>
              <span className="text-2xl font-['Space_Grotesk'] font-bold tracking-tighter text-[#f9fdf9]">CodeLoom</span>
            </div>
            <h1 className="text-3xl font-['Space_Grotesk'] font-bold tracking-tight leading-[1.2] text-[#f9fdf9] mb-2">
              Master the <span className="bg-gradient-to-br from-[#E9FFBD] to-[#B5FE00] bg-clip-text text-transparent">Syntax</span>
            </h1>
            <p className="text-sm text-[#a7aca9] leading-relaxed">
              Join over 50,000 engineers solving complex algorithms.
            </p>
          </div>

          {/* Form Container */}
          <div className="relative z-10">
            <div className="bg-[#b6ff000d] backdrop-blur-[20px] border border-[#b6ff001a] p-5 rounded-lg shadow-2xl">
              {/* Tab Switcher */}
              <div className="flex p-1 bg-[#000000] rounded-full border border-[#44494633] mb-5">
                <NavLink to="/login" className="flex-1 py-2 rounded-full text-sm font-medium transition-all text-center text-[#a7aca9] hover:text-[#f9fdf9]">
                  Sign In
                </NavLink>
                <button className="flex-1 py-2 rounded-full text-sm font-medium transition-all bg-[#b5fe00] text-[#415e00] shadow-lg">
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* First Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">IDENTITY NAME</label>
                  <input 
                    {...register('firstName')}
                    className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none ${
                      errors.firstName ? 'border-[#ff505080]' : 'border-[#4449464d]'
                    }`}
                    placeholder="Linus Torvalds"
                    type="text"
                  />
                  {errors.firstName && <p className="text-[#ff9090] text-[10px] ml-1">{errors.firstName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">IDENTITY VECTOR (EMAIL)</label>
                  <input 
                    {...register('emailId')}
                    className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none ${
                      errors.emailId ? 'border-[#ff505080]' : 'border-[#4449464d]'
                    }`}
                    placeholder="architect@codeloom.io"
                    type="email"
                  />
                  {errors.emailId && <p className="text-[#ff9090] text-[10px] ml-1">{errors.emailId.message}</p>}
                </div>
                
                {/* Password */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#a7aca9]">SECURITY KEY</label>
                    <a className="text-[10px] text-[#b5fe00]/70 hover:text-[#b5fe00] transition-colors font-mono" href="#">FORGOT?</a>
                  </div>
                  <div className="relative">
                    <input 
                      {...register('password')}
                      className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none pr-10 ${
                        errors.password ? 'border-[#ff505080]' : 'border-[#4449464d]'
                      }`}
                      placeholder="••••••••••••" 
                      type={showPassword ? "text" : "password"}
                    />
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a7aca9] hover:text-[#b5fe00] transition-colors" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-base">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.password && <p className="text-[#ff9090] text-[10px] ml-1">{errors.password.message}</p>}
                </div>

                {/* Starting Rank */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">STARTING RANK</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ranks.map((rank) => (
                      <button 
                        key={rank.id}
                        onClick={() => setSelectedRank(rank.id)}
                        className={`group flex flex-col items-center gap-1 py-2 rounded-xl border transition-all ${
                          selectedRank === rank.id 
                          ? 'border-[#b5fe0099] bg-[#b5fe001a]' 
                          : 'border-[#44494633] bg-[#0f1512] hover:border-[#b5fe0066]'
                        }`} 
                        type="button"
                      >
                        <span 
                          className={`material-symbols-outlined text-xl ${selectedRank === rank.id ? 'text-[#b5fe00]' : 'text-[#a7aca9] group-hover:text-[#b5fe00] transition-colors'}`}
                        >
                          {rank.icon}
                        </span>
                        <span className={`text-[8px] md:text-[9px] font-mono ${selectedRank === rank.id ? 'text-[#b5fe00]' : 'text-[#a7aca9]'}`}>
                          {rank.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Logins */}
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#4449464d]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-transparent text-[#a7aca9] font-mono text-[9px]">OR CONTINUE WITH</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Google */}
                    <button 
                      onClick={() => window.location.href = 'http://localhost:8080/user/auth/google'}
                      className="flex items-center justify-center gap-2 bg-[#151B18] border border-[#4449464d] rounded-lg py-2.5 cursor-pointer hover:bg-[#1c2320] transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      <span className="text-xs text-[#A7ACA9] font-medium">Google</span>
                    </button>

                    {/* GitHub */}
                    <button 
  onClick={() => window.location.href = 'http://localhost:8080/user/auth/github'}
  style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    background: '#151B18', border: '1px solid rgba(68,73,70,0.25)',
    borderRadius: '50px', padding: '9px', cursor: 'pointer',
  }}
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#A7ACA9" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
  <span style={{ fontSize: '12px', color: '#A7ACA9', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>GitHub</span>
</button>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[#b5fe00] text-[#415e00] font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(182,255,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#415e00] border-t-transparent rounded-full animate-spin" />
                      <span>INITIALIZING...</span>
                    </>
                  ) : (
                    <>
                      Initialize Session
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Legal Footer */}
              <p className="text-center text-[9px] text-[#a7aca999] font-mono leading-relaxed mt-4">
                BY INITIALIZING, YOU CONSENT TO THE 
                <a className="text-[#a7aca9] hover:text-[#b5fe00] underline decoration-[#b5fe004d] underline-offset-4 mx-1" href="#">TERMS</a> 
                AND 
                <a className="text-[#a7aca9] hover:text-[#b5fe00] underline decoration-[#b5fe004d] underline-offset-4 mx-1" href="#">DATA PROTOCOLS</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Visible on medium and above */}
      <div className="hidden md:flex h-screen w-full flex-row overflow-hidden">
        {/* Left Section: Branding & Social Proof */}
        <section className="relative w-1/2 flex flex-col justify-center px-12 py-8 overflow-hidden bg-[#000000]">
          {/* Background Elements */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(182, 255, 0, 0.1) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
          />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#b5fe001a] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-[#006c4b1a] rounded-full blur-[100px]" />

          <div className="relative z-10 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#202724] border border-[#4449464d] backdrop-blur-sm w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5fe00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b5fe00] shadow-[0_0_8px_#B6FF00]"></span>
              </span>
              <span className="font-mono text-[11px] tracking-widest text-[#b5fe00] font-medium">SYSTEM_STATUS: ONLINE</span>
            </div>

            {/* Brand & Headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#b5fe00] rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#415e00] font-bold text-2xl">terminal</span>
                </div>
                <span className="text-3xl font-['Space_Grotesk'] font-bold tracking-tighter text-[#f9fdf9]">CodeLoom</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-['Space_Grotesk'] font-bold tracking-tight leading-[1.2] text-[#f9fdf9]">
                Master the <span className="bg-gradient-to-br from-[#E9FFBD] to-[#B5FE00] bg-clip-text text-transparent">Syntax</span> <br/>of Success.
              </h1>
              <p className="text-sm text-[#a7aca9] max-w-lg font-['Inter'] leading-relaxed">
                Join over 50,000 engineers solving complex algorithms and building the future of software in the most advanced digital arena ever constructed.
              </p>
            </div>

            {/* Social Proof Card */}
            <div className="bg-[#b6ff000d] backdrop-blur-[20px] border border-[#b6ff001a] p-5 rounded-2xl max-w-sm">
              <p className="font-mono uppercase tracking-widest text-[10px] text-[#a7aca9] mb-3">RECENTLY JOINED AND TESTED</p>
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-[#0a0f0d] object-cover"
                    src="https://lh3.googleusercontent.com/aida/ADBb0uh7DG2PGarcXFMOqrRCkG7HwLy-QJfOyOOrRoe_CVUGl746oVBlqyHcVfAN6my83zdWETMR9HaYSq9q0Wbmy43Lu9rSyoAOqVDNc258Ze9nNhTPFjn2CkYuiZ9YmAKMmhvfWdX1HVh-xeJ8FfWhWUx8lritb7W42E7r_pdp9eMCPMMIrA4NvXfTB7PaKG2pqnv5zZ8MD7MCnDjdl866Dn620-MO_sKHJJf_c5RrYrClmFe4GHcJTYrCjvk-iG-Lq351jdPNd6xm"
                    alt="Engineer"
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-[#0a0f0d] object-cover"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujO8lsWYwJ04qXTq-NT7xPyxqIhjY8pNqMQQzMB3H2czl3YwOWWxfB0b_oU2CXNKCCd7zbXVNyhG7PZzW82lTXinoeX2vZTJftcvATTvIV8PsicH2J8U-Tp7gZwc7J7SXD8bX50rpi9YChDjhyS1ri_BLS99bjnQ-_zeAJPfhGXJfezANqmrcVWculmlJvVaKN8tBUXn85rFV4woH6Zn-IsKdFf5ZfQH8A50tTFakbWWN9SvDpnuFFVGK71zhBkn9SAV1WEkTU7AQ"
                    alt="Engineer"
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-[#0a0f0d] object-cover"
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugDO3rE3h_Ay7NTGtklLwaAxHrhrSMNsafPj-fNJSaXeHfGKzFy3H6U0RQpO10V2ie2V5EfWwT_TvMWeOBUvMP1eDdApD2JhvAuebFEuhNXqpTLSMl68DNTVy7puhCVHSPyOFY5rIctU7EM9h6dWbKcDRdwY3_fYtj_7hzPllTmkfd2wSIkqskfvzsNeag0dPzrjLRlMkcKkZtrmZO2wLEvAv1mnZuRZ0uHm9N26JjC6eKG_6bcVIIoWiIcwDwesHimDCoW5v8g9g"
                    alt="Engineer"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0a0f0d] bg-[#202724] flex items-center justify-center text-[#b5fe00] text-xs font-bold">
                    +2k
                  </div>
                </div>
                <div className="h-8 w-px bg-[#4449464d]"></div>
                <div>
                  <div className="text-[#f9fdf9] font-['Space_Grotesk'] font-bold text-xl">52.4k</div>
                  <div className="text-[#a7aca9] text-[9px]">Active Architects</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Sign Up Form */}
        <section className="relative w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-[#0a0f0d] overflow-y-auto">
          <div className="w-full max-w-md space-y-5 relative z-10">
            {/* Glassmorphic Auth Container */}
            <div className="bg-[#b6ff000d] backdrop-blur-[20px] border border-[#b6ff001a] p-6 rounded-lg shadow-2xl space-y-5">
              
              {/* Tab Switcher */}
              <div className="flex p-1 bg-[#000000] rounded-full border border-[#44494633]">
                <NavLink to="/login" className="flex-1 py-2 rounded-full text-sm font-medium transition-all text-center text-[#a7aca9] hover:text-[#f9fdf9]">
                  Sign In
                </NavLink>
                <button className="flex-1 py-2 rounded-full text-sm font-medium transition-all bg-[#b5fe00] text-[#415e00] shadow-lg">
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* First Name */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">IDENTITY NAME</label>
                  <input 
                    {...register('firstName')}
                    className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none ${
                      errors.firstName ? 'border-[#ff505080]' : 'border-[#4449464d]'
                    }`}
                    placeholder="Linus Torvalds"
                    type="text"
                  />
                  {errors.firstName && <p className="text-[#ff9090] text-[9px] ml-1">{errors.firstName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">IDENTITY VECTOR (EMAIL)</label>
                  <input 
                    {...register('emailId')}
                    className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none ${
                      errors.emailId ? 'border-[#ff505080]' : 'border-[#4449464d]'
                    }`}
                    placeholder="architect@codeloom.io"
                    type="email"
                  />
                  {errors.emailId && <p className="text-[#ff9090] text-[9px] ml-1">{errors.emailId.message}</p>}
                </div>
                
                {/* Password */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-[#a7aca9]">SECURITY KEY</label>
                    <a className="text-[9px] text-[#b5fe00]/70 hover:text-[#b5fe00] transition-colors font-mono" href="#">FORGOT?</a>
                  </div>
                  <div className="relative">
                    <input 
                      {...register('password')}
                      className={`w-full bg-[#20272466] border rounded-lg px-3 py-2.5 text-sm text-[#f9fdf9] placeholder:text-[#a7aca966] focus:ring-1 focus:ring-[#b5fe0080] focus:border-[#b5fe0080] transition-all outline-none pr-10 ${
                        errors.password ? 'border-[#ff505080]' : 'border-[#4449464d]'
                      }`}
                      placeholder="••••••••••••" 
                      type={showPassword ? "text" : "password"}
                    />
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a7aca9] hover:text-[#b5fe00] transition-colors" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-base">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.password && <p className="text-[#ff9090] text-[9px] ml-1">{errors.password.message}</p>}
                </div>

                {/* Starting Rank */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a7aca9] ml-1">STARTING RANK</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ranks.map((rank) => (
                      <button 
                        key={rank.id}
                        onClick={() => setSelectedRank(rank.id)}
                        className={`group flex flex-col items-center gap-1 py-2 rounded-xl border transition-all ${
                          selectedRank === rank.id 
                          ? 'border-[#b5fe0099] bg-[#b5fe001a]' 
                          : 'border-[#44494633] bg-[#0f1512] hover:border-[#b5fe0066]'
                        }`} 
                        type="button"
                      >
                        <span 
                          className={`material-symbols-outlined text-xl ${selectedRank === rank.id ? 'text-[#b5fe00]' : 'text-[#a7aca9] group-hover:text-[#b5fe00] transition-colors'}`}
                        >
                          {rank.icon}
                        </span>
                        <span className={`text-[9px] font-mono ${selectedRank === rank.id ? 'text-[#b5fe00]' : 'text-[#a7aca9]'}`}>
                          {rank.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Logins */}
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#4449464d]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-transparent text-[#a7aca9] font-mono text-[9px]">OR CONTINUE WITH</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Google */}
                    <button 
                      onClick={() => window.location.href = 'http://localhost:8080/user/auth/google'}
                      className="flex items-center justify-center gap-2 bg-[#151B18] border border-[#4449464d] rounded-lg py-2.5 cursor-pointer hover:bg-[#1c2320] transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      <span className="text-xs text-[#A7ACA9] font-medium">Google</span>
                    </button>

                    {/* GitHub */}
                    <button 
                      onClick={() => window.location.href = 'http://localhost:8080/user/auth/github'}
                      className="flex items-center justify-center gap-2 bg-[#151B18] border border-[#4449464d] rounded-lg py-2.5 cursor-pointer hover:bg-[#1c2320] transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#A7ACA9" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-xs text-[#A7ACA9] font-medium">GitHub</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[#b5fe00] text-[#415e00] font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(182,255,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#415e00] border-t-transparent rounded-full animate-spin" />
                      <span>INITIALIZING...</span>
                    </>
                  ) : (
                    <>
                      Initialize Session
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Legal Footer */}
              <p className="text-center text-[8px] text-[#a7aca999] font-mono leading-relaxed">
                BY INITIALIZING, YOU CONSENT TO THE 
                <a className="text-[#a7aca9] hover:text-[#b5fe00] underline decoration-[#b5fe004d] underline-offset-4 mx-1" href="#">TERMS OF ENGAGEMENT</a> 
                AND 
                <a className="text-[#a7aca9] hover:text-[#b5fe00] underline decoration-[#b5fe004d] underline-offset-4 mx-1" href="#">DATA PROTOCOLS</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUpPage;