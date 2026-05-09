import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../authSlice';

function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [processed, setProcessed] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    
    
    if (token && !processed) {
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // ✅ IMPORTANT: Set the cookie manually (this is what backend normally does)
      document.cookie = `token=${token}; path=/; max-age=3600`;
      
      // Decode token to get user info
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const user = JSON.parse(atob(base64));
        
        dispatch(loginSuccess({ user, token }));
      } catch (e) {
        
        dispatch(loginSuccess({ token }));
      }
      setProcessed(true);
    } else if (!token) {
      
      navigate('/login');
    }
  }, [dispatch, navigate, processed]);
  
  // Wait for authentication to complete before redirecting
  useEffect(() => {
    if (isAuthenticated && processed) {
      
      navigate('/problems');
    }
  }, [isAuthenticated, navigate, processed]);
  
  return (
    <div style={{ 
      background: '#0A0F0D', 
      color: '#B6FE00', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '20px',
      fontFamily: 'monospace'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #B6FE00',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear Infinite'
      }} />
      <div>Completing Google authentication...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AuthSuccess;