import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      /* Modern Scrollbar Styling - Theme Matching */
      
      /* For Webkit browsers (Chrome, Safari, Edge, Brave) */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      /* Scrollbar Track */
      ::-webkit-scrollbar-track {
        background: rgba(10, 15, 13, 0.8);
        border-radius: 10px;
      }

      /* Scrollbar Handle */
      ::-webkit-scrollbar-thumb {
        background: rgba(182, 255, 0, 0.3);
        border-radius: 10px;
        transition: background 0.2s ease;
      }

      /* Scrollbar Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(182, 255, 0, 0.6);
      }

      /* Scrollbar Handle when active/clicked */
      ::-webkit-scrollbar-thumb:active {
        background: rgba(182, 255, 0, 0.8);
      }

      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(182, 255, 0, 0.3) rgba(10, 15, 13, 0.8);
      }

      /* Smooth scrolling for the whole page */
      html {
        scroll-behavior: smooth;
      }

      /* Selection color to match neon theme */
      ::selection {
        background: rgba(182, 255, 0, 0.3);
        color: #0a0f0d;
      }

      ::-moz-selection {
        background: rgba(182, 255, 0, 0.3);
        color: #0a0f0d;
      }

      /* All original CSS classes preserved exactly */
      .glass-morphism {
        background: rgba(182, 255, 0, 0.05);
        backdrop-filter: blur(32px);
        -webkit-backdrop-filter: blur(32px);
        border: 1px solid rgba(182, 255, 0, 0.15);
      }
      .neon-glow-primary:hover {
        box-shadow: 0 0 20px rgba(182, 255, 0, 0.45), 0 0 40px rgba(182, 255, 0, 0.1);
      }
      .bg-grid {
        background-image: radial-gradient(rgba(182, 255, 0, 0.07) 1px, transparent 0);
        background-size: 40px 40px;
      }
      .hero-blob {
        filter: blur(80px);
        background: radial-gradient(circle, rgba(182, 255, 0, 0.18) 0%, transparent 70%);
      }
      .glow-border {
        border: 1px solid rgba(182, 255, 0, 0.2);
        box-shadow: inset 0 0 25px rgba(182, 255, 0, 0.08);
        transition: all 0.3s ease;
      }
      .glow-border:hover, .glow-border:focus-within {
        border-color: rgba(182, 255, 0, 0.5);
        box-shadow: inset 0 0 30px rgba(182, 255, 0, 0.12), 0 0 15px rgba(182, 255, 0, 0.15);
      }
      .btn-glow:hover {
        box-shadow: 0 0 15px rgba(45, 99, 255, 0.4);
      }
      .testimonial-card {
        background: rgba(10, 15, 13, 0.6);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(182, 255, 0, 0.12);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .testimonial-card:hover {
        border-color: rgba(182, 255, 0, 0.5);
        box-shadow: 0 0 30px rgba(182, 255, 0, 0.1);
        transform: translateY(-4px);
      }
      .premium-card {
        position: relative;
        overflow: hidden;
        transition: all 0.5s ease-out;
        background: linear-gradient(135deg, rgba(182, 255, 0, 0.08) 0%, rgba(10, 15, 13, 0.4) 50%, rgba(45, 99, 255, 0.05) 100%);
        backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(182, 255, 0, 0.15);
      }
      .premium-card:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: rgba(182, 255, 0, 0.6);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(182, 255, 0, 0.15);
      }
      .premium-card::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(182, 255, 0, 0.15) 0%, transparent 80%);
      }
      .premium-card:hover::before {
        opacity: 1;
      }
      .offering-glow {
        position: absolute;
        z-index: -10;
        width: 12rem;
        height: 12rem;
        border-radius: 9999px;
        filter: blur(80px);
        opacity: 0.2;
        pointer-events: none;
      }
      .icon-container {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s;
        background: rgba(182, 255, 0, 0.1);
        box-shadow: inset 0 0 10px rgba(182, 255, 0, 0.2);
      }
      .premium-card:hover .icon-container {
        transform: scale(1.1) rotate(3deg);
        background: rgba(182, 255, 0, 0.2);
        box-shadow: 0 0 20px rgba(182, 255, 0, 0.3);
      }
      .faq-item {
        transition: all 0.5s;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(10, 15, 13, 0.2);
      }
      .faq-item:hover {
        background: rgba(182, 255, 0, 0.03);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(182, 255, 0, 0.05);
      }
      .faq-glass {
        background: rgba(182, 255, 0, 0.02);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(182, 255, 0, 0.12);
      }
      .faq-item[open] {
        background: rgba(15, 18, 20, 0.4);
        border-color: rgba(182, 255, 0, 0.3);
      }
      .faq-item[open] summary .faq-icon {
        transform: rotate(180deg);
        color: #b5fe00;
      }
      .faq-content {
        transition: grid-template-rows 0.3s ease-out;
        display: grid;
        grid-template-rows: 0fr;
      }
      .faq-item[open] .faq-content {
        grid-template-rows: 1fr;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }
      body {
        background-color: #0a0f0d;
        color: #f9fdf9;
      }
    `}</style>
  );
};

export default GlobalStyles;