import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/images/bg.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-white text-5xl md:text-7xl font-extrabold">
          Bring your imagination to{" "}
          <span className="text-yellow-400">life, without limits.</span>
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4">
          Between a helpful co-writer and an easy-to-use image generator,
          <br /> Kahani.AI offers the tools to unlock your creative potential.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/generate-images"
            className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition transform duration-300"
          >
            Generate Images
          </Link>
          <Link
            to="/create-stories"
            className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition transform duration-300"
          >
            Create Stories
          </Link>
        </div>
      </motion.div>
 </div>
  );
};

export default Home;
