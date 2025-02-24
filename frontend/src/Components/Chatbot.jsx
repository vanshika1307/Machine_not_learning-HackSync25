import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, Mic, MicOff, Send, X } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// System prompt for structured responses
const SYSTEM_PROMPT = `You are KahaniAI Assistant, a helpful guide for the Kahani.AI website. 
Always structure your responses in a clear, step-by-step format.

Key website features to know about:
1. Story Generation: AI-powered story creation tool
2. Image Generation: Create images from text descriptions
3. Story Enhancement: Grammar and style improvement tools

When answering:
- Keep responses concise and focused
- Use bullet points or numbered steps when explaining processes
- Only provide information related to Kahani.AI website
- If unsure, ask for clarification
- Mention relevant website sections/buttons to click

Format responses like this:
📍 Main Answer: [brief direct answer]
🔍 Details: [step-by-step explanation if needed]
🎯 Quick Action: [relevant button/section to click]`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-speech function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
      return;
    }

    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
      if (transcript) {
        setInput(transcript);
      }
    } else {
      resetTranscript();
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleSend = async () => {
    const messageToSend = input.trim() || transcript.trim();
    if (!messageToSend) return;

    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setInput('');
    resetTranscript();
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [{
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }]
        }]
      });

      const result = await chat.sendMessage([{ text: messageToSend }]);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      speak(text);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-yellow-400 text-black p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-[#13142d] rounded-xl shadow-2xl flex flex-col z-50 border border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-bold">Kahani.AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceInput}
                className="p-2 text-yellow-400 hover:bg-gray-700 rounded-full"
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <input
                type="text"
                value={input || transcript}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={handleSend}
                disabled={(!input.trim() && !transcript.trim()) || isLoading}
                className="p-2 text-yellow-400 hover:bg-gray-700 rounded-full disabled:text-gray-600 disabled:hover:bg-transparent"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;