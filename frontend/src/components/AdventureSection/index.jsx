import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ToggleButtons from "./ToggleButtons";
import FloatingButtons from "./FloatingButtons";
import ImageGeneratorContent from "./ImageGeneratorContent";
import WritingAssistantContent from "./WritingAssistantContent";

const AdventureSection = () => {
  const [activeSection, setActiveSection] = useState("images");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <FloatingButtons 
        isScrolled={isScrolled}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="relative text-center py-16 bg-[#0a0b1d] border-t border-gray-700">
        <div className="border-t border-gray-700 w-16 mx-auto mb-6"></div>
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Choose your adventure.
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          Learn how Kahani AI can enhance your creative potential.
        </p>

        <div className="mt-6">
          <ToggleButtons 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>

        <div className="mt-12 max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeSection === "images" ? (
              <ImageGeneratorContent key="images" />
            ) : (
              <WritingAssistantContent key="writing" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default AdventureSection;