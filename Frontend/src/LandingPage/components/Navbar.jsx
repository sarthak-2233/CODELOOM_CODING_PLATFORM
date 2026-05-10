import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcon from './MaterialIcon';
import { logoutUser } from '../../authSlice.js';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinks = [
    { name: 'Problems', path: '/problems', id: 1 },
    { name: 'Visualise', path: '/visualise/sorting', id: 2 },
    { name: 'Docs', externalUrl: 'https://github.com/sarthak-2233/CODELOOM_CODING_PLATFORM', id: 3 },
    { name: 'About Us', path: '/about', id: 4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogin = () => {
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate('/signup');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Get user display name
  const getDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 flex justify-center' : 'py-6'
      }`}>
        <div className={`transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0A0F0D]/90 backdrop-blur-xl rounded-full shadow-lg border border-[#B6FE00]/20 px-6 py-2' 
            : 'max-w-7xl mx-auto px-10'
        }`}>
          <nav className={`flex justify-between items-center ${
            scrolled ? 'gap-8' : ''
          }`}>
            {/* Logo - Clickable */}
            <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-[#B6FE00] rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                <MaterialIcon icon="terminal" className="text-[#1A2E05] text-xl" />
              </div>
              <div className="text-xl font-bold tracking-tight text-[#F9FDF9] font-headline">CodeLoom</div>
            </button>

            {/* Nav links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                (!scrolled || (scrolled && (link.name === 'Problems' || link.name === 'Visualise'))) && (
                  link.externalUrl ? (
                    <a 
                      key={link.id}
                      className="text-sm font-medium text-[#A7ACA9] hover:text-[#B6FE00] transition-all" 
                      href={link.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      key={link.id}
                      className="text-sm font-medium text-[#A7ACA9] hover:text-[#B6FE00] transition-all" 
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  )
                )
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Desktop User Section - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                {isAuthenticated ? (
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 bg-[#B6FE00]/10 hover:bg-[#B6FE00]/20 rounded-full pl-3 pr-2 py-1.5 transition-all border border-[#B6FE00]/30"
                    >
                      <span className="text-sm font-medium text-[#F9FDF9]">
                        {getDisplayName()}
                      </span>
                      <MaterialIcon 
                        icon="arrow_drop_down" 
                        className={`text-[#B6FE00] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    {/* Dropdown Menu - Dark theme matching */}
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-[#0A0F0D] rounded-xl shadow-lg border border-[#B6FE00]/20 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-[#B6FE00]/10">
                          <p className="text-xs text-[#A7ACA9] uppercase tracking-wider mb-1">Logged in as</p>
                          <p className="text-sm font-semibold text-[#F9FDF9] truncate">
                            {user?.firstName} {user?.lastName || ''}
                          </p>
                          <p className="text-xs text-[#A7ACA9] truncate">{user?.email}</p>
                        </div>
                        
                        <button
                          onClick={handleDashboardClick}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F9FDF9] hover:bg-[#B6FE00]/10 transition-colors"
                        >
                          <MaterialIcon icon="dashboard" className="text-[#B6FE00] text-lg" />
                          Dashboard
                        </button>
                        
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => {
                              navigate('/admin');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F9FDF9] hover:bg-[#B6FE00]/10 transition-colors"
                          >
                            <MaterialIcon icon="admin_panel_settings" className="text-[#B6FE00] text-lg" />
                            Admin Panel
                          </button>
                        )}
                        
                        <div className="border-t border-[#B6FE00]/10">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#FF7351] hover:bg-[#FF7351]/10 transition-colors"
                          >
                            <MaterialIcon icon="logout" className="text-[#FF7351] text-lg" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={handleLogin}
                      className="text-sm font-medium text-[#A7ACA9] hover:cursor-pointer hover:text-[#B6FE00] transition-all"
                    >
                      Login
                    </button>
                    <button 
                      onClick={handleSignUp}
                      className="bg-[#B6FE00] text-[#1A2E05] font-headline rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#B6FE00]/20 px-5 py-1.5 hover:cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Icon - Visible only on mobile */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="block md:hidden text-[#F9FDF9] p-1 rounded-lg hover:bg-[#B6FE00]/10 transition-colors"
                aria-label="Toggle menu"
              >
                <MaterialIcon icon={mobileMenuOpen ? "close" : "menu"} className="text-2xl" />
              </button>

              {/* Mobile Sign Up Button (when not authenticated) */}
              {!isAuthenticated && (
                <button 
                  onClick={handleSignUp}
                  className="block md:hidden bg-[#B6FE00] text-[#1A2E05] font-headline rounded-full font-bold text-sm px-4 py-1.5 hover:opacity-90 transition-all"
                >
                  Sign Up
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0F0D]/95 backdrop-blur-md pt-24 px-6 overflow-y-auto md:hidden">
          <div className="flex flex-col space-y-2">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              link.externalUrl ? (
                <button
                  key={link.id}
                  onClick={() => handleExternalLink(link.externalUrl)}
                  className="w-full text-left px-4 py-4 text-base font-medium text-[#F9FDF9] hover:text-[#B6FE00] hover:bg-[#B6FE00]/5 rounded-xl transition-all border-b border-[#B6FE00]/10"
                >
                  {link.name}
                  <MaterialIcon icon="open_in_new" className="inline-block ml-2 text-[#A7ACA9] text-sm" />
                </button>
              ) : (
                <button
                  key={link.id}
                  onClick={() => handleMobileNavClick(link.path)}
                  className="w-full text-left px-4 py-4 text-base font-medium text-[#F9FDF9] hover:text-[#B6FE00] hover:bg-[#B6FE00]/5 rounded-xl transition-all border-b border-[#B6FE00]/10"
                >
                  {link.name}
                </button>
              )
            ))}

            {/* Divider */}
            <div className="my-4 border-t border-[#B6FE00]/20"></div>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <div className="px-4 py-2">
                <div className="bg-[#B6FE00]/10 rounded-xl p-4 mb-4 border border-[#B6FE00]/20">
                  <p className="text-xs text-[#A7ACA9] uppercase tracking-wider mb-1">Logged in as</p>
                  <p className="text-base font-semibold text-[#F9FDF9]">
                    {user?.firstName} {user?.lastName || ''}
                  </p>
                  <p className="text-xs text-[#A7ACA9] truncate mt-1">{user?.email}</p>
                </div>
                
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base text-[#F9FDF9] hover:bg-[#B6FE00]/10 rounded-xl transition-colors"
                >
                  <MaterialIcon icon="dashboard" className="text-[#B6FE00] text-2xl" />
                  Dashboard
                </button>
                
                {user?.role === 'admin' && (
                  <button
                    onClick={() => {
                      navigate('/admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-base text-[#F9FDF9] hover:bg-[#B6FE00]/10 rounded-xl transition-colors"
                  >
                    <MaterialIcon icon="admin_panel_settings" className="text-[#B6FE00] text-2xl" />
                    Admin Panel
                  </button>
                )}
                
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base text-[#FF7351] hover:bg-[#FF7351]/10 rounded-xl transition-colors mt-2"
                >
                  <MaterialIcon icon="logout" className="text-[#FF7351] text-2xl" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-2">
                <button 
                  onClick={handleLogin}
                  className="w-full text-center text-base font-medium text-[#A7ACA9] hover:text-[#B6FE00] py-3 rounded-xl transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;