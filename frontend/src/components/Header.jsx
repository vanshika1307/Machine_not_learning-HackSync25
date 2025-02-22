import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Container,
  useMediaQuery,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Brightness4, Brightness7, Menu as MenuIcon, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../utils/ColorModeProvider";
import EventNotifications from "./EventNotifications";

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => setMobileMenuAnchor(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const handleDropdownOpen = (event) => setDropdownAnchor(event.currentTarget);
  const handleDropdownClose = () => setDropdownAnchor(null);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.8 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const mainNavItems = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
    { name: "Event Calendar", path: "/eventcalendar" },
    { name: "Donate", path: "/donate" },
    { name: "Login", path: "/login" },
  ];

  const dropdownItems = [
    { name: "Community Dashboard", path: "/comdash" },
    { name: "Education Training", path: "/edu" },
    { name: "Volunteer Search", path: "/vol" },
    { name: "Profile", path: "/profile" },
  ];

  const renderNavItems = (items, mobile = false) => {
    return items.map((item) => (
      <motion.div key={item.name} variants={menuItemVariants}>
        <Button
          component={Link}
          to={item.path}
          onClick={mobile ? handleMobileMenuClose : undefined}
          sx={{
            color: "inherit",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          {item.name}
        </Button>
      </motion.div>
    ));
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={headerVariants}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: theme.palette.mode === "dark"
            ? "linear-gradient(45deg, #2A3EB1 30%, #4527A0 90%)"
            : "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={mobileMenuAnchor}
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleMobileMenuClose}
                  >
                    <AnimatePresence>
                      {renderNavItems([...mainNavItems, ...dropdownItems], true)}
                    </AnimatePresence>
                  </Menu>
                </>
              ) : (
                <>
                  {renderNavItems(mainNavItems)}
                  <Button
                    color="inherit"
                    onClick={handleDropdownOpen}
                    endIcon={<ExpandMore />}
                  >
                    More
                  </Button>
                  <Menu
                    anchorEl={dropdownAnchor}
                    open={Boolean(dropdownAnchor)}
                    onClose={handleDropdownClose}
                  >
                    <AnimatePresence>
                      {renderNavItems(dropdownItems)}
                    </AnimatePresence>
                  </Menu>
                </>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <EventNotifications />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

export default Header;