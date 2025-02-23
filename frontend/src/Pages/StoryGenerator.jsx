import React, { useState } from "react";
import { Book, Type, History, Settings2, Sparkles, Send, RotateCcw } from "lucide-react";
import { Alert as MuiAlert } from "@mui/material";
import { motion } from "framer-motion";

const genres = [
  { name: "Fantasy", icon: "🏰", color: "from-blue-500 to-purple-500" },
  { name: "Sci-Fi", icon: "🚀", color: "from-cyan-500 to-blue-500" },
  { name: "Mystery", icon: "🔍", color: "from-purple-500 to-pink-500" },
  { name: "Romance", icon: "💝", color: "from-pink-500 to-rose-500" },
  { name: "Horror", icon: "👻", color: "from-gray-700 to-gray-900" },
  { name: "Adventure", icon: "🗺️", color: "from-green-500 to-emerald-500" }
];

const StoryGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wordCount, setWordCount] = useState(500);

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedGenre) {
      setShowAlert(true);
      return;
    }
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedStory("Your generated story will appear here...");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0b1a] pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-white">Story Forge</h1>
          <p className="text-gray-400 text-lg">Transform your ideas into captivating stories</p>
        </motion.div>

        {showAlert && (
          <MuiAlert 
            severity="warning" 
            onClose={() => setShowAlert(false)}
            sx={{ mb: 2 }}
          >
            Please select a genre and enter a prompt before generating.
          </MuiAlert>
        )}

        {/* Genre Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {genres.map((genre) => (
            <motion.button
              key={genre.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGenre(genre.name)}
              className={`p-4 rounded-xl bg-gradient-to-r ${genre.color} 
                ${selectedGenre === genre.name ? 'ring-2 ring-white' : 'opacity-70'}
                transition-all duration-300`}
            >
              <div className="text-2xl mb-2">{genre.icon}</div>
              <div className="text-white font-medium">{genre.name}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Story Configuration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#13142d] rounded-xl p-6 shadow-lg space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Settings2 size={20} />
              <span>Story Settings</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-gray-400">Word Count:</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                className="w-32"
              />
              <span className="text-white">{wordCount}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Type size={20} />
              <span>Enter your prompt</span>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-4 rounded-lg bg-[#1a1b3d] text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe your story idea in detail..."
            />

            <div className="flex justify-between items-center">
              <button
                onClick={() => setPrompt("")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={16} />
                Clear
              </button>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all ${
                  isGenerating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Story
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Generated Story */}
        {generatedStory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#13142d] rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white">
                <Book size={20} />
                <span>Generated Story</span>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <History size={20} />
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">{generatedStory}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;