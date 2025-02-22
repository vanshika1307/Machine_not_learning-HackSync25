import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ColorModeProvider from "./utils/ColorModeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VolunteerMap from "./pages/VolunteerMap";
import EventCalendar from "./pages/EventCalendar";
import CommunityDashBoard from "./pages/CommunityDashboard";
import EducationTraining from "./pages/EducationTraining";
import DonationPage from "./pages/DonationPage";
import EventNotifications from "./components/EventNotifications";
import Checkout from "./components/Checkout";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/register";
import Logi from "./pages/login";
import VolunteerProfile from './pages/VolunteerProfile';
import VolunteerSearchPage from './pages/VolunteerSearchPage'
import VolunteerSignUpForm from "./components/VolunteerSignUpForm";
import VolunteerConfirmationPage from "./components/VolunteerConfirmationPage";

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
            <Route path="/map" element={<VolunteerMap />} />
            <Route path="/eventcalendar" element={<EventCalendar />} />
            <Route path="/comdash" element={<CommunityDashBoard />} />
            <Route path="/edu" element={<EducationTraining />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vol" element={<VolunteerSearchPage />} />
            <Route path="/login" element={<Logi />} />              
            <Route path='/Profile' element={<VolunteerProfile />} />
            <Route path='/volsignup' element={<VolunteerSignUpForm />} />
            <Route path='/confirmation' element={<VolunteerConfirmationPage />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    </ColorModeProvider>
  );
};

export default App;
