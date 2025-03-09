
import { MotionProps } from 'framer-motion';

// Reusable animation variants for Framer Motion
export const fadeInUp: MotionProps['variants'] = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

export const fadeIn: MotionProps['variants'] = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

export const scaleIn: MotionProps['variants'] = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.215, 0.61, 0.355, 1] // cubic-bezier easing
    } 
  },
};

export const slideInRight: MotionProps['variants'] = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: 'easeOut'
    } 
  },
};

export const slideInLeft: MotionProps['variants'] = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: 'easeOut'
    } 
  },
};

export const staggerContainer: MotionProps['variants'] = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    } 
  },
};

export const rotateIn: MotionProps['variants'] = {
  hidden: { opacity: 0, rotate: 5 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

// Page transition variants
export const pageTransition: MotionProps['variants'] = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    transition: { 
      duration: 0.3
    }
  }
};

// Animation presets for 3D models with Three.js
export const modelAnimations = {
  // Gentle floating animation
  float: (time: number) => ({
    position: [0, Math.sin(time / 2) * 0.05, 0],
    rotation: [0, time / 4, 0],
  }),
  
  // Spin with slight bobbing
  spinWithBob: (time: number) => ({
    position: [0, Math.sin(time / 3) * 0.05, 0],
    rotation: [0, time / 3, 0],
  }),
  
  // Subtle breathing effect
  breathe: (time: number) => ({
    scale: [
      1 + Math.sin(time / 2) * 0.02,
      1 + Math.sin(time / 2) * 0.02,
      1 + Math.sin(time / 2) * 0.02,
    ],
  }),
  
  // Orbital rotation
  orbit: (time: number, radius: number = 2) => ({
    position: [
      Math.cos(time / 4) * radius,
      0,
      Math.sin(time / 4) * radius,
    ],
    rotation: [0, -time / 4, 0],
  }),
};
