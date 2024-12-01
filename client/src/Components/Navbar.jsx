import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";

const navLinks = [
  { to: "/", icon: <FaHome />, text: "Home" },
  { to: "/login", icon: <FaSignInAlt />, text: "Login" },
  { to: "/signup/user", icon: <FaUserPlus />, text: "Signup" },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const navLinkItems = (
    <>
      {navLinks.map(({ to, icon, text }) => (
        <ListItem button key={text} component={Link} to={to}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </>
  );

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#172831",
          margin: 0, // Remove any default margin
          padding: 0, // Remove any default padding
          top: 0, // Ensure the navbar is at the top
          zIndex: 1000, // Ensure the navbar is always on top
        }}
      >
        <Toolbar>
          {/* Logo or title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>

          {/* Desktop NavLinks */}
          {!isMobile && (
            <Box display="flex">
              {navLinks.map(({ to, icon, text }) => (
                <IconButton
                  key={text}
                  component={Link}
                  to={to}
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                    marginRight: "16px",
                  }}
                >
                  {icon}
                  <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                    {text}
                  </Typography>
                </IconButton>
              ))}
            </Box>
          )}

          {/* Mobile NavButton (Hamburger) */}
          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <FaHome />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>{navLinkItems}</List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
