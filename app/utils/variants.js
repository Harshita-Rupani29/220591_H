export const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0
    },
    show: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { duration: 0.5, delay }
    }
  };
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.2
    }
  }
};
