import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Typography, Grid, Button, 
  FormControl, InputLabel, Select, MenuItem, Box, 
  Card, CardContent, CardActions, Chip, useTheme, ThemeProvider, createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Event, LocationOn, Group } from '@mui/icons-material';


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
    title: "Teach English to Children",
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
// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
}));

const DayCell = styled(Paper)(({ theme, isCurrentMonth, isToday }) => ({
  height: '120px',
  overflow: 'auto',
  padding: theme.spacing(1),
  backgroundColor: isToday 
    ? theme.palette.secondary.light 
    : isCurrentMonth 
      ? theme.palette.background.paper 
      : theme.palette.action.disabledBackground,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const EventButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textTransform: 'none',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
}));

const EventCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const EventCardHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState(mockOpportunities);
  const [filterCause, setFilterCause] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const causes = [...new Set(mockOpportunities.map(op => op.cause))];
  const locations = [...new Set(mockOpportunities.map(op => op.location))];

  useEffect(() => {
    setFilteredEvents(mockOpportunities.filter(op => 
      (!filterCause || op.cause === filterCause) &&
      (!filterLocation || op.location === filterLocation)
    ));
  }, [filterCause, filterLocation]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const addToCalendar = (event) => {
    const { title, description, date, location } = event;
    const startTime = new Date(date).toISOString();
    const endTime = new Date(new Date(date).setHours(new Date(date).getHours() + 2)).toISOString();

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startTime.replace(/[-:]/g, '')}/${endTime.replace(/[-:]/g, '')}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Volunteer Opportunities Calendar
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CalendarHeader>
              <Button onClick={handlePrevMonth} startIcon={<ChevronLeft />} color="inherit">
                Prev
              </Button>
              <Typography variant="h6">
                {format(currentMonth, 'MMMM yyyy')}
              </Typography>
              <Button onClick={handleNextMonth} endIcon={<ChevronRight />} color="inherit">
                Next
              </Button>
            </CalendarHeader>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Filter by Cause</InputLabel>
                  <Select
                    value={filterCause}
                    onChange={(e) => setFilterCause(e.target.value)}
                    label="Filter by Cause"
                  >
                    <MenuItem value="">All Causes</MenuItem>
                    {causes.map(cause => (
                      <MenuItem key={cause} value={cause}>{cause}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Filter by Location</InputLabel>
                  <Select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    label="Filter by Location"
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {locations.map(location => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Grid item xs={1.7} key={day}>
                  <Typography align="center" fontWeight="bold" color="primary">
                    {day}
                  </Typography>
                </Grid>
              ))}
              {daysInMonth.map((day) => (
                <Grid item xs={1.7} key={day.toString()}>
                  <DayCell 
                    isCurrentMonth={isSameMonth(day, currentMonth)} 
                    isToday={isToday(day)}
                  >
                    <Typography align="center" color={isToday(day) ? 'secondary' : 'textPrimary'}>
                      {format(day, 'd')}
                    </Typography>
                    <AnimatePresence>
                      {filteredEvents
                        .filter(event => format(parseISO(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                        .map(event => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <EventButton 
                              variant="contained" 
                              size="small" 
                              fullWidth
                              color="secondary"
                              onClick={() => setSelectedEvent(event)}
                            >
                              {event.title}
                            </EventButton>
                          </motion.div>
                        ))
                      }
                    </AnimatePresence>
                  </DayCell>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard>
                    <EventCardHeader>
                      <Typography variant="h6">{selectedEvent.title}</Typography>
                    </EventCardHeader>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {selectedEvent.description}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Event fontSize="small" color="primary" />
                        <Typography variant="body2" ml={1}>
                          {format(parseISO(selectedEvent.date), 'MMMM d, yyyy')}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <LocationOn fontSize="small" color="primary" />
                        <Typography variant="body2" ml={1}>
                          {selectedEvent.location}, {selectedEvent.state}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Group fontSize="small" color="primary" />
                        <Typography variant="body2" ml={1}>
                          {selectedEvent.organization}
                        </Typography>
                      </Box>
                      <Chip label={selectedEvent.cause} color="secondary" size="small" />
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        color="primary"
                        variant="contained"
                        onClick={() => addToCalendar(selectedEvent)}
                        fullWidth
                      >
                        Add to Calendar
                      </Button>
                    </CardActions>
                  </EventCard>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default EventCalendar;