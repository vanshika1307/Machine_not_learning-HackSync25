import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { ChevronUp, MoreVertical } from 'lucide-react';

const VolunteerOpportunityCard = ({ opportunity, onSignUp }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const PEXELS_ACCESS_KEY = '2x9PJEUPAp6NesCQHlEXydr42241R30bER75VRZMLUCJJkNNqw0Z0QrL'; // Replace with your actual Pexels access key

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Fetch an image URL based on the cause when the component mounts or the cause changes
    fetchImageUrl();
  }, [opportunity.cause]);

  const fetchImageUrl = async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          opportunity.cause
        )}&per_page=1`, {
          headers: {
            Authorization: PEXELS_ACCESS_KEY,
          },
        }
      );
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        setImageUrl(data.photos[0].src.large); // Set the fetched image URL
      } else {
        setImageUrl('fallback_image_url'); // Fallback image if no results found
      }
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      setImageUrl('fallback_image_url'); // Fallback image in case of an error
    }
  };

  return (
    <Card className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative">
      <div className="relative">
        <img 
          src={imageUrl}
          alt={opportunity.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
        <div className="absolute top-4 left-4 flex justify-between items-center w-[calc(100%-2rem)]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
              {opportunity.organization[0]}
            </div>
          </div>
          <Button className="p-1 min-w-0">
            <MoreVertical className="text-white" size={24} />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <Typography variant="h6" className="font-bold">{opportunity.title}</Typography>
          <Typography variant="body2">{opportunity.date}</Typography>
        </div>
      </div>
      <CardContent>
        <Typography variant="body2" className="text-gray-600 mb-4">
          {opportunity.description}
        </Typography>
        <Button
          onClick={handleExpandClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          endIcon={<ChevronUp className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} size={20} />}
        >
          {expanded ? 'Less Info' : 'More Info'}
        </Button>
      </CardContent>
      <div 
        className={`absolute left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'bottom-0' : 'bottom-[-250px]'
        }`}
        style={{ maxHeight: expanded ? '250px' : '0px' }}
      >
        <Button
          onClick={handleExpandClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          endIcon={<ChevronUp className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} size={20} />}
        >
          {expanded ? 'Less Info' : 'More Info'}
        </Button>
        <div className="p-4">
          <Typography className="font-semibold mb-2">Additional Details:</Typography>
          <Typography variant="body2" className="mb-2">
            Location: {opportunity.location}, {opportunity.state}
          </Typography>
          <Typography variant="body2" className="mb-2">
            Cause: {opportunity.cause}
          </Typography>
          <Typography variant="body2" className="mb-2">
            Distance: {opportunity.distance.toFixed(1)} km
          </Typography>
          <Typography variant="body2" className="mb-4">
            Join us in making a difference! This volunteer opportunity is perfect for those passionate about {opportunity.cause.toLowerCase()}.
          </Typography>
          <Button
            variant="contained"
            onClick={() => onSignUp(opportunity.id)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VolunteerOpportunityCard;
