import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';

const ModeTransition = ({ isAnimating }) => {
  const theme = useTheme();

  const variants = {
    initial: { 
      scale: 0, 
      opacity: 0,
      rotate: 0,
    },
    animate: { 
      scale: 5, 
      opacity: 1,
    },

  };

  return (
    <motion.div
      initial="initial"
      animate={isAnimating ? "animate" : "initial"}
      exit="exit"
      variants={variants}
      transition={{ 
        duration: 1, 
        ease: "easeInOut" 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
        zIndex: 9999,
        width: '100%',
        height: '100%',
        transformOrigin: 'center',
      }}
    />
  );
};

export default ModeTransition;
