import React from 'react';
import TestimonialCard from '../components/TestimonialCard';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const avatarImages = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

const testimonialsData = [
  { name: "Matea Alvarez", title: "Consulting Associate", text: "I have a tailored individualized platform process for after and interactive explore meaning that design recommended for learning and learning my learning and interviews.", image: avatarImages[0] },
  { name: "Adheli Priyanka", title: "Software Engineer", text: "Nexus builds from basics with in-depth explanations. Daily homework, live classes, and project contests with rewards kept me motivated throughout my learning journey.", image: avatarImages[1] },
  { name: "Alok", title: "Full Stack Dev", text: "The live classes, HD recordings, and daily practice problems made learning smooth. Real-world projects prepared me for actual development work in the industry.", image: avatarImages[2] },
  { name: "Aryan Verma", title: "Student", text: "Best decision I made. First Principles teaching helped me understand concepts instead of just memorizing solutions like elsewhere.", image: avatarImages[3] },
  { name: "Hana Kim", title: "Frontend Lead", text: "I should be for practice, as codebook have absolute authorized as standard as fast learning technical and ever knows research and economy learning always is.", image: avatarImages[4] },
  { name: "Babita Patel", title: "Data Analyst", text: "Nexus gave me a true from-scratch learning experience. The way they simplify core concepts, combined with daily assignments, kept me consistent every single day.", image: avatarImages[5] },
  { name: "Raju Arya", title: "Backend Developer", text: "The live classes, HD recordings, and daily practice problems made learning smooth. Real-world projects prepared me for actual development work.", image: avatarImages[6] },
  { name: "Gabriel Foster", title: "Senior SE Student", text: "I just allowed meaner algorithms for resources between process community and architecture and interview, oriented sessions into problem basic as essential.", image: avatarImages[7] }
];

// Split testimonials into two rows
const topRowCards = testimonialsData.slice(0, 4);
const bottomRowCards = testimonialsData.slice(4, 8);

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Animation variants for continuous scrolling
  const scrollRightVariants = {
    animate: {
      x: [0, -400, -800, -1200, -1600, -2000],
      transition: {
        x: {
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      }
    }
  };

  const scrollLeftVariants = {
    animate: {
      x: [-2000, -1600, -1200, -800, -400, 0],
      transition: {
        x: {
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      }
    }
  };

  // Duplicate cards for seamless looping
  const duplicateTopRow = [...topRowCards, ...topRowCards, ...topRowCards];
  const duplicateBottomRow = [...bottomRowCards, ...bottomRowCards, ...bottomRowCards];

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-surface/50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-10 relative">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, type: "spring", damping: 12 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-container/10 text-primary-container text-sm font-medium mb-4"
          >
            ⭐ Trusted by 10,000+ developers
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold tracking-tight bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text text-transparent">
            What developers say
          </h2>
          <p className="text-on-surface-variant mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of developers who transformed their careers with CodeLoom
          </p>
        </motion.div>

        {/* Top Row - Moving Right */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            variants={scrollRightVariants}
            animate="animate"
            className="flex gap-6 w-max"
            style={{ display: 'flex' }}
          >
            {duplicateTopRow.map((testimonial, index) => (
              <motion.div
                key={`top-${index}`}
                className="w-[280px] flex-shrink-0"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", damping: 10, stiffness: 200 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  title={testimonial.title}
                  text={testimonial.text}
                  image={testimonial.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Moving Left */}
        <div className="overflow-hidden">
          <motion.div
            variants={scrollLeftVariants}
            animate="animate"
            className="flex gap-6 w-max"
            style={{ display: 'flex' }}
          >
            {duplicateBottomRow.map((testimonial, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="w-[280px] flex-shrink-0"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", damping: 10, stiffness: 200 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  title={testimonial.title}
                  text={testimonial.text}
                  image={testimonial.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;