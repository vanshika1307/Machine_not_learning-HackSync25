import React from 'react';
import { motion } from 'framer-motion';
import { AccountCircle, AccessTime, Event } from '@mui/icons-material'; // Import Material-UI icons
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const variants = {
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: i * 0.5,
      stiffness: 150,
      damping: 30,
    },
  }),
  hidden: {
    opacity: 0,
    x: 100,
  },
};

const Dashboard = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock data for the volunteer
  const volunteerInfo = {
    name: "Vanshika Jain",
    email: "abc@example.com",
    totalHours: 150,
    totalEvents: 20,
    totalCredits: 150,
  };

  return (
    <div className={`flex flex-col items-center gap-y-10 p-5 ${isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-[var(--light-bg-alt)]'}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-lg p-5 w-full max-w-4xl ${isDarkMode ? 'bg-[var(--primary-bg)]' : 'bg-[var(--light-bg)]'}`}
      >
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>Volunteer Profile</h2>
        <div className="flex flex-wrap items-center gap-4">
          <AccountCircle className={`text-6xl ${isDarkMode ? 'text-[var(--hover-bg)]' : 'text-[var(--primary-bg)]'}`} />
          <div>
            <h3 className={`text-xl font-medium ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>{volunteerInfo.name}</h3>
            <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'}`}>{volunteerInfo.email}</p>
          </div>
        </div>
     
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`rounded-lg p-5 w-full max-w-4xl ${isDarkMode ? 'bg-[var(--primary-bg)]' : 'bg-[var(--light-bg)]'}`}
      >
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>Volunteer Summary</h2>
        <div className="flex flex-wrap justify-around gap-4">
          <motion.div
            variants={variants}
            custom={0}
            initial="hidden"
            animate="visible"
            className={`rounded-lg p-4 text-center ${isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-[var(--light-bg)]'}`}
          >
            <AccessTime className={`text-3xl ${isDarkMode ? 'text-[var(--hover-bg)]' : 'text-[var(--primary-bg)]'} mx-auto mb-2`} />
            <div className={`text-xl font-semibold ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>{volunteerInfo.totalHours}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Hours</div>
          </motion.div>
          <motion.div
            variants={variants}
            custom={1}
            initial="hidden"
            animate="visible"
            className={`rounded-lg p-4 text-center ${isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-[var(--light-bg)]'}`}
          >
            <Event className={`text-3xl ${isDarkMode ? 'text-[var(--hover-bg)]' : 'text-[var(--primary-bg)]'} mx-auto mb-2`} />
            <div className={`text-xl font-semibold ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>{volunteerInfo.totalEvents}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Events Attended</div>
          </motion.div>
          <motion.div
            variants={variants}
            custom={2}
            initial="hidden"
            animate="visible"
            className={`rounded-lg p-4 text-center ${isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-[var(--light-bg)]'}`}
          >
            <AccountCircle className={`text-3xl ${isDarkMode ? 'text-[var(--hover-bg)]' : 'text-[var(--primary-bg)]'} mx-auto mb-2`} />
            <div className={`text-xl font-semibold ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>{volunteerInfo.totalCredits}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Credits</div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`rounded-lg p-5 w-full max-w-4xl ${isDarkMode ? 'bg-[var(--primary-bg)]' : 'bg-[var(--light-bg)]'}`}
      >
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-[var(--text-white)]' : 'text-[var(--dark-bg)]'}`}>Volunteer Credits</h2>
        <div style={{ height: '300px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{ height: '100%' }}
            >
              <Gauge
                value={65}
                startAngle={-110}
                endAngle={110}
                height={300}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 45,
                    transform: 'translate(0px, 0px)',
                    color: isDarkMode ? 'var(--text-white)' : 'var(--dark-bg)',
                  },
                  [`& .${gaugeClasses.arc}`]: {
                    stroke: `url(#gradient)`,
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--gradient-start)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--gradient-end)', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;