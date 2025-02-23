import React from 'react';
import { motion } from 'framer-motion';
import { Typography, useTheme, Container, Grid, Link, Box, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15, duration: 0.8, delay: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.5 } }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      style={{
        background: `linear-gradient(135deg, #0f172a, #1e293b)`, // Deep navy gradient
        color: '#ffffff',
        padding: '3rem 0',
        borderTop: `4px solid #1E40AF`,
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: '600', fontFamily: `'Merriweather', serif`, color: '#93C5FD' }}>
                About Kahani AI
              </Typography>
              <Typography variant="body2" style={{ color: '#E5E7EB', lineHeight: 1.8 }}>
                Every story begins with a spark. Kahani AI helps writers bring their ideas to life, offering AI-powered assistance to refine narratives, generate plots, and enhance creativity.
              </Typography>
            </motion.div>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: '600', fontFamily: `'Merriweather', serif`, color: '#93C5FD' }}>
                Contact Us
              </Typography>
              <Typography variant="body2" style={{ color: '#E5E7EB', lineHeight: 1.8 }}>
                221B Baker Street, London, Writers' Hub<br />
                Email: <Link href="mailto:support@kahani.ai" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: '500' }}>support@kahani.ai</Link><br />
                Phone: <Link href="tel:+919876543210" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: '500' }}>+91 98765 43210</Link>
              </Typography>
            </motion.div>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: '600', fontFamily: `'Merriweather', serif`, color: '#93C5FD' }}>
                Connect With Us
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                {[
                  { icon: <Facebook fontSize="large" />, link: "https://facebook.com/kahaniAI" },
                  { icon: <Twitter fontSize="large" />, link: "https://twitter.com/kahaniAI" },
                  { icon: <Instagram fontSize="large" />, link: "https://instagram.com/kahaniAI" },
                  { icon: <LinkedIn fontSize="large" />, link: "https://linkedin.com/company/kahaniAI" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.link}
                    target="_blank"
                    style={{
                      color: '#60A5FA',
                      transition: '0.3s ease-in-out',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#60A5FA'}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider style={{ background: '#374151', margin: '2rem 0' }} />

        {/* Copyright */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" style={{ color: '#9CA3AF', fontFamily: `'Merriweather', serif`, fontSize: '14px' }}>
            © {new Date().getFullYear()} Kahani AI. Where AI meets storytelling.
          </Typography>
        </Box>
      </Container>
    </motion.footer>
  );
};

export default Footer;
