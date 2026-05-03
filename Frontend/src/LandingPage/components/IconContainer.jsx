import React from 'react';
import MaterialIcon from './MaterialIcon';

const IconContainer = ({ icon, className = "" }) => {
  return (
    <div className={`icon-container ${className}`}>
      <MaterialIcon icon={icon} className="text-primary-container text-2xl" />
    </div>
  );
};

export default IconContainer;