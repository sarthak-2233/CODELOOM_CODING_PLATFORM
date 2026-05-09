import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';

function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ token }));
      navigate('/');
    }
  }, [dispatch, navigate]);
  
  return (
    <div style={{ 
      background: '#0A0F0D', 
      color: '#B6FE00', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'monospace'
    }}>
      Logging you in...
    </div>
  );
}

export default AuthSuccess;