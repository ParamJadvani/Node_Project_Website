import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CssBaseline,
  Grid,
  Modal,
  TextField,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AddCircle as AddCircleIcon,
  ListAlt as ListAltIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProductByAdminId,
  deleteProduct,
} from "../../redux/slice/product/ProductApi";
import { logout } from "../../redux/slice/auth/AuthApi";
import Profile from "../../Components/Profile";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const API_URL = import.meta.env.VITE_API_URL;
  const loggedInAdmin = useSelector((state) => state.userReducer.user);

  // State management
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Create Product");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null,
    InStockQty: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Snackbar state for notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Delete confirmation dialog state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products on mount or refresh
  const refreshProducts = () => {
    dispatch(getProductByAdminId())
      .unwrap()
      .then((products) => setAllProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    refreshProducts();
  }, [dispatch]);

  // HANDLERS

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await dispatch(createProduct(formData)).unwrap();
      setAllProducts((prev) => [...prev, result]);
      setProductData({
        title: "",
        price: "",
        category: "",
        description: "",
        image: null,
        InStockQty: "",
      });
      setSnackbarMessage("Product created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error creating product:", error);
      setSnackbarMessage("Error creating product");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditProduct = async () => {
    try {
      const product = {
        id: selectedProduct._id,
        data: productData,
      };

      const updatedProduct = await dispatch(updateProduct(product)).unwrap();
      setAllProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      setIsEditModalOpen(false);
      setSnackbarMessage("Product updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setSnackbarMessage("Error updating product");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(productToDelete._id)).unwrap();
      setAllProducts((prev) =>
        prev.filter((p) => p._id !== productToDelete._id)
      );
      setOpenDeleteDialog(false);
      setSnackbarMessage("Product deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      setSnackbarMessage("Error deleting product");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // RENDER FUNCTIONS

  const renderCreateProductForm = (isEditMode = false) => (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#172831" }}>
        {isEditMode ? "Edit Product" : "Create New Product"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            name="title"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddCircleIcon sx={{ color: "#172831" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            name="price"
            type="number"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InventoryIcon sx={{ color: "#172831" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="category"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ListAltIcon sx={{ color: "#172831" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={3}
            value={productData.description}
            onChange={(e) =>
              setProductData({
                ...productData,
                description: e.target.value,
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "#172831" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="In Stock Quantity"
            variant="outlined"
            name="InStockQty"
            type="number"
            value={productData.InStockQty}
            onChange={(e) =>
              setProductData({
                ...productData,
                InStockQty: e.target.value,
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InventoryIcon sx={{ color: "#172831" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            component="label"
            startIcon={<ImageIcon sx={{ color: "#172831" }} />}
            sx={{
              backgroundColor: "#eaf2f8",
              "&:hover": {
                backgroundColor: "#d1e4f0",
              },
            }}
          >
            {isEditMode ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setProductData({
                  ...productData,
                  image: e.target.files[0],
                })
              }
            />
          </Button>
        </Grid>
        {productData.image && productData.image instanceof File && (
          <Grid item xs={12}>
            <Box
              component="img"
              src={URL.createObjectURL(productData.image)}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                mt: 1,
              }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={isEditMode ? handleEditProduct : handleCreateProduct}
          >
            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderViewProducts = () => {
    const filteredProducts = products?.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            fullWidth
            sx={{
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                backgroundColor: "white",
                transition: "0.3s",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.15)",
                },
                "&.Mui-focused": {
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                },
                "& fieldset": { border: "1px solid #ccc" },
                "&:hover fieldset": { borderColor: "#172831" },
                "&.Mui-focused fieldset": { borderColor: "#172831" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon sx={{ color: "#172831" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={refreshProducts} sx={{ cursor: "pointer" }}>
            <RefreshIcon />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {product.image && (
                  <Box
                    component="img"
                    src={`${API_URL}/${product.image}`}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                )}
                <CardContent sx={{ padding: "16px" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#172831", fontWeight: 600, mb: 1 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0", mb: 1 }}>
                    Price:{" "}
                    <span style={{ color: "#388e3c", fontWeight: "bold" }}>
                      ${product.price}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8e99f3", mb: 1 }}>
                    Category: {product.category}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: product.isVerified ? "#388e3c" : "#d32f2f",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {product.isVerified ? "Verified" : "Not Verified"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    padding: "16px",
                  }}
                >
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedProduct(product);
                      setProductData({
                        title: product.title,
                        price: product.price,
                        category: product.category,
                        description: product.description,
                        InStockQty: product.InStockQty,
                        image: product.image, // retain current image if needed
                      });
                      setIsEditModalOpen(true);
                    }}
                    sx={{
                      color: "#1e88e5",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#e3f2fd" },
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#ffebee" },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProductToDelete(product);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderDrawer = () => (
    <Drawer
      open={isDrawerOpen}
      onClose={toggleDrawer}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#172831",
          color: "white",
        },
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        <List>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Create Product");
              toggleDrawer();
            }}
            sx={{
              backgroundColor:
                currentPage === "Create Product" ? "#1e88e5" : "inherit",
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <AddCircleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Create Product" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setCurrentPage("View Products");
              toggleDrawer();
            }}
            sx={{
              backgroundColor:
                currentPage === "View Products" ? "#1e88e5" : "inherit",
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <ListAltIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View Products" />
          </ListItem>
          <Divider sx={{ borderColor: "white", my: 1 }} />
          <ListItem
            button
            onClick={() => {
              setCurrentPage("Profile"); // navigate to Profile page
              toggleDrawer();
            }}
            sx={{
              backgroundColor:
                currentPage === "Profile" ? "#1e88e5" : "inherit",
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              dispatch(logout());
              toggleDrawer();
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  const renderMainContent = () => {
    if (currentPage === "Create Product") {
      return renderCreateProductForm();
    } else if (currentPage === "View Products") {
      return renderViewProducts();
    } else if (currentPage === "Profile") {
      return (
        <Profile
          user={{
            username: loggedInAdmin.username,
            email: loggedInAdmin.email,
            role: loggedInAdmin.role,
            profileImage: loggedInAdmin.profile,
          }}
        />
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#172831",
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ cursor: "pointer" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {loggedInAdmin.username}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch(logout());
                toggleDrawer();
              }}
              sx={{ cursor: "pointer" }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderDrawer()}
      <Box
        sx={{
          p: 3,
          mt: 8,
          backgroundColor: "#f7f7f7",
          minHeight: "100vh",
        }}
      >
        {renderMainContent()}
      </Box>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 3,
            maxWidth: 600,
            width: "90%",
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          {renderCreateProductForm(true)}
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminDashboard;
