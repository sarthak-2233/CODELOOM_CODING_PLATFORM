import React from 'react';

const MaterialIcon = ({ icon, className = "" }) => (
  <span 
    className={`material-symbols-outlined ${className}`} 
    style={{ fontVariationSettings: "'FILL' 1" }}
  >
    {icon}
  </span>
);

export default MaterialIcon;