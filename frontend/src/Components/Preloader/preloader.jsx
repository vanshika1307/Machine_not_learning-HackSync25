import React from 'react';
import { motion } from 'framer-motion';
import preloaderGif from '../../assets/preloader.gif';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b1a]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full h-full flex flex-col items-center justify-center"
      >
        <img 
          src={preloaderGif}
          alt="Loading..."
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-black text-2xl mt-4 relative z-10 font-bold"
        >
          YOUR COMPANION WRITER TO UNLOCK YOUR CREATIVE POTENTIAL
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Preloader;