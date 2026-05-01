import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

// Schema
const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
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

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="h-screen w-screen bg-[#0A0F0D] text-[#F9FDF9] font-['Inter'] selection:bg-[#b5fe00] selection:text-[#415e00] overflow-hidden flex flex-col">
      <main className="flex-1 flex flex-row overflow-hidden">
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
              <h1 className="text-5xl md:text-6xl font-['Space_Grotesk'] font-bold tracking-tight leading-[1.2] text-[#f9fdf9]">
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
        <section className="relative w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-[#0a0f0d]">
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

              {/* Error Message
              {error && (
                <div className="bg-[#ff505014] border border-[#ff505040] rounded-lg py-2 px-3 text-[#ff9090] text-[10px] text-center font-mono">
                  PROTOCOL_ERROR: {error}
                </div>
              )} */}

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
                          style={rank.id === 'ADEPT' && selectedRank === 'ADEPT' ? { fontVariationSettings: "'FILL' 1" } : {}}
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
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="flex items-center justify-center gap-2 py-2 rounded-full bg-[#1a211e] border border-[#44494633] hover:bg-[#202724] transition-colors">
                    <img alt="Google" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZJm032usiR2_yhFw6KV1inDd4tYcq6gTDw0SyAXw9rznsoqvSflyJ1elVDKwa4lwVcEDu0Co8iq1-TWRACNcJnnN8TgoSmtxRIJ--7arbmjTWQlB24SsIiUdUHK-eJl5EkzaeZMDXGaxkUXck-e6YgjwHZI4P76zST22Ge6eblQn9eFXR23OTQkxsr8rqWNuUAFxtjaSNcbo_0eko7AGIw-yfbfIzUdT7xsCm4SEYL9_gEjhGUjmzVj1pSjwMaw_9IiazZKEUNxo"/>
                    <span className="text-xs font-medium text-[#f9fdf9]">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 rounded-full bg-[#1a211e] border border-[#44494633] hover:bg-[#202724] transition-colors">
                    <img alt="GitHub" className="w-4 h-4 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbjt9M5HBRORhILlz_7_tH0CUFiOGJ0MPOXmpUtF_uDKzDMfGBzLJeDKW_5IeE8vDYoJR6HwvTFIXi5b6wcaQh9SavnmIohdjFn3_huq5Gf1lMjlzjHDOmtwjrYTvLtS6A1bK1m_Stqf7k_2sv8_PJ2AJT8D_lBMKk4kgt09JrFUI8z7Bz1zEJ0L8wwgo5POOVNlqy09XBEfuu61eg7vGLwnzfMh5eFCldNlEhAGTzEuE1C6cZCL2g9eLVGDEiQSGud_Y1yZhn8BA"/>
                    <span className="text-xs font-medium text-[#f9fdf9]">GitHub</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-full bg-[#b5fe00] text-[#415e00] font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(182,255,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
      </main>
    </div>
  );
}

export default SignUpPage;