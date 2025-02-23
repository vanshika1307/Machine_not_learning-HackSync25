import React from 'react';
import { motion } from 'framer-motion';
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
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="text-white text-2xl mb-12"
        >
          Features
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-[#13142d] rounded-xl p-6"
          >
            <h4 className="text-white text-xl mb-2">Purpose-built Creative Editor</h4>
            <p className="text-blue-300 mb-4">
              Centered around creativity, NovelAI's Image Generation UI keeps you focused on the thing that matters most, your images.
            </p>
            <div className="bg-[#0d0e24] rounded-lg overflow-hidden">
              <img 
                src="/src/assets/images/sample2.jpg" 
                alt="Creative Editor" 
                className="w-full h-48 object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#13142d] rounded-xl p-6"
          >
            <h4 className="text-white text-xl mb-2">Reliable Image Adjustment</h4>
            <p className="text-blue-300 mb-4">
              Use Img2Img to change details while following the original composition, or Enhance it to increase the level of detail in the image.
            </p>
            <div className="bg-[#0d0e24] rounded-lg overflow-hidden">
              <img 
                src="/src/assets/images/sample9.webp" 
                alt="Image Adjustment" 
                className="w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Prompt Section Component
const PromptSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
          <h2 className="text-4xl md:text-5xl text-white font-serif">
            Create predictable results with high variety, effortlessly.
          </h2>
          <p className="text-gray-400">
            Don't settle for randomness, outline all the best parts of your character using natural language, or a comprehensive set of visual tags.
          </p>

          <div className="flex justify-center gap-4 mt-12">
            {[3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#13142d] rounded-lg overflow-hidden w-48 h-64"
              >
                <img 
                  src={`/src/assets/images/sample${i}.jpg`}
                  alt={`Result ${i}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
    triggerOnce: true,
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

  return (
    <>
      <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0b1a] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-[3/4] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, zIndex: 1 }}
              >
                <img 
                  src={img}
                  alt={`Anime artwork ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-5xl md:text-6xl text-white font-serif">
              Generate anime-inspired characters.
            </h2>
            <p className="text-4xl text-white/90 font-serif">
              No restrictions.
            </p>
          </motion.div>
        </div>
      </div>
      <FeaturesSection />
      <PromptSection />
    </>
    
  );
};

export default ImageGrid;