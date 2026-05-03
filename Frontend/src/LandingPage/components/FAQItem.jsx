import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details 
      className={`faq-item group faq-glass rounded-xl overflow-hidden ${isOpen ? 'open' : ''}`} 
      open={isOpen} 
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer focus:outline-none list-none">
        <span className="text-lg md:text-xl font-headline font-medium text-on-surface group-hover:text-primary-container transition-colors">
          {question}
        </span>
        <div className="faq-icon w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center transition-all duration-300">
          <MaterialIcon icon="expand_more" className="text-xl" />
        </div>
      </summary>
      <div className="faq-content">
        <div className="overflow-hidden">
          <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2">
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">{answer}</p>
          </div>
        </div>
      </div>
    </details>
  );
};

export default FAQItem;