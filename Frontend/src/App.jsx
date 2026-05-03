import React from 'react'
import { Routes, Route ,Navigate} from "react-router";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {useSelector,useDispatch} from "react-redux";
import { checkAuth } from './authSlice';
import { useEffect } from 'react';
import AdminPanel from './pages/AdminPanel';
import ProblemPage from './pages/ProblemPage';
import AdminDelete from './components/AdminDelete';
import AdminUpload from './components/AdminUpload';
import AdminVideo from './components/AdminVideo';
import Admin from './pages/Admin';
import UserDashboard from './components/UserDashboard';
import MainPage from './LandingPage/MainPage';
function App(){
  
  const dispatch = useDispatch();
  // const {isAuthenticated} = useSelector((state)=>state.auth);
  const { isAuthenticated, loading,user } = useSelector((state) => state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
  <>
      <Routes>
        {/* Landing page as default route */}
        <Route path="/" element={<MainPage />} />
        
        {/* Dashboard for authenticated users */}
        <Route path="/dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
        
        {/* Home page (your main app after login) */}
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        
        {/* Auth routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} />
        
        {/* Problem page - protected */}
        <Route path="/problem/:problemId" element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />

        {/* Admin routes */}
        <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
        <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
        <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
        <Route path="/admin/upload" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;
