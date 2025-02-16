import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Badge,
} from "@mui/material";
import {
  FaBars,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaSignOutAlt,
  FaBox,
  FaShoppingCart,
} from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/auth/AuthApi";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const { isLogin } = useSelector((store) => store.userReducer);
  const { cart } = useSelector((store) => store.cartReducer); // Access cart items
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Navigation links
  const navLinks = isLogin
    ? [
        { to: "/profile", icon: <FaUserCircle />, text: "Profile" },
        { to: "/products", icon: <FaBox />, text: "Products" },
        { to: "/cart", icon: <FaShoppingCart />, text: "Cart" },
      ]
    : [
        { to: "/", icon: <FaHome />, text: "Home" },
        { to: "/login", icon: <FaSignInAlt />, text: "Login" },
        { to: "/signup/user", icon: <FaUserPlus />, text: "Signup" },
      ];

  const navLinkItems = navLinks.map(({ to, icon, text }) => (
    <ListItem
      button
      key={text}
      component={Link}
      to={to}
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          transform: "scale(1.1)",
          transition: "transform 0.3s ease, background-color 0.3s ease",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: theme.palette.primary.main,
          transition: "color 0.3s ease",
          "&:hover": {
            color: theme.palette.secondary.main,
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          sx: {
            fontWeight: 500,
            color: theme.palette.text.primary,
          },
        }}
      />
    </ListItem>
  ));

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: theme.palette.primary.main,
          boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.12)",
          zIndex: 1200,
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.18)",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: theme.palette.primary.contrastText,
              cursor: "pointer",
              transition: "color 0.3s ease",
              "&:hover": {
                color: theme.palette.secondary.light,
              },
            }}
            component={Link}
            to="/"
          >
            MyApp
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box display="flex" alignItems="center">
              {navLinks.map(({ to, icon, text }) => (
                <Box
                  key={text}
                  component={Link}
                  to={to}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: theme.palette.primary.contrastText,
                    padding: "8px 16px",
                    borderRadius: "8px",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "white",
                      transform: "scale(1.05)",
                    },
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {icon}
                  <Typography
                    variant="body1"
                    sx={{
                      marginLeft: "8px",
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}

              {/* Cart with Badge */}
              {isLogin && (
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      color: theme.palette.secondary.light,
                    },
                  }}
                >
                  <Badge badgeContent={cart?.length || 0} color="secondary">
                    <FaShoppingCart />
                  </Badge>
                </IconButton>
              )}

              {/* Logout Button */}
              {isLogin && (
                <Box
                  key="Logout"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: theme.palette.primary.contrastText,
                    padding: "8px 16px",
                    borderRadius: "8px",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "white",
                      transform: "scale(1.05)",
                    },
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <Typography
                    variant="body1"
                    sx={{
                      marginLeft: "8px",
                      fontWeight: 500,
                    }}
                  >
                    Logout
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                color: theme.palette.primary.contrastText,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <FaBars />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 250,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, white)`,
          },
        }}
      >
        <Box sx={{ padding: "16px" }}>
          <List>{navLinkItems}</List>
          {isLogin && (
            <ListItem button key="Logout" onClick={handleLogout}>
              <ListItemIcon>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
