import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Joyride, { STATUS } from "react-joyride";
import CounterCard from "/src/components/CounterCard.jsx";

const Home = () => {
  const theme = useTheme();
  const [runTour, setRunTour] = useState(true);

  const images = [
    { url: "/src/assets/image1.jpg", text: "Event 1" },
    { url: "/src/assets/image2.jpg", text: "Event 2" },
    { url: "/src/assets/image3.jpg", text: "Event 3" },
  ];

  const testimonials = [
    {
      name: "Suresh Raina",
      text: "This organization has changed my life. The events are well-organized and impactful.",
      image: "/src/assets/testimonial1.jpg",
    },
    {
      name: "Jashmin Tiwari",
      text: "Volunteering here has been a rewarding experience. I've met so many wonderful people.",
      image: "/src/assets/testimonial2.jpg",
    },
    {
      name: "Deep Pandey",
      text: "I've been a part of this community for years, and it just keeps getting better.",
      image: "/src/assets/testimonial3.jpg",
    },
  ];

  const steps = [
    {
      target: ".hero-section",
      content: "Welcome to our website! This is the main hero section.",
      disableBeacon: true,
    },
    {
      target: ".counter-cards",
      content: "Here you can see some key statistics about our organization.",
    },
    {
      target: ".about-section",
      content: "Learn more about our community and mission.",
    },
    {
      target: ".gallery-section",
      content: "Browse through our gallery of events and activities.",
    },
    {
      target: ".testimonials-section",
      content: "Read what our community members have to say about us.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };

  return (
    <div className={`${theme.palette.mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#e3ffeb",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#000",
            textColor: "#004a14",
            width: 300,
            zIndex: 1000,
          },
        }}
        callback={handleJoyrideCallback}
      />

      <div className="hero-section relative min-h-screen flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{
            backgroundImage: `url('/src/assets/bg-image.jpeg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center mb-8 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to We World
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8">
            Discover amazing content and join our community.
          </p>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
        <div className="counter-cards relative z-10 flex flex-wrap justify-center gap-4 mb-8">
          <CounterCard title="Events" count={150} />
          <CounterCard title="Volunteers" count={300} />
          <CounterCard title="Years of Service" count={10} />
        </div>
      </div>

      <div className="about-section container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">About Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Our community is dedicated to making a positive impact in the world.
            We organize events, volunteer activities, and provide support to
            those in need. Join us in our mission to create a better future for
            everyone.
          </p>
        </motion.div>
      </div>

      <div className="gallery-section container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={image.url}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white text-lg font-semibold">{image.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="testimonials-section container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg shadow-lg ${
                theme.palette.mode === "dark"
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;