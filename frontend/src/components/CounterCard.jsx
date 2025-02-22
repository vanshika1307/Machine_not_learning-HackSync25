import React from "react";
import { motion } from "framer-motion";

const CounterCard = ({ title, count }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 m-4 text-center shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-4xl font-bold text-white">{count}</p>
    </motion.div>
  );
};

export default CounterCard;
