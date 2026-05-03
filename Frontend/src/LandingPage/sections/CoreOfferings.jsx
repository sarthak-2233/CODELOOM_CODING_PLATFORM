import React from 'react';
import { motion, useInView } from 'framer-motion';
import PremiumCard from './../components/PremiumCard';
import IconContainer from './../components/IconContainer';
import MaterialIcon from './../components/MaterialIcon';

const CoreOfferings = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Animation variants for the header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Animation variants for cards - each card "pops out" from center
  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1
      }
    })
  };

  // Staggered children for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual card hover animations
  const hoverVariants = {
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden -mt-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto px-10 relative">
        {/* Animated Header */}
        <motion.div 
          variants={headerVariants}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4 text-on-surface"
            >
              Core Offerings
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-on-surface-variant text-lg"
            >
              A unified ecosystem designed for modern technical mastery and engineering excellence.
            </motion.p>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent mx-10 mb-5"
          />
        </motion.div>
        
        {/* Animated Grid with Staggered Cards */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          {/* DSA Practice Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-8 md:row-span-2"
          >
            <motion.div
              variants={hoverVariants}
              className="h-full"
            >
              <PremiumCard className="rounded-2xl p-10 group h-full relative overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="offering-glow bg-primary-container -top-20 -left-20"
                />
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                    >
                      <IconContainer icon="bolt" />
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary-container/20 text-primary-container border border-primary-container/30"
                    >
                      New Content Available
                    </motion.span>
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-3xl font-headline font-bold mb-4"
                  >
                    DSA Practice
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="text-on-surface-variant text-lg leading-relaxed max-w-lg mb-8"
                  >
                    Curated problem sets with progressive difficulty, timed labs and custom testcases designed to simulate real-world technical interview environments.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="mt-auto flex items-center gap-4"
                  >
                    <button className="flex items-center gap-2 text-sm font-bold text-primary-container group-hover:gap-3 transition-all">
                      Launch Lab <MaterialIcon icon="arrow_forward" className="text-base" />
                    </button>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 50, y: 50 }}
                  animate={isInView ? { opacity: 0.2, x: 0, y: 0 } : { opacity: 0, x: 50, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 right-0 w-1/3 pointer-events-none group-hover:opacity-40 transition-opacity"
                >
                  <MaterialIcon icon="code" className="text-[12rem] text-primary-container translate-x-12 translate-y-12" />
                </motion.div>
              </PremiumCard>
            </motion.div>
          </motion.div>

          {/* Notes Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-4 md:row-span-3"
          >
            <motion.div variants={hoverVariants} className="h-full">
              <PremiumCard className="rounded-2xl p-8 group h-full overflow-hidden relative">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="offering-glow bg-[#2D63FF] -bottom-20 -right-20"
                />
                <div className="flex flex-col h-full relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                  >
                    <IconContainer icon="description" className="mb-6" />
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-2xl font-headline font-bold mb-4"
                  >
                    Interactive Notes
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="text-on-surface-variant text-sm leading-relaxed mb-6"
                  >
                    Concise, searchable notes written by industry engineers. Versioned, collaborative, and enriched with syntax highlighting that adapts to your learning pace.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="space-y-4 mb-8"
                  >
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl bg-surface-container-highest/50 border border-outline-variant/10 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium">Memory Management in Rust</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl bg-surface-container-highest/50 border border-outline-variant/10 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                      <span className="text-xs font-medium">Graph Algorithms: BFS vs DFS</span>
                    </motion.div>
                  </motion.div>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-auto w-full py-3 rounded-xl border border-outline-variant/20 hover:bg-surface-container-highest text-sm font-bold transition-colors"
                  >
                    Browse Library
                  </motion.button>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>

          {/* Visual Tools Card */}
          <motion.div
            custom={2}
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-4 md:row-span-2"
          >
            <motion.div variants={hoverVariants} className="h-full">
              <PremiumCard className="rounded-2xl p-8 group h-full">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    >
                      <IconContainer icon="analytics" />
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      Featured
                    </motion.span>
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="text-xl font-headline font-bold mb-3"
                  >
                    Visual Tools
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="text-on-surface-variant text-sm leading-relaxed"
                  >
                    Interactive visualizers for arrays, trees, and graphs with granular step controls and state monitoring.
                  </motion.p>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>

          {/* Performance Mode Card */}
          <motion.div
            custom={3}
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-4 md:row-span-1"
          >
            <motion.div variants={hoverVariants} className="h-full">
              <PremiumCard className="rounded-2xl p-6 group h-full">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container group-hover:bg-primary-container/10 transition-colors"
                  >
                    <MaterialIcon icon="speed" className="text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-headline font-bold">Performance Mode</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5">Track progress with real-time analytics.</p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>

          {/* Sync & Share Card */}
          <motion.div
            custom={4}
            variants={cardVariants}
            whileHover="hover"
            className="md:col-span-4 md:row-span-1"
          >
            <motion.div variants={hoverVariants} className="h-full">
              <PremiumCard className="rounded-2xl p-6 group h-full">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container group-hover:bg-primary-container/10 transition-colors"
                  >
                    <MaterialIcon icon="sync" className="text-xl" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-headline font-bold">Sync &amp; Share</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5">Pin notes and share sessions with peers.</p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-0 w-64 h-64 bg-primary-container/5 blur-[120px] rounded-full"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full"
      />
    </motion.section>
  );
};

export default CoreOfferings;