
export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const slideUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const slideDown = (delay: number = 0) => ({
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const scaleIn = (delay: number = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const staggeredChildren = (staggerAmount: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerAmount,
    },
  },
});

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

// Interactive hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.2 },
};
