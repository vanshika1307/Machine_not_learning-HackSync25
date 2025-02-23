import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ColorModeProvider from "./utils/ColorModeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import Register from "./pages/register";
import Blog from "./pages/Blog";
import Logi from "./pages/login";
import ImageGrid from "./components/AdventureSection/ImageGeneratorContent";
import { auth } from './firebase/config';
import StoryGenerator from "./Pages/StoryGenerator";
import StoryFeedback from "./Pages/Feedback";

console.log('App component rendering');

const App = () => {
  return (
    <ColorModeProvider>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route 
              path="/image-generator" 
              element={
                <ProtectedRoute>
                  <ImageGeneratorPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Logi />} />              
            <Route path="/generate-images" element={<ImageGeneratorPage />} />
            <Route path="/story-generator" element={<StoryGenerator />} />
            <Route path="/feedback" element={<StoryFeedback />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </ColorModeProvider>
  );
};

export default App;