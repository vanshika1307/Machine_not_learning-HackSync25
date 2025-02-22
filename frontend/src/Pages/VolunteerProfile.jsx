import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, CardActions, Typography, Chip, 
  Grid, Button, TextField, Box, useTheme
} from '@mui/material';
import { 
  Email, EmojiEvents, AccessTime, 
  CalendarToday, LocationOn, Favorite, Star
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

// Mock data for volunteers
const volunteers = [
  { 
    id: 1, 
    name: 'Vanshika Jain', 
    email: 'abc@example.com', 
    credits: 150,
    hours: 75,
    events: 12,
    location: 'India',
    interests: ['Education', 'Environment'],
    badge: 'Silver'
  },
  { 
    id: 2, 
    name: 'Garv Jain', 
    email: 'xyz.@example.com', 
    credits: 80,
    hours: 40,
    events: 8,
    location: 'Borivali',
    interests: ['Healthcare', 'Animal Welfare'],
    badge: 'Bronze'
  },
  { 
    id: 3, 
    name: 'Swar Mhatre', 
    email: 'apo.@example.com', 
    credits: 220,
    hours: 110,
    events: 18,
    location: 'Mira Road',
    interests: ['Poverty Alleviation', 'Education'],
    badge: 'Gold'
  },
  { 
    id: 4, 
    name: 'Sannit Arekar ', 
    email: 'sannu.@example.com', 
    credits: 175,
    hours: 87,
    events: 14,
    location: 'Andheri',
    interests: ['Youth Development', 'Sports'],
    badge: 'Silver'
  },
 
];

const badgeColors = {
  Bronze: '#CD7F32',
  Silver: '#C0C0C0',
  Gold: '#FFD700',
  Platinum: '#E5E4E2'
};

const VolunteerProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedBadge || volunteer.badge === selectedBadge)
  );

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: '100vh', 
      py: 4 
    }}>
      <Typography variant="h3" align="center" gutterBottom>
        Volunteer Profiles
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          label="Search Volunteers"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300, mr: 2 }}
        />
        <Button
          variant={selectedBadge === null ? "contained" : "outlined"}
          onClick={() => setSelectedBadge(null)}
          sx={{ mr: 1 }}
        >
          All
        </Button>
        {Object.keys(badgeColors).map((badge) => (
          <Button
            key={badge}
            variant={selectedBadge === badge ? "contained" : "outlined"}
            onClick={() => setSelectedBadge(badge)}
            sx={{ 
              mr: 1,
              bgcolor: selectedBadge === badge ? badgeColors[badge] : 'transparent',
              color: selectedBadge === badge ? 'white' : badgeColors[badge],
              '&:hover': {
                bgcolor: badgeColors[badge],
                color: 'white',
              }
            }}
          >
            {badge}
          </Button>
        ))}
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {filteredVolunteers.map((volunteer) => (
          <Grid item key={volunteer.id} xs={12} sm={6} md={4} lg={3}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <CardContent sx={{ pt: 5 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {volunteer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 1, fontSize: 18 }} />
                    {volunteer.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <EmojiEvents sx={{ mr: 1, fontSize: 18, color: theme.palette.warning.main }} />
                    Credits: {volunteer.credits}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 1, fontSize: 18, color: theme.palette.info.main }} />
                    Hours: {volunteer.hours}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, fontSize: 18, color: theme.palette.success.main }} />
                    Events: {volunteer.events}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, fontSize: 18, color: theme.palette.error.main }} />
                    {volunteer.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Favorite sx={{ mr: 1, fontSize: 18, color: theme.palette.secondary.main }} />
                    Interests:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {volunteer.interests.map((interest, index) => (
                      <Chip key={index} label={interest} size="small" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ mt: 'auto', justifyContent: 'center' }}>
                  <Button 
                    size="small" 
                    startIcon={<Star />} 
                    onClick={() => navigate('/dashboard')} // Navigate to Dashboard page
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VolunteerProfile;