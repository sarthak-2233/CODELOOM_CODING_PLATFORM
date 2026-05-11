import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import Navbar from './../LandingPage/components/Navbar';

const signupSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(loginUser(data));
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

      <div style={{
        background: '#0A0F0D',
        color: '#F9FDF9',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glows */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '40%', height: '40%',
          background: 'rgba(233,255,189,0.08)',
          borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '30%', height: '30%',
          background: 'rgba(104,252,191,0.05)',
          borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none',
        }} />

          <Navbar/>        

        {/* Card */}
        <div style={{
          width: '100%',
          maxWidth: '380px',
          margin: '0 16px',
          background: 'rgba(182,255,0,0.03)',
          backdropFilter: 'blur(24px)',
          borderRadius: '16px',
          padding: '32px 28px',
          border: '1px solid rgba(182,255,0,0.1)',
          boxShadow: '0 32px 64px -12px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 10,
        }}>
          
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#F9FDF9', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
              Access Terminal
            </h2>
            <p style={{ fontSize: '10px', color: '#A7ACA9', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
              Identify yourself to continue
            </p>
          </div>

          

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '10px', fontWeight: 600, color: '#A7ACA9', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: '#717773', pointerEvents: 'none', lineHeight: 1,
                }}>alternate_email</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register('emailId')}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(32,39,36,0.6)',
                    border: `1px solid ${errors.emailId ? 'rgba(255,80,80,0.5)' : 'rgba(68,73,70,0.3)'}`,
                    borderRadius: '50px',
                    padding: '10px 14px 10px 38px',
                    color: '#F9FDF9',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(182,255,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = errors.emailId ? 'rgba(255,80,80,0.5)' : 'rgba(68,73,70,0.3)'}
                />
              </div>
              {errors.emailId && (
                <span style={{ fontSize: '11px', color: '#FF9090', marginLeft: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.emailId.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', padding: '0 4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 600, color: '#A7ACA9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Security Key
                </label>
                <a href="#" style={{ fontSize: '9px', color: '#B6FE00', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Forgot?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '18px', color: '#717773', pointerEvents: 'none', lineHeight: 1,
                }}>lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(32,39,36,0.6)',
                    border: `1px solid ${errors.password ? 'rgba(255,80,80,0.5)' : 'rgba(68,73,70,0.3)'}`,
                    borderRadius: '50px',
                    padding: '10px 40px 10px 38px',
                    color: '#F9FDF9',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(182,255,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = errors.password ? 'rgba(255,80,80,0.5)' : 'rgba(68,73,70,0.3)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#717773', padding: 0, lineHeight: 1,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <span style={{ fontSize: '11px', color: '#FF9090', marginLeft: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '50px',
                background: loading ? 'rgba(182,255,0,0.4)' : 'linear-gradient(135deg, #E9FFBD, #B6FE00)',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#415E00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: loading ? 'none' : '0 0 16px rgba(182,255,0,0.2)',
                marginBottom: '20px',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '14px', height: '14px',
                    border: '2px solid #415E00',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ position: 'relative', marginBottom: '16px', textAlign: 'center' }}>
            <div style={{ borderTop: '1px solid rgba(68,73,70,0.3)', position: 'absolute', top: '50%', left: 0, right: 0 }} />
            <span style={{
              position: 'relative', background: '#0d1410', padding: '0 12px',
              fontSize: '9px', color: '#A7ACA9', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>Third-party Auth</span>
          </div>

          {/* Social auth */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {/* Google */}
            <button 
             onClick={() => window.location.href = 'http://localhost:8080/user/auth/google'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: '#151B18', border: '1px solid rgba(68,73,70,0.25)',
              borderRadius: '50px', padding: '9px', cursor: 'pointer',
            }}>
              <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span style={{ fontSize: '12px', color: '#A7ACA9', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Google</span>
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

          {/* Footer link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#A7ACA9', margin: 0 }}>
              Don't have an account?{' '}
              <NavLink to="/signup" style={{ color: '#B6FE00', fontWeight: 600, textDecoration: 'none' }}>
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>


        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
}

export default LoginPage;