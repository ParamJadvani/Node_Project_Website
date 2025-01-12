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
  Avatar,
  Divider,
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
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProductByAdminId,
  deleteProduct,
} from "../../redux/slice/product/ProductApi";
import { logout } from "../../redux/slice/auth/AuthApi";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    dispatch(getProductByAdminId())
      .unwrap()
      .then((products) => setAllProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [dispatch]);

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) =>
        formData.append(key, value)
      );

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
    } catch (error) {
      console.error("Error creating product:", error);
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
        prev.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
        {/* Existing form fields */}
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
              setProductData({ ...productData, description: e.target.value })
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
              setProductData({ ...productData, InStockQty: e.target.value })
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
        {!isEditMode && (
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
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setProductData({ ...productData, image: e.target.files[0] })
                }
              />
            </Button>
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

  const renderViewProducts = () => (
    <Grid container spacing={3}>
      {allProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "#fff",
              height: "100%",
            }}
          >
            {/* Image Section */}
            {product.image && (
              <img
                src={API_URL + "/" + product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
            )}

            {/* Content Section */}
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

            {/* Action Buttons */}
            <CardActions
              sx={{ justifyContent: "space-between", padding: "16px" }}
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
                  });
                  setIsEditModalOpen(true);
                }}
                sx={{
                  color: "#1e88e5",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                sx={{
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#ffebee",
                  },
                }}
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderDrawer = () => (
    <Drawer
      open={isDrawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#172831",
          color: "white",
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem button onClick={() => setCurrentPage("Create Product")}>
            <ListItemIcon>
              <AddCircleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Create Product" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button onClick={() => setCurrentPage("View Products")}>
            <ListItemIcon>
              <ListAltIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="View Products" sx={{ color: "white" }} />
          </ListItem>
          <Divider sx={{ borderColor: "white" }} />
          <ListItem button onClick={() => {}}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: "white" }} />
          </ListItem>
          <ListItem button onClick={() => {}}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ color: "white" }}
              onClick={() => dispatch(logout())}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: "#172831" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {renderDrawer()}
      <Box sx={{ p: 3, backgroundColor: "#f7f7f7" }}>
        {currentPage === "Create Product"
          ? renderCreateProductForm()
          : renderViewProducts()}
      </Box>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box
          sx={{
            p: 3,
            maxWidth: 600,
            mx: "auto",
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          {renderCreateProductForm(true)} {/* Pass 'true' for Edit Mode */}
        </Box>
      </Modal>
    </>
  );
};

export default AdminDashboard;
