import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Lime neon color constant
  const LIME_NEON = '#39FF14';
  
  const phrases = [
    { text: "Master DSA with ease ✨", highlight: "DSA" },
    { text: "Visualize algorithms 🎨", highlight: "algorithms" },
    { text: "Memory-friendly notes 📝", highlight: "notes" },
    { text: "Code with confidence 🚀", highlight: "Code" }
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout;
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setTypingText(prev => prev.slice(0, -1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setTypingText(prev => currentPhrase.text.slice(0, prev.length + 1));
      }, 100);
    }
    
    if (!isDeleting && typingText === currentPhrase.text) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    }
    
    if (isDeleting && typingText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
    
    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentPhraseIndex, phrases]);

  // Add lime neon animations to document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes limeNeonPulse {
        0%, 100% {
          text-shadow: 0 0 5px rgba(57, 255, 20, 0.5),
                       0 0 10px rgba(57, 255, 20, 0.3),
                       0 0 15px rgba(57, 255, 20, 0.2);
        }
        50% {
          text-shadow: 0 0 10px rgba(57, 255, 20, 0.8),
                       0 0 20px rgba(57, 255, 20, 0.5),
                       0 0 30px rgba(57, 255, 20, 0.3);
        }
      }
      
      @keyframes limeGlowPulse {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.05);
        }
      }
      
      @keyframes limeBorderGlow {
        0%, 100% {
          border-color: rgba(57, 255, 20, 0.3);
          box-shadow: 0 0 5px rgba(57, 255, 20, 0.2);
        }
        50% {
          border-color: rgba(57, 255, 20, 0.8);
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative pt-20 pb-12 overflow-hidden bg-grid min-h-[90vh] flex items-center"
    >
      {/* Animated background elements with lime neon */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px]"
        style={{ backgroundColor: `rgba(57, 255, 20, 0.08)` }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-[120px]"
        style={{ backgroundColor: `rgba(57, 255, 20, 0.06)` }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants} className="max-w-xl">
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-headline font-bold text-on-surface leading-[1.1] tracking-tight mb-8"
            >
              Master algorithms, memory-friendly notes, and{" "}
              <motion.span
                className="inline-block relative"
                style={{
                  background: `linear-gradient(135deg, ${LIME_NEON} 0%, #7FFF00 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                DSANotesVisuals.
                <motion.span
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.3), transparent)`,
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.span>
            </motion.h1>
            
            {/* Typing Animation Section with Lime Neon Highlight */}
            <motion.div
              variants={itemVariants}
              className="mb-8 p-4 bg-surface-container/50 rounded-xl border backdrop-blur-sm"
              style={{
                borderColor: `rgba(57, 255, 20, 0.3)`,
                boxShadow: `0 0 20px rgba(57, 255, 20, 0.1)`,
                animation: 'limeBorderGlow 2s ease-in-out infinite'
              }}
            >
              <div className="flex items-center gap-2 text-lg font-mono text-on-surface-variant">
                <span style={{ color: LIME_NEON, textShadow: `0 0 5px rgba(57, 255, 20, 0.5)` }}>$</span>
                <span className="font-medium">learn dsa --interactive</span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-semibold min-h-[64px] flex items-center">
                  <span>
                    {typingText.split(/(DSA|algorithms|notes|Code)/gi).map((part, index) => {
                      if (part.toLowerCase() === 'dsa' || 
                          part.toLowerCase() === 'algorithms' || 
                          part.toLowerCase() === 'notes' || 
                          part.toLowerCase() === 'code') {
                        return (
                          <span
                            key={index}
                            className="relative inline-block"
                            style={{
                              color: LIME_NEON,
                              textShadow: `0 0 10px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)`,
                              animation: 'limeNeonPulse 1.5s ease-in-out infinite'
                            }}
                          >
                            {part}
                          </span>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    })}
                  </span>
                  <motion.span
                    className="w-[3px] h-7 ml-1"
                    style={{ backgroundColor: LIME_NEON, boxShadow: `0 0 5px ${LIME_NEON}` }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
                <p className="text-sm text-on-surface-variant/70 mt-2">
                  ⚡ Interactive learning • Visual simulations • Instant feedback
                </p>
              </div>
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-on-surface-variant mb-10 font-body leading-relaxed"
            >
              CodeLoom blends hands-on DSA practice, concise developer notes, and interactive visual tools — crafted to help engineers learn faster, retain more, and ship with confidence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="primary">Start Learning</Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="secondary">Explore Content</Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative"
          >
            <motion.div
              className="glow-border glass-morphism rounded-2xl p-6 overflow-hidden"
              style={{
                boxShadow: `0 0 30px rgba(57, 255, 20, 0.2)`,
                borderColor: `rgba(57, 255, 20, 0.3)`
              }}
              animate={{
                boxShadow: [
                  `0 0 0 0 rgba(57, 255, 20, 0.2)`,
                  `0 0 0 8px rgba(57, 255, 20, 0)`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.img
                alt="Data Structure Visualization"
                className="w-full rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrUyq6AbKrEOuKHYH__pDh0qx-TrsltkufCXdibG9AKiPNu5LsNCeSIqq5JjC1ckjJ7JiujValqSqSktxXIMKXGmELMbE1wf_iEaV2jZPnLeHPYX57iHClNgbRiZIJC-hjibnG1ksacpkSHXbKWhla7XuQPnSsl9wgDn_-_eumnSMLqHP0O0amUxEFKwytshwmAG1GG3tQ_QJr0W7RS1DBnBNo0409lJ5vpbvArOJgsteSpNn1urucJK0DxE7yZRivxAJM_00rGkg"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20 }}
              />
            </motion.div>
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
              style={{ backgroundColor: `rgba(57, 255, 20, 0.15)`, filter: 'blur(100px)' }}
              variants={glowVariants}
              animate="animate"
            />
            
            {/* Floating algorithm elements with lime neon */}
            
            {/* Additional lime neon accent dots */}
            <motion.div
              className="absolute top-1/2 -right-3 w-3 h-3 rounded-full"
              style={{ backgroundColor: LIME_NEON, boxShadow: `0 0 10px ${LIME_NEON}` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-1/3 -left-3 w-2 h-2 rounded-full"
              style={{ backgroundColor: LIME_NEON, boxShadow: `0 0 8px ${LIME_NEON}` }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;