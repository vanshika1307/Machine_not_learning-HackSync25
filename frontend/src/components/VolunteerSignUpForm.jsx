import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VolunteerConfirmationPage from './VolunteerConfirmationPage';

const VolunteerSignUpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const opportunityId = location.state?.opportunityId;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    bloodGroup: '',
    medicalIssues: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { opportunityId, ...formData });
    // Navigate back to the opportunities page or a confirmation page
    navigate('/confirmation');
  };

  return (
    <Card className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent>
        <Typography variant="h5" className="mb-4 text-center">Volunteer Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Past Medical Issues (if any)"
            name="medicalIssues"
            value={formData.medicalIssues}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VolunteerSignUpForm;