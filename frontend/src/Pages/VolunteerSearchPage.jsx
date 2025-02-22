import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import VolunteerOpportunityCard from '../components/VolunteerOpportunityCard'; // Make sure to import the new component
import { useNavigate } from 'react-router-dom';

// Expanded mock data for volunteer opportunities
const mockOpportunities = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    description: "Join us in cleaning up Juhu Beach and protecting marine life.",
    location: "Mumbai",
    state: "Maharashtra",
    cause: "Environment",
    date: "2024-10-15",
    organization: "Clean Seas India",
    latitude: 19.0948,
    longitude: 72.8258
  },
  {
    id: 2,
    title: "Teach English to Underprivileged Children",
    description: "Help children improve their English skills at a local community center.",
    location: "Pune",
    state: "Maharashtra",
    cause: "Education",
    date: "2024-10-20",
    organization: "Literacy for All",
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: 3,
    title: "Food Distribution for the Homeless",
    description: "Distribute meals to homeless individuals in the city center.",
    location: "Mumbai",
    state: "Maharashtra",
    cause: "Hunger",
    date: "2024-10-25",
    organization: "Feeding Hope",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: 4,
    title: "Tree Planting Initiative",
    description: "Help increase green cover by planting trees in urban areas.",
    location: "Nagpur",
    state: "Maharashtra",
    cause: "Environment",
    date: "2024-11-05",
    organization: "Green Maharashtra",
    latitude: 21.1458,
    longitude: 79.0882
  },
  {
    id: 5,
    title: "Elder Care Assistance",
    description: "Spend time with elderly residents at a local care home.",
    location: "Mumbai",
    state: "Maharashtra",
    cause: "Elderly Care",
    date: "2024-11-10",
    organization: "Silver Years Foundation",
    latitude: 19.1136,
    longitude: 72.8697
  },
  {
    id: 6,
    title: "Rural Health Camp",
    description: "Provide basic health check-ups and awareness in rural areas.",
    location: "Aurangabad",
    state: "Maharashtra",
    cause: "Healthcare",
    date: "2024-11-15",
    organization: "Rural Health Initiative",
    latitude: 19.8762,
    longitude: 75.3433
  },
  {
    id: 7,
    title: "Literacy Drive in Slums",
    description: "Teach basic reading and writing skills to children in urban slums.",
    location: "Delhi",
    state: "Delhi",
    cause: "Education",
    date: "2024-11-20",
    organization: "Educate India",
    latitude: 28.7041,
    longitude: 77.1025
  },
  {
    id: 8,
    title: "Mangrove Conservation Project",
    description: "Help preserve the coastal ecosystem by planting mangroves.",
    location: "Ratnagiri",
    state: "Maharashtra",
    cause: "Environment",
    date: "2024-11-25",
    organization: "Coastal Conservation Society",
    latitude: 16.9902,
    longitude: 73.3120
  },
  {
    id: 9,
    title: "Street Animal Care",
    description: "Provide food and basic medical care to street animals.",
    location: "Bengaluru",
    state: "Karnataka",
    cause: "Animal Welfare",
    date: "2024-12-01",
    organization: "Street Paws",
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    id: 10,
    title: "Women's Skill Development Workshop",
    description: "Teach tailoring and handicraft skills to underprivileged women.",
    location: "Kolhapur",
    state: "Maharashtra",
    cause: "Women Empowerment",
    date: "2024-12-05",
    organization: "Empowered Women India",
    latitude: 16.7050,
    longitude: 74.2433
  }
];

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

const VolunteerSearchPage = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [userLocation, setUserLocation] = useState({ latitude: 19.0760, longitude: 72.8777 }); // Default to Mumbai
  const [distanceFilter, setDistanceFilter] = useState(500); // Default 500km radius

  useEffect(() => {
    // Simulating API call to fetch opportunities
    setOpportunities(mockOpportunities);
    setFilteredOpportunities(mockOpportunities);

    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    const filtered = opportunities.filter(opp => {
      const distance = calculateDistance(
        userLocation.latitude, 
        userLocation.longitude, 
        opp.latitude, 
        opp.longitude
      );
      return (
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (causeFilter === '' || opp.cause === causeFilter) &&
        (cityFilter === '' || opp.location === cityFilter) &&
        (stateFilter === '' || opp.state === stateFilter) &&
        distance <= distanceFilter
      );
    });
    setFilteredOpportunities(filtered);
  }, [searchTerm, causeFilter, cityFilter, stateFilter, distanceFilter, opportunities, userLocation]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCauseFilter = (event) => {
    setCauseFilter(event.target.value);
  };

  const handleCityFilter = (event) => {
    setCityFilter(event.target.value);
  };

  const handleStateFilter = (event) => {
    setStateFilter(event.target.value);
  };

  const handleDistanceFilter = (event, newValue) => {
    setDistanceFilter(newValue);
  };

  const handleSignUp = (id) => {
  
  navigate("/volsignup");
    // Here you would typically handle the sign-up process
  };

  const uniqueCities = [...new Set(opportunities.map(opp => opp.location))];
  const uniqueStates = [...new Set(opportunities.map(opp => opp.state))];
  const uniqueCauses = [...new Set(opportunities.map(opp => opp.cause))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-50 min-h-screen"
    >
      
      <Typography variant="h4" className="mb-6 text-blue-800 p-[15px]">
        Volunteer Opportunities
      </Typography>

      <div className="mb-4 flex flex-wrap gap-4">
        <TextField
          label="Search opportunities"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          className="w-[500px] mr-2"
        />
        <FormControl variant="outlined" className="min-w-[120px]">
          <InputLabel>Cause</InputLabel>
          <Select
            value={causeFilter}
            onChange={handleCauseFilter}
            label="Cause"
            className="w-[100px] mr-2"
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCauses.map((cause) => (
              <MenuItem key={cause} value={cause}>
                {cause}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="min-w-[120px]">
          <InputLabel>City</InputLabel>
          <Select
            value={cityFilter}
            onChange={handleCityFilter}
            label="City"
            className="w-[100px] mr-2"
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="min-w-[120px]">
          <InputLabel>State</InputLabel>
          <Select
            value={stateFilter}
            onChange={handleStateFilter}
            label="State"
            className="w-[100px] mr-2"
          >
            <MenuItem value="">All</MenuItem>
            {uniqueStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mb-4">
        <Typography id="distance-slider" gutterBottom>
          Distance (km): {distanceFilter}
        </Typography>
        <Slider
          value={distanceFilter}
          onChange={handleDistanceFilter}
          aria-labelledby="distance-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={1000}
        />
      </div>

      <Grid container spacing={3}>
        {filteredOpportunities.map((opp) => (
          <Grid item xs={12} sm={6} md={4} key={opp.id}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <VolunteerOpportunityCard
                opportunity={{
                  ...opp,
                  distance: calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    opp.latitude,
                    opp.longitude
                  )
                }}
                onSignUp={handleSignUp}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default VolunteerSearchPage;