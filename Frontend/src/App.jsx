// App.jsx - COMPLETE WORKING VERSION
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

// IMPORT YOUR NEW ADMIN FILES
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminGuard from './components/AdminGuard';

// YOUR WORKING ADMIN COMPONENTS (THESE WORK WITH BACKEND)
import AdminPanel from './components/AdminPanel';      // Create problem - WITH BACKEND
import AdminUpload from './components/AdminUpload';    // Update problem
import AdminDelete from './components/AdminDelete';    // Delete problem
import AdminVideo from './components/AdminVideo';      // Video solution

// OTHER PAGES
import ManifestoPage from './LandingPage/components/ManifestoPage';
import About from './LandingPage/components/About';
import AuthSuccess from './utils/AuthSuccess';
import VisualizationsRoutes from './Visualisation/VisualizationsRoutes';
import ProblemUpdate from './components/ProblemUpdate';



function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* ========== PUBLIC ROUTES (Everyone can see) ========== */}
        <Route path="/" element={<MainPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/about" element={<About />} />

        {/* ========== AUTH ROUTES (Redirect if already logged in) ========== */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/problems" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/problems" /> : <SignUpPage />} 
        />

        {/* ========== PROTECTED ROUTES (Need to be logged in) ========== */}
        {/* Problems page */}
        <Route 
          path="/problems" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />} 
        />
        
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />} 
        />
        
        {/* Single problem page */}
        <Route 
          path="/problem/:problemId" 
          element={isAuthenticated ? <ProblemPage /> : <Navigate to="/signup" />} 
        />

        {/* User Dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/signup" />} 
        />

          {/* Visualizations */}
         <Route 
        path="/visualise/*" 
        element= {<VisualizationsRoutes />} 
      />


        {/* ========== ADMIN ROUTES (Need to be admin) ========== */}
        {/* 
          MAIN ADMIN LAYOUT - This wraps everything with sidebar
          When you go to /admin, it shows the layout with sidebar + content
        */}
        <Route 
          path="/admin" 
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          {/* Default page when you go to /admin */}
          <Route index element={<AdminDashboard />} />
          
          {/* Dashboard page */}
          <Route path="dashboard" element={<AdminDashboard />} />
          
          {/* CRUD Operations - THESE ARE YOUR WORKING BACKEND COMPONENTS */}
          <Route path="create" element={<AdminPanel />} />    {/* Create problem */}
          <Route path="update" element={<ProblemUpdate />} />   {/* Update problem */}
          <Route path="delete" element={<AdminDelete />} />   {/* Delete problem */}
          <Route path="video" element={<AdminVideo />} />     {/* Video solution */}
        </Route>

        {/* ========== BACKUP ADMIN ROUTES (Direct access - no sidebar) ========== */}
        {/* 
          These are your old routes that still work!
          They don't have the sidebar - just the form alone.
          Keep these as backup in case something breaks!
        */}
        <Route 
          path="/admin-create" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin-update" 
          element={isAuthenticated && user?.role === 'admin' ? <ProblemUpdate /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin-delete" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} 
        /> 
        <Route 
          path="/admin-video" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} 
        /> 
        <Route 
          path="/admin-upload" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} 
        />
        {/* GOOGLE OAUTH  */}
          <Route path="/auth-success" element={<AuthSuccess />} />



        {/* ========== 404 CATCH ALL ========== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;