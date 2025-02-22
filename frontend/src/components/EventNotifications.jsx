import React, { useState } from 'react';
import { Badge, IconButton, Popover, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const mockNotifications = [
  { id: 1, message: "Reminder: Beach Cleanup Drive tomorrow at 9 AM", read: false },
  { id: 2, message: "New volunteer opportunity: Teaching at local school", read: true },
  { id: 3, message: "Thank you for attending yesterday's event!", read: true },
];

const EventNotifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick} color="inherit" sx={{ 
                  ml: 2, 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }} 
              >
        <Badge badgeContent={unreadCount} color="secondary">
          <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
            <NotificationsIcon />
          </motion.div>
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: 300 }}>
          <AnimatePresence>
            {mockNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem>
                  <ListItemText 
                    primary={notification.message}
                    secondary={notification.read ? "Read" : "Unread"}
                  />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Popover>
    </>
  );
};

export default EventNotifications;