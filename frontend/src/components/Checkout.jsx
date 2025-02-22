import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Stepper, Step, StepLabel, Divider, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CreditCard, AccountBalance, Payment, Security, InfoOutlined } from '@mui/icons-material';

const Checkout = () => {
  const location = useLocation();
  const cause = location.state?.cause || { title: 'Selected Cause', description: 'Help us make a difference!', image: '/api/placeholder/100/100' };
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Donation Details', 'Payment Method', 'Confirmation'];

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <Box sx={{ 
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Paper elevation={3} sx={{ 
          padding: '2rem', 
          maxWidth: 600, 
          margin: '0 auto',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            Support Our Cause
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar src={cause.image} sx={{ width: 60, height: 60, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#333' }}>
                      {cause.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cause.description}
                    </Typography>
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  label="Donation Amount"
                  variant="outlined"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip label="$10" onClick={() => setAmount('10')} />
                  <Chip label="$25" onClick={() => setAmount('25')} />
                  <Chip label="$50" onClick={() => setAmount('50')} />
                  <Chip label="$100" onClick={() => setAmount('100')} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <InfoOutlined sx={{ mr: 1, fontSize: 16 }} />
                  Your donation will help us continue our important work.
                </Typography>
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel value="card" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><CreditCard sx={{ mr: 1 }} /> Credit/Debit Card</Box>} />
                    <FormControlLabel value="upi" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Payment sx={{ mr: 1 }} /> UPI</Box>} />
                    <FormControlLabel value="netbanking" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><AccountBalance sx={{ mr: 1 }} /> Net Banking</Box>} />
                  </RadioGroup>
                </FormControl>
                {paymentMethod === 'card' && (
                  <Box>
                    <TextField fullWidth label="Card Number" variant="outlined" sx={{ mb: 2 }} required />
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField label="Expiry Date" variant="outlined" required />
                      <TextField label="CVV" variant="outlined" type="password" required />
                    </Box>
                  </Box>
                )}
                {paymentMethod === 'upi' && (
                  <TextField fullWidth label="UPI ID" variant="outlined" sx={{ mb: 2 }} required />
                )}
                {paymentMethod === 'netbanking' && (
                  <TextField fullWidth label="Bank Name" variant="outlined" sx={{ mb: 2 }} required />
                )}
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Thank You for Your Support!</Typography>
                <Typography variant="body1" paragraph>
                  Your donation of ${amount} to {cause.title} has been processed successfully.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  A confirmation email has been sent to your registered email address.
                </Typography>
                <Security sx={{ fontSize: 48, color: 'green', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Your transaction is secure and your personal information is protected.
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {activeStep > 0 && activeStep < 2 && (
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button onClick={handleBack} variant="outlined">
                    Back
                  </Button>
                </motion.div>
              )}
              {activeStep < 2 && (
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button type="submit" variant="contained" color="primary">
                    {activeStep === 1 ? 'Donate' : 'Next'}
                  </Button>
                </motion.div>
              )}
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Checkout;