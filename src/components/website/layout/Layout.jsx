'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
// import { MainContent } from '@/styles/layouts/layout.styles.js';
import { MainContent } from './Layout.styles';
import { useTransform } from 'framer-motion';

export default function Layout({ children }) {
  const containerRef = React.useRef(null);

  // Parallax scroll effects for background only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <Header />
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <MainContent ref={containerRef}>
        {children}
      </MainContent>
      <Footer />
    </>
  );
}