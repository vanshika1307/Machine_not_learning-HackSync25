import React, { useState } from "react";
import { FileText, Type, Check, Settings2, Upload, Send, RotateCcw } from "lucide-react";
import { Alert as MuiAlert } from "@mui/material";
import { motion } from "framer-motion";

const analysisTypes = [
  { name: "Grammar", icon: "📝", color: "from-green-500 to-emerald-500" },
  { name: "Tone", icon: "🎭", color: "from-blue-500 to-purple-500" },
  { name: "Style", icon: "✨", color: "from-purple-500 to-pink-500" },
  { name: "Structure", icon: "🏗️", color: "from-orange-500 to-red-500" },
  { name: "Coherence", icon: "🔄", color: "from-cyan-500 to-blue-500" },
  { name: "Engagement", icon: "🎯", color: "from-yellow-500 to-orange-500" }
];

const StoryFeedback = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target.result);
      reader.readAsText(uploadedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim() || selectedAnalysis.length === 0) {
      setShowAlert(true);
      return;
    }
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setFeedback({
        summary: "Story analysis complete! Here's what we found...",
        details: [
          { type: "Grammar", score: 85, suggestions: ["Consider revising punctuation"] },
          { type: "Tone", score: 90, suggestions: ["Consistent tone throughout"] },
          { type: "Style", score: 88, suggestions: ["Good use of descriptive language"] }
        ]
      });
      setIsAnalyzing(false);
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
          <h1 className="text-5xl font-bold text-white">Story Analyzer</h1>
          <p className="text-gray-400 text-lg">Get professional feedback on your writing</p>
        </motion.div>

        {showAlert && (
          <MuiAlert 
            severity="warning" 
            onClose={() => setShowAlert(false)}
            sx={{ mb: 2 }}
          >
            Please select at least one analysis type and provide text to analyze.
          </MuiAlert>
        )}

        {/* Analysis Types Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {analysisTypes.map((type) => (
            <motion.button
              key={type.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAnalysis(prev => 
                prev.includes(type.name) 
                  ? prev.filter(t => t !== type.name)
                  : [...prev, type.name]
              )}
              className={`p-4 rounded-xl bg-gradient-to-r ${type.color} 
                ${selectedAnalysis.includes(type.name) ? 'ring-2 ring-white' : 'opacity-70'}
                transition-all duration-300`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-white font-medium">{type.name}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Text Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#13142d] rounded-xl p-6 shadow-lg space-y-6"
        >
          {/* File Upload */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Upload size={20} />
              <span>Upload Story</span>
            </div>
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              Choose File
            </label>
          </div>

          {/* Text Area */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Type size={20} />
              <span>Or paste your text here</span>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-4 rounded-lg bg-[#1a1b3d] text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Paste or type your story here..."
            />

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setText("");
                  setFile(null);
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={16} />
                Clear
              </button>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all ${
                  isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Analyze Story
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feedback Results */}
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#13142d] rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 text-white mb-6">
              <FileText size={20} />
              <span>Analysis Results</span>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300">{feedback.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feedback.details.map((detail, index) => (
                  <div key={index} className="bg-[#1a1b3d] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">{detail.type}</span>
                      <span className="text-green-400">{detail.score}%</span>
                    </div>
                    <ul className="text-sm text-gray-400">
                      {detail.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StoryFeedback;