import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Chip,
  CardActions,
  Avatar,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { GridMenuIcon } from "@mui/x-data-grid";
import { Grid } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAdmin,
  getAdmins,
  verifyAdmin,
} from "../../redux/slice/admin/AdminApi";
import { logout } from "../../redux/slice/auth/AuthApi";
import {
  approveProduct,
  deleteProduct,
  getAllProducts,
} from "../../redux/slice/product/ProductApi";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// Header Component
const Header = ({ toggleDrawer }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#172831",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <GridMenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          SuperAdmin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Drawer Navigation Component
const DrawerNavigation = ({
  activeTab,
  setActiveTab,
  drawerOpen,
  toggleDrawer,
}) => {
  const dispatch = useDispatch();
  const menuItems = [
    { id: 1, label: "Profile", icon: <PersonIcon /> },
    { id: 2, label: "User Management", icon: <GroupIcon /> },
    { id: 3, label: "Admin Management", icon: <AdminPanelSettingsIcon /> },
    { id: 4, label: "Product Management", icon: <ShoppingCartIcon /> },
    { id: 5, label: "Logout", icon: <LogoutIcon /> },
  ];

  const handleMenuClick = (id) => {
    if (id === 5) {
      dispatch(logout());
      return;
    }
    setActiveTab(id);
    toggleDrawer(); // Close drawer on menu click
  };

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#172831",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.id)}
                sx={{
                  backgroundColor: activeTab === item.id ? "teal" : "inherit",
                  "&:hover": { backgroundColor: "teal" },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: "#fff" }} />
      </Box>
    </Drawer>
  );
};

// UserManagement Component
const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User X", email: "userX@example.com", role: "User" },
    { id: 2, name: "User Y", email: "userY@example.com", role: "User" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* User Cards */}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                <Typography variant="h6">{user.name}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
              <Chip
                label={user.role}
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleUserClick(user)}
                  sx={{ mr: 1 }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for User Details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          {selectedUser && (
            <>
              <Typography variant="body1">Name: {selectedUser.name}</Typography>
              <Typography variant="body1">
                Email: {selectedUser.email}
              </Typography>
              <Typography variant="body1">Role: {selectedUser.role}</Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// AdminManagement Component
const AdminManagement = () => {
  const dispatch = useDispatch();
  const { admins, loading } = useSelector((state) => state.adminReducer);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch admins when the component mounts
  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setOpen(true);
  };

  const handleBlockToggle = (id, isActive) => {
    if (isActive) {
      dispatch(blockAdmin(id));
    } else {
      dispatch(verifyAdmin(id));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Management
      </Typography>

      {/* Show loading state */}
      {loading ? (
        <Typography>Loading admins...</Typography>
      ) : admins.length === 0 ? (
        <Typography>No admins found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {admins.map((admin) => (
            <Grid item xs={12} sm={6} md={4} key={admin.id}>
              <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2 }}>{admin.username.charAt(0)}</Avatar>
                  <Typography variant="h6">{admin.username}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {admin.email}
                </Typography>
                <Chip
                  label={admin.role}
                  color={admin.isActive ? "success" : "error"}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Products Created: {admin.products.length}
                </Typography>

                {/* Admin Account Status */}
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: admin.isActive ? "green" : "red" }}
                >
                  Status: {admin.isActive ? "Unblocked" : "Blocked"}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleAdminClick(admin)}
                    sx={{ mr: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color={admin.isActive ? "error" : "success"}
                    size="small"
                    onClick={() => handleBlockToggle(admin._id, admin.isActive)}
                  >
                    {admin.isActive ? "Block" : "Unblock"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for Admin Details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Admin Details
          </Typography>
          {selectedAdmin && (
            <>
              <Typography variant="body1">
                Name: {selectedAdmin.name}
              </Typography>
              <Typography variant="body1">
                Email: {selectedAdmin.email}
              </Typography>
              <Typography variant="body1">
                Role: {selectedAdmin.role}
              </Typography>
              <Typography variant="body1">
                isActive: {selectedAdmin.isActive ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">Products Created:</Typography>
              <ul>
                {selectedAdmin.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// ProductManagement Component
const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const toggleApprovalStatus = (productId, status) => {
    if (status) {
      dispatch(approveProduct(productId));
    } else {
      dispatch(deleteProduct(`${productId}?sendMail=true`));
    }
  };

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          color: "#172831",
          fontWeight: "bold",
        }}
      >
        Product Management
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                p: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                {/* Product Image */}
                <Box
                  component="img"
                  src={`${API_URL}/${product.image}`}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                {/* Product Details */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#2c3e50" }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                  Created by: <b>{product.user?.username || "Unknown"}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                  Admin Email: <b>{product.user?.email || "Unknown"}</b>
                </Typography>
                <Chip
                  label={product.isVerified ? "Approved" : "Pending Approval"}
                  color={product.isVerified ? "success" : "warning"}
                  sx={{ mb: 2 }}
                />
              </CardContent>

              {/* Actions */}
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                {/* View More Details */}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleNavigate(product._id)}
                  color="info"
                  sx={{ textTransform: "capitalize" }}
                >
                  View More Details
                </Button>

                <Box>
                  {/* Approve Button */}
                  {!product.isVerified ? (
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => toggleApprovalStatus(product._id, true)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Tooltip title="Product is already approved" arrow>
                      <span>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          sx={{ textTransform: "capitalize" }}
                          disabled
                        >
                          Approve
                        </Button>
                      </span>
                    </Tooltip>
                  )}

                  {/* Reject Button */}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ ml: 1, textTransform: "capitalize" }}
                    onClick={() => toggleApprovalStatus(product._id, false)}
                    disabled={product.isVerified}
                  >
                    Reject
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// SuperAdminDashboard Component
const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [drawerOpen, setDrawerOpen] = useState(false); // Control drawer open/close state
  const [loggedInAdmin, setLoggedInAdmin] = useState("Admin A");
  const [role] = useState("SuperAdmin");

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header toggleDrawer={toggleDrawer} />
      <DrawerNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f7f7f7",
          p: 3,
          mt: "64px",
          minHeight: "100vh",
        }}
      >
        {activeTab === 1 && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile Section (Coming Soon)
          </Typography>
        )}
        {activeTab === 2 && <UserManagement />}
        {activeTab === 3 && <AdminManagement />}
        {activeTab === 4 && (
          <ProductManagement role={role} loggedInAdmin={loggedInAdmin} />
        )}
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
