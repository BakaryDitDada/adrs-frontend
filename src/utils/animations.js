// Professional animation presets for smooth, natural transitions
export const animations = {
  // Smooth slide in/out (for sliders)
  slide: {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] // Professional easing curve
    }
  },
  
  // Fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  
  // Scale in/out
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  },
  
  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  
  // Stagger children
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  // Button hover animations
  button: {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98, y: 0 }
  },
  
  // Card hover animations
  card: {
    hover: { 
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  }
};

// Easing functions for smooth animations
export const easings = {
  easeInOut: [0.42, 0, 0.58, 1],
  easeOut: [0.22, 1, 0.36, 1],
  easeIn: [0.32, 0, 0.67, 0],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};

// Spring physics for bouncy animations
export const springs = {
  default: { type: "spring", stiffness: 300, damping: 30 },
  soft: { type: "spring", stiffness: 200, damping: 25 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  smooth: { type: "spring", stiffness: 150, damping: 20 }
};