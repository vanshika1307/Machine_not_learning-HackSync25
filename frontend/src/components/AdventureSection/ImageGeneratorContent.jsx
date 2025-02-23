import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Features Section Component
const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="py-20 bg-[#0a0b1a]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3 
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          className="text-white text-3xl mb-12 font-bold"
          whileHover={{ scale: 1.05, color: "#FFD700" }}
        >
          Features
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-[#13142d] rounded-xl p-6 hover:bg-[#1a1b3d] transition-all duration-300 transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 0 30px rgba(255,215,0,0.2)",
            }}
          >
            <h4 className="text-white text-2xl mb-2 font-bold">Purpose-built Creative Editor</h4>
            <p className="text-blue-300 mb-4">
              Centered around creativity, NovelAI's Image Generation UI keeps you focused on the thing that matters most, your images.
            </p>
            <motion.div 
              className="bg-[#0d0e24] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/src/assets/images/sample2.jpg" 
                alt="Creative Editor" 
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#13142d] rounded-xl p-6 hover:bg-[#1a1b3d] transition-all duration-300 transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 0 30px rgba(255,215,0,0.2)",
            }}
          >
            <h4 className="text-white text-2xl mb-2 font-bold">Reliable Image Adjustment</h4>
            <p className="text-blue-300 mb-4">
              Use Img2Img to change details while following the original composition, or Enhance it to increase the level of detail in the image.
            </p>
            <motion.div 
              className="bg-[#0d0e24] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/src/assets/images/sample9.webp" 
                alt="Image Adjustment" 
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Prompt Section Component with Click-to-Flip Cards
const PromptSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [flippedCards, setFlippedCards] = useState(new Array(4).fill(false));

  const creators = [
    { name: "Creator : Vanshika", image: "/src/assets/images/sample1.jpg" },
    { name: "Creator : Salif", image: "/src/assets/images/sample3.jpg" },
    { name: "Creator : Souma", image: "/src/assets/images/sample4.jpg" },
    { name: "Creator : Sannit", image: "/src/assets/images/sample6.jpg" }
  ];

  const handleCardClick = (index) => {
    setFlippedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="py-20 bg-[#0a0b1a]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h2 
            className="text-4xl md:text-5xl text-white font-serif"
            whileHover={{ scale: 1.05, color: "#FFD700" }}
          >
            Create predictable results with high variety, effortlessly.
          </motion.h2>
          <p className="text-gray-400 text-xl">
            Don't settle for randomness, outline all the best parts of your character using natural language, or a comprehensive set of visual tags.
          </p>

          <div className="flex justify-center gap-4 mt-12">
            {creators.map((creator, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative w-48 h-64 cursor-pointer [perspective:1000px]"
                onClick={() => handleCardClick(i)}
              >
                <motion.div 
                  className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-700"
                  animate={{ rotateY: flippedCards[i] ? 180 : 0 }}
                >
                  {/* Front of card (Image) */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden">
                    <img 
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Back of card (Name) */}
                  <div 
                    className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <h3 className="text-white text-2xl font-bold mb-2">{creator.name}</h3>
                      <p className="text-white/80 text-sm">Click to flip back</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Image Grid Component
const ImageGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const images = [
    '/src/assets/images/sample1.jpg',
    '/src/assets/images/sample2.jpg',
    '/src/assets/images/sample3.jpg',
    '/src/assets/images/sample4.jpg',
    '/src/assets/images/sample5.jpg',
    '/src/assets/images/sample6.jpg'
  ];

  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ rotate: 360 });
    }
  }, [inView, controls]);

  return (
    <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0b1a] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="relative h-[600px] flex items-center justify-center mb-16">
          {/* Center piece */}
          <motion.div
            className="absolute w-40 h-40 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full z-10 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 360],
              boxShadow: [
                "0 0 20px rgba(255, 204, 0, 0.5)",
                "0 0 40px rgba(255, 204, 0, 0.7)",
                "0 0 20px rgba(255, 204, 0, 0.5)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <motion.span 
              className="text-black text-2xl font-bold"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 8px rgba(255,255,255,0.5)",
                  "0 0 16px rgba(255,255,255,0.8)",
                  "0 0 8px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CREATION
            </motion.span>
          </motion.div>

          {/* Rotating images */}
          {images.map((img, index) => {
            const angle = (index * (360 / images.length) + rotation) * (Math.PI / 180);
            const radius = 250;
            
            return (
              <motion.div
                key={index}
                className="absolute w-40 h-40 rounded-full overflow-hidden"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 80px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 80px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 15, // Increased speed
                  repeat: Infinity,
                  delay: index * 0.2 
                }}
                whileHover={{ 
                  scale: 1.3,
                  zIndex: 20,
                  transition: { duration: 0.3 }
                }}
              >
                <img 
                  src={img}
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <p className="text-white text-sm font-bold">View Art</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl text-white font-serif cursor-pointer"
            whileHover={{ 
              scale: 1.1, 
              color: "#FFD700",
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(255,215,0,0.5)"
            }}
            transition={{ duration: 0.3 }}
          >
            Generate anime-inspired characters.
          </motion.h2>
          <motion.p 
            className="text-4xl text-white/90 font-serif cursor-pointer"
            whileHover={{ 
              scale: 1.1, 
              color: "#FFD700",
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(255,215,0,0.5)"
            }}
            transition={{ duration: 0.3 }}
          >
            No restrictions.
          </motion.p>
        </motion.div>
      </div>
      <FeaturesSection />
      <PromptSection />
    </div>
  );
};

export default ImageGrid;