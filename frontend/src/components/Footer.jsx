import React from 'react';
import { motion } from 'framer-motion';
import { Typography, useTheme, Container, Grid, Link, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 20,
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
        borderRadius: '20px 20px 0 0',
        padding: '2rem 0',
        borderTop: `4px solid ${theme.palette.mode === 'dark' ? '#FF9933' : '#138808'}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                About Vworld
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Vworld is dedicated to connecting volunteers with meaningful opportunities across India. We empower communities and drive positive change through service.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary">
                123 MG Road, Bangalore, Karnataka 560001<br />
                Email: info@vworld.org.in<br />
                Phone: +91 80 1234 5678
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div variants={itemVariants}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Connect With Us
              </Typography>
              <Link href="https://facebook.com/vworld" color="inherit" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="https://twitter.com/vworld" color="inherit" sx={{ pl: 1, pr: 1 }} aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="https://instagram.com/vworld" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link href="https://linkedin.com/company/vworld" color="inherit" sx={{ pl: 1 }} aria-label="LinkedIn">
                <LinkedIn />
              </Link>
            </motion.div>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} We World. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </motion.footer>
  );
};

export default Footer;