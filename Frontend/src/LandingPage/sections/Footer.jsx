import React, { useState, useEffect } from 'react';
import MaterialIcon from '../components/MaterialIcon';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) observer.observe(footerElement);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Email submitted:', email);
    setEmail('');
  };

  const footerLinks = {
    Product: ['Platform', 'Environment', 'Pricing', 'Changelog'],
    Resources: ['Courses', 'Docs', 'API Reference', 'Community'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies']
  };

  const socialLinks = [
    { icon: 'github', label: 'GitHub' },
    { icon: 'twitter', label: 'Twitter' },
    { icon: 'linkedin', label: 'LinkedIn' },
    { icon: 'discord', label: 'Discord' }
  ];

  return (
    <footer 
      id="footer"
      className="relative bg-surface/95 backdrop-blur-sm border-t border-outline-variant/10 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-20 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
        <div className={`absolute -bottom-40 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-10 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Column - Larger */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-md group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center shadow-lg">
                  <MaterialIcon icon="terminal" className="text-on-primary-container text-sm" />
                </div>
              </div>
              <div className="text-xl font-bold tracking-tight text-on-surface font-headline">
                Code<span className="text-primary-container">Loom</span>
              </div>
            </div>
            
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Empowering developers to master algorithms, visualize data structures, and build with confidence.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-surface-container-highest/30 border border-outline-variant/20 focus:border-primary-container/50 focus:outline-none focus:ring-2 focus:ring-primary-container/20 text-on-surface text-sm placeholder-on-surface-variant/50 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-container/25"
                >
                  <MaterialIcon icon="send" className="text-base" />
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div 
              key={category} 
              className="lg:col-span-2"
              style={{
                animation: isVisible ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              <h5 className="font-bold text-sm mb-6 text-on-surface relative inline-block">
                {category}
                <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-primary-container/50 rounded-full" />
              </h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 group flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-1 h-0.5 bg-primary-container transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-outline-variant/10">
          {/* Copyright */}
          <div className="text-xs text-on-surface-variant/60">
            © 2024 CodeLoom, Inc. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href="#"
                className="group relative"
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease-out ${index * 0.1 + 0.5}s both` : 'none'
                }}
              >
                <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-10 h-10 rounded-full bg-surface-container-highest/30 border border-outline-variant/20 flex items-center justify-center text-on-surface-variant group-hover:text-primary-container group-hover:border-primary-container/30 transition-all duration-300 hover:scale-110">
                  <MaterialIcon icon={social.icon} className="text-lg" />
                </div>
              </a>
            ))}
          </div>

          {/* Live Support Badge */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative bg-surface-container-highest/50 backdrop-blur-sm rounded-full px-5 py-2 border border-outline-variant/20 flex items-center gap-2 hover:border-primary-container/30 transition-all duration-300">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary-container animate-ping opacity-75" />
              </div>
              <span className="text-xs font-medium text-on-surface-variant group-hover:text-primary-container transition-colors">
                Live Support Available
              </span>
              <MaterialIcon icon="support_agent" className="text-base text-primary-container" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;