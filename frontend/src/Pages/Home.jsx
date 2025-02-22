import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
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
            Bring your imagination to{" "}
            <span className="text-yellow-400">life, without limits.</span>
          </h1>
          <p className="text-lg md:text-2xl mt-4 text-gray-300">
            Between a helpful co-writer and an easy-to-use image generator,
            <br /> NovelAI offers the tools to unlock your creative potential.
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

      {/* "Choose Your Adventure" Section */}
      <div className="relative text-center py-16 bg-[#0a0b1d] border-t border-gray-700">
        <div className="border-t border-gray-700 w-16 mx-auto mb-6"></div>
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Choose your adventure.
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          Learn how Kahani AI can enhance your creative potential.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/generate-images" className="bg-[#1e1f3b] text-white px-6 py-3 rounded-lg text-lg border border-gray-600 hover:bg-gray-700 transition">
            🖼️ Image Generator
          </Link>
          <Link to="/writing-assistant" className="bg-[#1e1f3b] text-white px-6 py-3 rounded-lg text-lg border border-gray-600 hover:bg-gray-700 transition">
            ✍️ Writing Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
