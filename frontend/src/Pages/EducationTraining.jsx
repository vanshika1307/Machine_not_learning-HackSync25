import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Paper, Container, Button, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { PlayCircleOutline, EmojiEvents, People, Favorite } from '@mui/icons-material';
import ParkIcon from '@mui/icons-material/Park';
import { Link } from 'react-router-dom';

const videoList = [
  { title: 'Community Beach Cleanup', videoUrl: 'https://www.youtube.com/embed/Pg3YICJvfFE', description: 'Join our volunteers as they clean up local beaches and protect marine life.' },
  { title: 'Volunteer Training Workshop', videoUrl: 'https://www.youtube.com/embed/2szQhR4oZtA?si=wVQtm8VKXUogHimW', description: 'Learn about our comprehensive training program for new volunteers.' },
  { title: 'Tree Planting Initiative', videoUrl: 'https://www.youtube.com/embed/jXcoPO76UyA', description: 'Watch our team plant trees to combat deforestation and climate change.' },
  { title: 'Food Drive Success Story', videoUrl: 'https://www.youtube.com/embed/toc3iKI6CA4?list=PLgUKbeXMb5dpRJBCMQj9SGRHntN8_ufNg', description: 'See the impact of our recent food drive on local communities in need.' },
];

const achievements = [
  { title: 'Trees Planted', count: 10000, icon: <ParkIcon />, color: '#4CAF50' },
  { title: 'Meals Served', count: 50000, icon: <EmojiEvents />, color: '#FFC107' },
  { title: 'Volunteers Trained', count: 5000, icon: <People />, color: '#2196F3' },
];

const EducationTraining = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: `
          linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth="lg" component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <Box sx={{ padding: isMobile ? '2rem 0' : '4rem 0' }}>
          <Typography variant="h2" component={motion.div} variants={itemVariants} gutterBottom align="center" sx={{ mb: 6, fontSize: isMobile ? '2.5rem' : '3.75rem', color: '#333', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Community Impact
          </Typography>
          
          <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 4 }} component={motion.div} variants={itemVariants}>Our Achievements</Typography>
          <Grid container spacing={4} sx={{ marginBottom: '4rem' }}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper elevation={6} sx={{ 
                    padding: '2rem', 
                    textAlign: 'center', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    borderRadius: '16px',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                    },
                    background: `linear-gradient(145deg, ${achievement.color}, ${achievement.color}dd)`
                  }}>
                    <Box sx={{ fontSize: '3rem', color: 'white', mb: 2 }}>{achievement.icon}</Box>
                    <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>{achievement.title}</Typography>
                    <Typography variant="h3" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>{achievement.count.toLocaleString()}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" gutterBottom component={motion.div} variants={itemVariants}>Community Service Videos</Typography>
          <Grid container spacing={4}>
            {videoList.map((video, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <CardMedia
                      component="iframe"
                      height="315"
                      src={video.videoUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sx={{ 
                        border: 'none', 
                        borderRadius: '16px 16px 0 0',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>{video.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{video.description}</Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      
                      <Button 
                        variant="contained" 
                        startIcon={<PlayCircleOutline />} 
                        fullWidth
                        sx={{
                          borderRadius: '30px',
                          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                          color: 'white',
                          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                          transition: 'all 0.3s',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FE8B8B 30%, #FF9E53 90%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 10px 2px rgba(255, 105, 135, .3)',
                          }
                        }}
                      >
                        Watch Now
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8, textAlign: 'center' }} component={motion.div} variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ color: '#333' }}>Join Our Cause</Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Be part of our mission to create positive change in our community. Every volunteer, every donation, and every action counts.
            </Typography>
            <Link to='/volsignup'>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<Favorite />}
              sx={{
                mr: 2,
                mb: isMobile ? 2 : 0,
                borderRadius: '30px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2196F3 50%, #21CBF3 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                }
              }}
            >
              Volunteer Now
            </Button>
            </Link>
            <Link to='/donate'>
            <Button 
              variant="outlined" 
              size="large" 
              sx={{
                borderRadius: '30px',
                borderColor: '#2196F3',
                color: '#2196F3',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  borderColor: '#21CBF3',
                  color: '#21CBF3',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Donate
            </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EducationTraining;