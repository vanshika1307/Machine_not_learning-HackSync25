import { motion } from "framer-motion";
import { ImageIcon, PenSquare } from "lucide-react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const ToggleButtons = ({ activeSection, setActiveSection }) => (
  <div className="flex gap-4 justify-center">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveSection("images")}
      className={`flex items-center gap-2 bg-[#1e1f3b] text-white px-6 py-3 rounded-lg text-lg border transition-all duration-300 ${
        activeSection === "images" 
          ? "border-yellow-400 bg-[#2a2b4a]" 
          : "border-gray-600 hover:bg-gray-700"
      }`}
    >
      <ImageIcon size={20} />
      Image Generator
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveSection("writing")}
      className={`flex items-center gap-2 bg-[#1e1f3b] text-white px-6 py-3 rounded-lg text-lg border transition-all duration-300 ${
        activeSection === "writing" 
          ? "border-yellow-400 bg-[#2a2b4a]" 
          : "border-gray-600 hover:bg-gray-700"
      }`}
    >
      <PenSquare size={20} />
      Writing Assistant
    </motion.button>
  </div>
);

// ✅ Add prop types validation
ToggleButtons.propTypes = {
  activeSection: PropTypes.string.isRequired, // Ensures activeSection is a string
  setActiveSection: PropTypes.func.isRequired, // Ensures setActiveSection is a function
};

export default ToggleButtons;
