import React from 'react';
import { motion } from 'framer-motion';
import { Typography, useTheme, Container, Grid, Link, Box, IconButton } from '@mui/material';
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
        background: `linear-gradient(135deg, #1E3A8A, #1E40AF)`, // Deep blue gradient
        color: '#ffffff',
        padding: '2rem 0',
        borderTop: `4px solid #1E3A8A`, 
        fontFamily: `'Merriweather', serif`, // Elegant novel-like font
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Kahani AI */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontFamily: `'Playfair Display', serif` }}>
                About Kahani AI
              </Typography>
              <Typography variant="body2" style={{ color: '#D1D5DB' }}>
                Every story begins with a spark. Kahani AI helps writers bring their ideas to life, offering AI-powered assistance to refine narratives, generate plots, and enhance creativity. Let AI be your co-author in crafting the next masterpiece.
              </Typography>
            </motion.div>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontFamily: `'Playfair Display', serif` }}>
                Contact Us
              </Typography>
              <Typography variant="body2" style={{ color: '#D1D5DB' }}>
                221B Baker Street, London, Writers' Hub<br />
                Email: <Link href="mailto:support@kahani.ai" style={{ color: '#93C5FD', textDecoration: 'none' }}>support@kahani.ai</Link><br />
                Phone: <Link href="tel:+919876543210" style={{ color: '#93C5FD', textDecoration: 'none' }}>+91 98765 43210</Link>
              </Typography>
            </motion.div>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', fontFamily: `'Playfair Display', serif` }}>
                Connect With Us
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <IconButton href="https://facebook.com/kahaniAI" target="_blank" style={{ color: '#93C5FD' }}>
                  <Facebook fontSize="large" />
                </IconButton>
                <IconButton href="https://twitter.com/kahaniAI" target="_blank" style={{ color: '#93C5FD' }}>
                  <Twitter fontSize="large" />
                </IconButton>
                <IconButton href="https://instagram.com/kahaniAI" target="_blank" style={{ color: '#93C5FD' }}>
                  <Instagram fontSize="large" />
                </IconButton>
                <IconButton href="https://linkedin.com/company/kahaniAI" target="_blank" style={{ color: '#93C5FD' }}>
                  <LinkedIn fontSize="large" />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={5} textAlign="center">
          <Typography variant="body2" style={{ color: '#D1D5DB', fontFamily: `'Merriweather', serif` }}>
            © {new Date().getFullYear()} Kahani AI. Where AI meets storytelling.
          </Typography>
        </Box>
      </Container>
    </motion.footer>
  );
};

export default Footer;
