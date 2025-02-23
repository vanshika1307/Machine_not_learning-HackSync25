import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Image, Loader, Sparkles } from 'lucide-react';

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  // This is a placeholder function - replace with actual API call later
  const generateImages = async () => {
    if (!prompt) return;
    
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // Placeholder images - replace with actual API response
      const images = Array(imageCount).fill('/api/placeholder/512/512');
      setGeneratedImages(images);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const aspectRatios = {
    '1:1': { width: 512, height: 512 },
    '16:9': { width: 512, height: 288 },
    '9:16': { width: 288, height: 512 },
    '4:3': { width: 512, height: 384 },
    '3:4': { width: 384, height: 512 }
  };

  return (
    <div className="min-h-screen bg-[#0a0b1d] py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          AI Image <span className="text-yellow-400">Generator</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your imagination into stunning visuals with our advanced AI image generation tool.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 bg-gray-900/50 p-6 rounded-xl border border-gray-800"
        >
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-white mb-2">Your Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full h-32 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Image Count */}
            <div>
              <label className="block text-white mb-2">Number of Images</label>
              <select
                value={imageCount}
                onChange={(e) => setImageCount(Number(e.target.value))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-white mb-2">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {Object.keys(aspectRatios).map(ratio => (
                  <option key={ratio} value={ratio}>{ratio}</option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateImages}
              disabled={loading || !prompt}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 rounded-lg hover:from-blue-800 hover:to-blue-600 transition duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Images</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Generated Images Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {generatedImages.map((imageUrl, index) => (
            <div
              key={index}
              className="relative bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 group"
            >
              <img
                src={imageUrl}
                alt={`Generated ${index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  aspectRatio: aspectRatio.replace(':', '/'),
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleDownload(imageUrl, index)}
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {!loading && generatedImages.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center h-64 bg-gray-900/30 rounded-xl border border-gray-800">
              <Image className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your generated images will appear here
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageGeneratorPage;