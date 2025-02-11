import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Grid,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
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
import Profile from "../../Components/Profile";

const drawerWidth = 240;

/* =======================================
   Confirmation Dialog Component
========================================== */
const ConfirmationDialog = ({ open, title, content, onConfirm, onCancel }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{content}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} color="primary" variant="contained">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

/* =======================================
   Header Component
========================================== */
const Header = ({ toggleDrawer, loggedInAdmin, onLogout }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#172831",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2, cursor: "pointer" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SuperAdmin Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {loggedInAdmin}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onLogout}
            sx={{ cursor: "pointer" }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

/* =======================================
   Drawer Navigation Component
   (Always uses a temporary/drawable drawer with a top offset)
========================================== */
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
      toggleDrawer();
      return;
    }
    setActiveTab(id);
    toggleDrawer();
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
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        {/* Offset the drawer content from the header */}
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.id)}
                sx={{
                  backgroundColor: activeTab === item.id ? "teal" : "inherit",
                  "&:hover": { backgroundColor: "teal" },
                  cursor: "pointer",
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

/* =======================================
   UserManagement Component
   (No search bar here)
   Updated grid to display 4 cards per row on medium screens and up.
========================================== */
const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: "User X", email: "userX@example.com", role: "User" },
    { id: 2, name: "User Y", email: "userY@example.com", role: "User" },
    { id: 3, name: "User Z", email: "userZ@example.com", role: "User" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={user.id}>
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
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={openUserModal} onClose={handleCloseUserModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: "90%", sm: 400 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          {selectedUser && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {selectedUser.role}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseUserModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

/* =======================================
   AdminManagement Component
   (No search bar here)
   Updated grid to 4 items per row on medium screens and up.
========================================== */
const AdminManagement = () => {
  const dispatch = useDispatch();
  const { admins, loading } = useSelector((state) => state.adminReducer);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionAdmin, setActionAdmin] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setOpenAdminModal(true);
  };

  const handleCloseAdminModal = () => {
    setOpenAdminModal(false);
    setSelectedAdmin(null);
  };

  const openConfirmDialog = (admin, type) => {
    setActionAdmin(admin);
    setActionType(type);
    setConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === "block") {
      dispatch(blockAdmin(actionAdmin._id));
    } else {
      dispatch(verifyAdmin(actionAdmin._id));
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelAction = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Admin Management
      </Typography>
      {loading ? (
        <Typography>Loading admins...</Typography>
      ) : (
        <Grid container spacing={3}>
          {admins.map((admin) => (
            <Grid item xs={12} sm={6} md={3} key={admin._id}>
              <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 2 }}>
                    {admin.username.charAt(0).toUpperCase()}
                  </Avatar>
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
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: admin.isActive ? "green" : "red" }}
                >
                  Status: {admin.isActive ? "Active" : "Blocked"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Products Created:{" "}
                  <Box component="span" sx={{ fontFamily: "cursive" }}>
                    {admin.products && admin.products.length > 0
                      ? admin.products.length
                      : "None"}
                  </Box>
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleAdminClick(admin)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color={admin.isActive ? "error" : "primary"}
                    onClick={() =>
                      openConfirmDialog(
                        admin,
                        admin.isActive ? "block" : "unblock"
                      )
                    }
                  >
                    {admin.isActive ? "Block" : "Unblock"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal open={openAdminModal} onClose={handleCloseAdminModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: "90%", sm: 400 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Admin Details
          </Typography>
          {selectedAdmin && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedAdmin.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedAdmin.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {selectedAdmin.role}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                {selectedAdmin.isActive ? "Active" : "Blocked"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "cursive" }}>
                <strong>Products Created:</strong>{" "}
                {selectedAdmin.products && selectedAdmin.products.length > 0
                  ? selectedAdmin.products.length
                  : "No Products Created"}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseAdminModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <ConfirmationDialog
        open={confirmDialogOpen}
        title={actionType === "block" ? "Block Admin" : "Unblock Admin"}
        content={`Are you sure you want to ${actionType === "block" ? "block" : "unblock"} ${actionAdmin ? actionAdmin.username : ""}?`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </Box>
  );
};

/* =======================================
   ProductManagement Component
   (Includes a creative search bar with icon)
   Grid updated to show 4 cards per row on medium screens and up.
========================================== */
const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Confirmation dialog state for reject action
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionProduct, setActionProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleApprove = (productId) => {
    dispatch(approveProduct(productId));
  };

  const openRejectDialog = (product) => {
    setActionProduct(product);
    setConfirmDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (actionProduct) {
      dispatch(deleteProduct(`${actionProduct._id}?sendMail=true`));
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelReject = () => {
    setConfirmDialogOpen(false);
  };

  // Avoid undefined error by falling back to an empty string
  const filteredProducts = products.filter((product) =>
    (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
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
      {/* Creative Search Bar */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: "20px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon sx={{ color: "#172831" }} />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Search Products"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>
      </Box>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                p: 2,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              }}
            >
              <CardContent>
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
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
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
                  {!product.isVerified ? (
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleApprove(product._id)}
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
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ ml: 1, textTransform: "capitalize" }}
                    onClick={() => openRejectDialog(product)}
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
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Reject Product"
        content={`Are you sure you want to reject ${actionProduct?.name}?`}
        onConfirm={handleConfirmReject}
        onCancel={handleCancelReject}
      />
    </Box>
  );
};

/* =======================================
   SuperAdminDashboard Component
========================================== */
const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(2); // Default to User Management
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loggedInAdmin = useSelector((state) => state.userReducer.user.username);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        toggleDrawer={toggleDrawer}
        loggedInAdmin={loggedInAdmin}
        onLogout={() => dispatch(logout())}
      />
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
          minHeight: "100vh",
        }}
      >
        {/* Offset the content from the fixed header */}
        <Toolbar />
        {activeTab === 1 && (
          // <Typography variant="h6" sx={{ mb: 2 }}>
          //   Profile Section (Coming Soon)
          // </Typography>
          <Profile
          user={{
            username: "John Doe",
            email: "john@ecommerce.com",
            role: "Admin",
            profileImage: "/path/to/image.jpg",
          }}
          totalCreatedProducts={42}
          />
        )}
        {activeTab === 2 && <UserManagement />}
        {activeTab === 3 && <AdminManagement />}
        {activeTab === 4 && <ProductManagement />}
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
