import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WhyCodeLoom = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  
  const quoteText = "Precision engineered for the minds that build the future.";
  const words = quoteText.split(' ');
  
  // Lime neon color (matching your brand)
  const LIME_NEON = '#39FF14';

  useEffect(() => {
    // Start highlighting words one by one
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => {
        if (prev >= words.length - 1) {
          // Reset after reaching the last word, then start over
          setTimeout(() => {
            setActiveWordIndex(-1);
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 400); // Change word every 400ms
    
    return () => clearInterval(interval);
  }, [words.length]);

  // Framer Motion variants for left column
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, rotateY: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.7,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-24 bg-surface-container-low/20 relative overflow-hidden"
    >
      {/* Animated lime neon background glow (subtle) */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[150px]"
        style={{ backgroundColor: `rgba(57, 255, 20, 0.04)` }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight text-on-surface"
            >
              Why we built CodeLoom
            </motion.h2>
            <div className="space-y-6">
              <motion.p
                variants={itemVariants}
                className="text-on-surface-variant text-lg leading-relaxed"
              >
                As developers, we were tired of context-switching between LeetCode, Obsidian, and various YouTube visualizers. The friction of learning was too high, and the retention was too low.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-on-surface-variant text-lg leading-relaxed"
              >
                CodeLoom is our answer to the "scattered brain" problem. We built an integrated environment where your code, your notes, and your mental models live in one unified technical cockpit.
              </motion.p>
              
              {/* Quote/Manifesto Section with Sequential Word Highlighting */}
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-outline-variant/20"
              >
                <div className="text-on-surface text-xl font-headline italic leading-relaxed mb-4">
                  {words.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ color: 'inherit' }}
                      animate={{
                        color: activeWordIndex === index ? LIME_NEON : 'inherit',
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      style={{
                        display: 'inline-block',
                        marginRight: '0.25rem',
                        transition: 'color 0.2s ease',
                      }}
                      whileHover={{
                        color: LIME_NEON,
                        scale: 1.05,
                        transition: { duration: 0.1 },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                
                {/* Progress indicator for word highlighting */}
                <div className="flex gap-1 mb-4">
                  {words.map((_, index) => (
                    <motion.div
                      key={index}
                      className="h-1 rounded-full"
                      style={{
                        width: `${100 / words.length}%`,
                        backgroundColor: index <= activeWordIndex ? LIME_NEON : 'rgba(57, 255, 20, 0.2)',
                      }}
                      animate={{
                        backgroundColor: index <= activeWordIndex ? LIME_NEON : 'rgba(57, 255, 20, 0.2)',
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>
                
                <Link
                  to="/manifesto"
                  className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all group"
                  style={{ color: LIME_NEON }}
                >
                  Read our manifesto
                  <motion.span
                    className="transition-transform"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative"
          >
            <motion.div
              className="glow-border glass-morphism rounded-2xl p-4 aspect-video overflow-hidden"
              style={{
                borderColor: `rgba(57, 255, 20, 0.2)`,
              }}
              animate={{
                boxShadow: [
                  `0 0 0 0 rgba(57, 255, 20, 0.05)`,
                  `0 0 0 4px rgba(57, 255, 20, 0)`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.img
                alt="Interactive Editor"
                className="w-full h-full object-cover rounded-lg opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozCdj7I1h02xpxLDngQQfY1ZppvPc0vUp6Ej_7nX_-HolYSM6ohlOwHscyXC4yh56tK7GwbNonzDepss6Dds2GDq5BWpFW0UJp4Koky2m7L4HjqXy3cCJtngCjP6cslCcbKPIkfG1Bz2oSCHw3xD8im56ZxwAh_UL6xd2xYo82pLaufk_FvfWRSj0wVTg95zm8X2aJD_dVDtJ6hyFdYha58JB8ET87SaAZY-kv62DKjFpVCOa_69RmiMRwNfSzHMzbp000nTD8ls"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </motion.div>
            
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
              style={{ backgroundColor: `rgba(57, 255, 20, 0.08)`, filter: 'blur(100px)' }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Subtle lime neon accent dots */}
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 rounded-full"
              style={{ backgroundColor: LIME_NEON, opacity: 0.4 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: LIME_NEON, opacity: 0.3 }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 2.5,
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

export default WhyCodeLoom;