
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

type ScrollAnimationProps = {
  threshold?: number;
  triggerOnce?: boolean;
  animationClass?: string;
};

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  animationClass = 'visible',
}: ScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return {
    ref,
    inView,
    controls,
    variants: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    className: inView ? animationClass : '',
  };
};

// This hook applies CSS classes for simpler animations
export const useScrollClassAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  animationClass = 'visible',
}: ScrollAnimationProps = {}) => {
  const [ref, inView] = useInView({ threshold, triggerOnce });

  return {
    ref,
    className: inView ? animationClass : '',
  };
};
