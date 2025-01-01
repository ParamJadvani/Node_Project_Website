import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";

const AdminDashboard = () => {
  const loggedInAdmin = "Admin A"; // Replace with dynamic logic as needed

  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    image: "",
    inStock: "",
    category: "",
    description: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);

  // Open/Close Modals
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setNewProductData(product);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  // Handle Change in Input Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Product Creation
  const handleCreateProduct = () => {
    const newProduct = {
      ...newProductData,
      id: products.length + 1, // auto-generated product ID
    };
    setProducts([...products, newProduct]);
    setNewProductData({
      name: "",
      price: "",
      image: "",
      inStock: "",
      category: "",
      description: "",
    });
    setIsCreateModalOpen(false);
  };

  // Handle Product Update
  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, ...newProductData }
          : product
      )
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle Product Deletion
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Columns for MUI X DataGrid
  const columns = [
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "inStock", headerName: "In Stock", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteProduct(params.row.id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
        >
          Create New Product
        </Button>
      </Box>

      {/* MUI X DataGrid for Product List */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={products} columns={columns} pageSize={5} />
      </Box>

      {/* Create Product Modal */}
      <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
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
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create New Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                name="name"
                value={newProductData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                name="price"
                value={newProductData.price}
                onChange={handleInputChange}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                name="image"
                value={newProductData.image}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="In Stock Quantity"
                variant="outlined"
                name="inStock"
                value={newProductData.inStock}
                onChange={handleInputChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                name="category"
                value={newProductData.category}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={newProductData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Product Modal */}
      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
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
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                name="name"
                value={newProductData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                name="price"
                value={newProductData.price}
                onChange={handleInputChange}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                name="image"
                value={newProductData.image}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="In Stock Quantity"
                variant="outlined"
                name="inStock"
                value={newProductData.inStock}
                onChange={handleInputChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                name="category"
                value={newProductData.category}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={newProductData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
