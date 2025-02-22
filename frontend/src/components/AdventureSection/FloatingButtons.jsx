import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ToggleButtons from "./ToggleButtons";

const FloatingButtons = ({ isScrolled, activeSection, setActiveSection }) => {
  if (!isScrolled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm py-4"
    >
      <ToggleButtons 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
    </motion.div>
  );
};

// ✅ Add prop types validation
FloatingButtons.propTypes = {
  isScrolled: PropTypes.bool.isRequired,   // Must be a boolean
  activeSection: PropTypes.string.isRequired, // Assuming it's a string (change if different)
  setActiveSection: PropTypes.func.isRequired, // Must be a function
};

export default FloatingButtons;
