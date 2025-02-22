import React from "react";
import { motion } from "framer-motion";

const GenerateImages = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0b1d]">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/images/bg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Generate <span className="text-yellow-400">Anime-Inspired</span> Images.
          </h1>
          <p className="text-lg md:text-2xl mt-4 text-gray-300">
            Play with your own imagination using an interface tailored <br />
            towards making generating imagery simple and fast.
          </p>
        </motion.div>
      </div>

      {/* Image Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-8 bg-[#0a0b1d]">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-lg overflow-hidden shadow-lg border border-gray-700 bg-gray-800"
          >
            <img
              src={`/src/assets/images/sample${index + 1}.jpg`}
              alt={`Generated Art ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GenerateImages;
