import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [user] = useAuthState(auth);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const downloadAsPDF = () => {
    if (!user) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Add a paper texture background
    doc.setFillColor(251, 247, 243);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Configure text settings
    doc.setFont('CourierNew', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);

    // Add some decorative elements
    doc.setDrawColor(139, 69, 19);
    doc.setLineWidth(0.5);
    doc.line(margin, margin, pageWidth - margin, margin);
    doc.line(margin, pageHeight - margin, pageWidth - margin, pageHeight - margin);

    // Split text into lines and add to PDF
    const lines = doc.splitTextToSize(text, pageWidth - (margin * 2));
    doc.text(lines, margin, margin + 10);

    // Save the PDF
    doc.save('novel-text.pdf');
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0a0b1d] to-[#1a1b3d]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Novel Style Text Editor</h1>
          
          {/* Editor Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <h2 className="text-xl text-yellow-400 font-semibold">Write Your Story</h2>
              <textarea
                value={text}
                onChange={handleTextChange}
                className="w-full h-[500px] bg-gray-900 text-white p-4 rounded-lg border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                placeholder="Start typing your story here..."
              />
            </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
  <h2 className="text-xl text-yellow-400 font-semibold animate-fade-in">Preview</h2>
  <div 
    className="w-full min-h-editor bg-vintage-50 p-6 rounded-lg shadow-inner overflow-y-auto
               bg-paper-texture bg-[size:20px_20px] font-novel text-xl leading-7 text-vintage-800"
  >
    {text || 'Your text will appear here in novel style...'}
  </div>
</div>

          {/* Download Button */}
          <div className="mt-6 flex justify-end">
  <button
    onClick={downloadAsPDF}
    disabled={!user || !text}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full font-semibold
      transform transition-all duration-300
      ${user 
        ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-white hover:scale-105 hover:shadow-lg'
        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
      }
    `}
  >
    <Download className="w-5 h-5" />
    {user ? 'Download as PDF' : 'Login to Download'}
  </button>
</div>

          {/* Login Message */}
          {!user && (
            <p className="mt-4 text-center text-gray-400">
              Please login to download your text in PDF format with beautiful novel styling.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TextEditor;