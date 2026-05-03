import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MaterialIcon from './MaterialIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navLinks = [
    { name: 'Problems', path: '/problems', id: 1 },
    { name: 'Visualise', path: '/visualise', id: 2 },
    { name: 'Docs', path: '/docs', id: 3 },
    { name: 'About Us', path: '/about', id: 4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // If user is authenticated, show dashboard link instead
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3 flex justify-center' : 'py-6'
    }`}>
      <div className={`transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-6 py-2' 
          : 'max-w-7xl mx-auto px-10'
      }`}>
        <nav className={`flex justify-between items-center ${
          scrolled ? 'gap-8' : ''
        }`}>
          {/* Logo - Clickable */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-primary-container rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <MaterialIcon icon="terminal" className="text-on-primary-container text-xl" />
            </div>
            <div className="text-xl font-bold tracking-tight text-on-surface font-headline">CodeLoom</div>
          </button>

          {/* Nav links - using Link from react-router */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              (!scrolled || (scrolled && (link.name === 'Problems' || link.name === 'Visualise'))) && (
                <Link 
                  key={link.id}
                  className="text-sm font-medium text-on-surface-variant hover:text-primary-container transition-all" 
                  to={link.path}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {isAuthenticated ? (
              <button 
                onClick={handleDashboardClick}
                className="bg-primary-container text-on-primary-container font-headline rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg px-5 py-1.5"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className={`text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all ${
                    scrolled ? 'hidden sm:block' : 'block'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={handleSignUp}
                  className="bg-[#2D63FF] btn-glow text-white font-headline rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 px-5 py-1.5"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;