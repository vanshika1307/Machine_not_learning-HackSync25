import React from 'react';
import { Container, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Mock data - replace with actual data from your backend
const communityData = {
  totalHours: 10000,
  eventsHosted: 500,
  contributions: 50000,
  activeVolunteers: 1000,
  avgHoursPerVolunteer: 10,
  newMembers: 150,
  impactAreas: [
    { name: 'Environment', value: 30 },
    { name: 'Education', value: 25 },
    { name: 'Health', value: 20 },
    { name: 'Social Services', value: 15 },
    { name: 'Others', value: 10 },
  ],
};

const userData = {
  totalHours: 50,
  eventsAttended: 10,
  contributions: 500,
  milestones: [
    { label: 'First Event', achieved: true },
    { label: '100 Hours', achieved: false },
    { label: 'Top Contributor', achieved: false },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CommunityDashBoard = () => {
  const MotionPaper = motion(Paper);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Impact Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom padding={2}>
              Community Impact
            </Typography>
            <Grid container spacing={2} padding={2}>
              <Grid item xs={4}>
                <Typography variant="body1">Total Hours Volunteered</Typography>
                <Typography variant="h4">{communityData.totalHours}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Events Hosted</Typography>
                <Typography variant="h4">{communityData.eventsHosted}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Total Contributions ($)</Typography>
                <Typography variant="h4">{communityData.contributions}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Active Volunteers</Typography>
                <Typography variant="h4">{communityData.activeVolunteers}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Avg Hours per Volunteer</Typography>
                <Typography variant="h4">{communityData.avgHoursPerVolunteer}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">New Members</Typography>
                <Typography variant="h4">{communityData.newMembers}</Typography>
              </Grid>
            </Grid>
          </MotionPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" gutterBottom padding={2}>
              Impact Areas
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={communityData.impactAreas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {communityData.impactAreas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Grid container spacing={1} padding={2}>
              {communityData.impactAreas.map((area, index) => (
                <Grid item xs={6} key={area.name}>
                  <Typography variant="body2" style={{ color: COLORS[index % COLORS.length] }}>
                    {area.name}: {area.value}%
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </MotionPaper>
        </Grid>
        <Grid item xs={12}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h6" gutterBottom padding={2}>
              Your Contribution
            </Typography>
            <Grid container spacing={2} padding={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Hours Volunteered</Typography>
                <Typography variant="h5">{userData.totalHours}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userData.totalHours / communityData.totalHours) * 100} 
                  style={{ marginTop: '8px' }}
                />
                <Typography variant="body2" align="right">
                  {((userData.totalHours / communityData.totalHours) * 100).toFixed(2)}% of community total
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Events Attended</Typography>
                <Typography variant="h5">{userData.eventsAttended}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userData.eventsAttended / communityData.eventsHosted) * 100} 
                  style={{ marginTop: '8px' }}
                />
                <Typography variant="body2" align="right">
                  {((userData.eventsAttended / communityData.eventsHosted) * 100).toFixed(2)}% of total events
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Your Contributions ($)</Typography>
                <Typography variant="h5">{userData.contributions}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userData.contributions / communityData.contributions) * 100} 
                  style={{ marginTop: '8px' }}
                />
                <Typography variant="body2" align="right">
                  {((userData.contributions / communityData.contributions) * 100).toFixed(2)}% of total contributions
                </Typography>
              </Grid>
            </Grid>
          </MotionPaper>
        </Grid>
        <Grid item xs={12}>
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h6" gutterBottom padding={2}>
              Milestones
            </Typography>
            <Grid container spacing={2} padding={2}>
              {userData.milestones.map((milestone) => (
                <Grid item xs={12} sm={4} key={milestone.label}>
                  <Typography variant="body1">{milestone.label}</Typography>
                  <Typography variant="body2" color={milestone.achieved ? 'green' : 'red'}>
                    {milestone.achieved ? 'Achieved' : 'Not Achieved'}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunityDashBoard;
