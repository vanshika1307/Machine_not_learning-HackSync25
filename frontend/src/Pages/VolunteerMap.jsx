import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { Card, CardContent, Typography, Button } from '@mui/material';

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

const VolunteerMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        setUserLocation([19.0760, 72.8777]); // Default to Mumbai if geolocation fails
      }
    );
  }, []);

  const MapView = () => {
    const map = useMap();

    useEffect(() => {
      if (selectedOpportunity && userLocation) {
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(userLocation[0], userLocation[1]),
            L.latLng(selectedOpportunity.latitude, selectedOpportunity.longitude)
          ],
          routeWhileDragging: true
        }).addTo(map);

        return () => {
          map.removeControl(routingControl);
        };
      }
    }, [selectedOpportunity, userLocation, map]);

    return null;
  };

  const handleMarkerClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <MapContainer center={userLocation} zoom={10} style={{ height: '100%', width: '70%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mockOpportunities.map((opportunity) => (
          <Marker
            key={opportunity.id}
            position={[opportunity.latitude, opportunity.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(opportunity),
            }}
          >
            <Popup>{opportunity.title}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <MapView />
      </MapContainer>
      <div style={{ width: '30%', overflowY: 'auto', padding: '20px' }}>
        {selectedOpportunity ? (
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {selectedOpportunity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedOpportunity.description}
              </Typography>
              <Typography variant="body2">
                Location: {selectedOpportunity.location}, {selectedOpportunity.state}
              </Typography>
              <Typography variant="body2">
                Date: {selectedOpportunity.date}
              </Typography>
              <Typography variant="body2">
                Organization: {selectedOpportunity.organization}
              </Typography>
              <Button onClick={() => setSelectedOpportunity(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">
            Click on a marker to see opportunity details and get directions.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default VolunteerMap;