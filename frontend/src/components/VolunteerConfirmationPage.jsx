import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { CheckCircle } from 'lucide-react';

const VolunteerConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/vol');
    }, 5000); // Navigate after 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="text-center p-6">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <Typography variant="h5" className="mb-4">
            Thank You for Volunteering!
          </Typography>
          <Typography variant="body1" className="mb-6">
            Your sign-up has been successfully submitted. We appreciate your commitment to making a difference!
          </Typography>
          <div className="flex items-center justify-center">
            <CircularProgress size={24} className="mr-2" />
            <Typography variant="body2" color="textSecondary">
              Redirecting to volunteer dashboard...
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteerConfirmationPage;