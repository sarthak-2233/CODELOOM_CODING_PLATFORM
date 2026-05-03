import React from 'react'
import { Routes, Route, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from './authSlice';
import { useEffect } from 'react';
import MainPage from './LandingPage/MainPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProblemPage from './pages/ProblemPage';
import UserDashboard from './components/UserDashboard';
import Admin from './pages/Admin';
import AdminPanel from './pages/AdminPanel';
import AdminDelete from './components/AdminDelete';
import AdminVideo from './components/AdminVideo';
import AdminUpload from './components/AdminUpload';
import ManifestoPage from './LandingPage/components/ManifestoPage';
import About from './LandingPage/components/About';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <>
      <Routes>
        {/* Landing page - accessible to everyone */}
        <Route path="/" element={<MainPage />} />
        
        {/* ManifestoPage */}
        <Route path="/manifesto" element={<ManifestoPage />} />
        
        {/* About us 0*/}
        <Route path="/about" element={<About />} />

        {/* Problems page - only for authenticated users */}
        <Route 
          path="/problems" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />} 
        />
        
        {/* Alternative route for home */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />} 
        />
        
        {/* Auth routes - redirect to problems if already authenticated */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/problems" /> : <LoginPage />} 
        />
        
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/problems" /> : <SignUpPage />} 
        />
        
        {/* Problem detail page - protected */}
        <Route 
          path="/problem/:problemId" 
          element={isAuthenticated ? <ProblemPage /> : <Navigate to="/signup" />} 
        />

        {/* User Dashboard - protected */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/signup" />} 
        />
        
        {/* Admin routes - protected */}
        <Route 
          path="/admin" 
          element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/create" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/delete" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} 
        /> 
        <Route 
          path="/admin/video" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} 
        /> 
        <Route 
          path="/admin/upload" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} 
        />
        
        {/* Catch all - 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;