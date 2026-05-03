import React from 'react';

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseClasses = "font-bold rounded-full text-sm transition-all";
  
  const variants = {
    primary: "px-8 py-3.5 bg-[#2D63FF] btn-glow text-white hover:opacity-90",
    secondary: "px-8 py-3.5 border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest glow-border",
    outline: "w-full py-3 rounded-xl border border-outline-variant/20 hover:bg-surface-container-highest"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;