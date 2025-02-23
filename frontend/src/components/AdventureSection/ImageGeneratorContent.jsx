import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';



const FeaturesSection = () => {
  return (
    <div className="py-20 bg-[#0a0b1a]">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-white text-2xl mb-8">Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#13142d] rounded-xl p-6">
            <h4 className="text-white text-xl mb-2">Purpose-built Creative Editor</h4>
            <p className="text-blue-300 mb-4">
              Centered around creativity, NovelAI's Image Generation UI keeps you focused on the thing that matters most, your images.
            </p>
            <img 
              src="https://placehold.co/600x400/13142d/blue" 
              alt="Creative Editor" 
              className="w-full rounded-lg"
            />
          </div>

          {/* Feature 2 */}
          <div className="bg-[#13142d] rounded-xl p-6">
            <h4 className="text-white text-xl mb-2">Reliable Image Adjustment</h4>
            <p className="text-blue-300 mb-4">
              Use Img2Img to change details while following the original composition, or Enhance it to increase the level of detail in the image.
            </p>
            <div className="flex gap-2">
              <img 
                src="https://placehold.co/200x300/13142d/blue" 
                alt="Original" 
                className="w-1/3 rounded-lg"
              />
              <img 
                src="https://placehold.co/200x300/13142d/gray" 
                alt="Processing" 
                className="w-1/3 rounded-lg"
              />
              <img 
                src="https://placehold.co/200x300/13142d/blue" 
                alt="Result" 
                className="w-1/3 rounded-lg"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#13142d] rounded-xl p-6">
            <h4 className="text-white text-xl mb-2">Random Prompt</h4>
            <p className="text-blue-300 mb-4">
              Out of ideas? Click the dice button and get brand new inspiration without any work on your end required.
            </p>
            <div className="bg-[#0d0e24] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-gray-700 p-2 rounded">🎲</span>
                <span className="text-sm">light, misty background, country shot, vintage aesthetic</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#13142d] rounded-xl p-6">
            <h4 className="text-white text-xl mb-2">Advanced AI Settings</h4>
            <p className="text-blue-300 mb-4">
              When the defaults don't quite tickle your fancy, fiddle and experiment with a variety of samplers and options.
            </p>
            <div className="bg-[#0d0e24] p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-gray-300 text-sm">
                <div>Steps: 23</div>
                <div>Guidance: 5</div>
                <div>Sampler: Euler Ancestral</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromptSection = () => {
  return (
    <div className="py-20 bg-[#0a0b1a] text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-white font-serif mb-4">
          Create predictable results with high variety, effortlessly.
        </h2>
        <p className="text-gray-400 mb-12">
          Don't settle for randomness, outline all the best parts of your character using natural language, or a comprehensive set of visual tags.
        </p>

        <div className="relative mb-12">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white">
            ◀
          </button>
          <div className="bg-[#13142d] inline-block rounded-full px-6 py-3">
            <div className="flex gap-3 text-sm">
              <span className="text-blue-300">1girl</span>
              <span className="text-blue-300">fisheye</span>
              <span className="text-blue-300">closeup</span>
              <span className="text-blue-300">from above</span>
              <span className="text-blue-300">head tilt</span>
              <span className="text-blue-300">short hair</span>
            </div>
          </div>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white">
            ▶
          </button>
        </div>

        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-48 h-64 bg-[#13142d] rounded-lg overflow-hidden">
              <img 
                src={`https://placehold.co/200x300/13142d/blue`}
                alt={`Result ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageGrid = () => {
  const images = [
    'https://placehold.co/400x300/13142d/blue',
    'https://placehold.co/400x300/13142d/blue',
    'https://placehold.co/400x300/13142d/blue',
    'https://placehold.co/400x300/13142d/blue',
    'https://placehold.co/400x300/13142d/blue',
    'https://placehold.co/400x300/13142d/blue'
  ];

  return (
    <>
      <div className="min-h-screen bg-[#0a0b1a] relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0b1a] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img 
                  src={img}
                  alt={`Anime artwork ${index + 1}`}
                  className="w-full h-[200px] object-cover rounded-lg shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl text-white font-serif">
              Generate anime-inspired characters.
            </h2>
            <p className="text-4xl md:text-5xl text-white font-serif">
              No restrictions.
            </p>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <PromptSection />
    </>
  );
};

export default ImageGrid;