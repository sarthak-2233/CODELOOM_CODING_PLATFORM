import React from 'react';

const TestimonialCard = ({ name, title, text, image }) => {
  return (
    <div className="p-6 rounded-2xl testimonial-card flex flex-col h-full">
      {/* Avatar and info row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar Image */}
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
            <span className="text-on-primary-container font-bold text-lg">
              {name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Name and Title */}
        <div>
          <h4 className="font-headline font-bold text-lg text-on-surface">
            {name}
          </h4>
          <p className="text-xs text-primary-container font-medium uppercase tracking-wider">
            {title}
          </p>
        </div>
      </div>
      
      {/* Testimonial Text */}
      <div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          "{text}"
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;