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
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Edit,
  Delete,
  AddCircle,
  Image,
  PriceCheck,
  Category,
  Inventory,
} from "@mui/icons-material";

const ProductModel = ({
  open,
  onClose,
  onSubmit,
  productData,
  setProductData,
  isEditMode = false,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Create Product Modal*/}
      <Modal open={open} onClose={onClose}>
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
            width: 700, // Increased width for a larger form
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isEditMode ? "Edit Product" : "Create New Product"}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                sx={{
                  input: { fontSize: 18, padding: "15px" }, // Increased padding and font size
                  borderRadius: "8px", // Rounded corners for better style
                }}
                placeholder="Enter product name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image />
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
                value={productData.price}
                onChange={handleInputChange}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PriceCheck />
                    </InputAdornment>
                  ),
                }}
                required
                sx={{
                  input: { fontSize: 18, padding: "15px" },
                  borderRadius: "8px",
                }}
                placeholder="Enter product price"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="image">Product Image</InputLabel>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                  required
                  sx={{ fontSize: 18, padding: "15px" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Image />
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{ fontSize: 14 }}>
                  Upload an image for the product
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="In Stock Quantity"
                variant="outlined"
                name="inStock"
                value={productData.inStock}
                onChange={handleInputChange}
                type="number"
                required
                sx={{
                  input: { fontSize: 18, padding: "15px" },
                  borderRadius: "8px",
                }}
                placeholder="Enter stock quantity"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Inventory />
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
                onChange={handleInputChange}
                required
                sx={{
                  input: { fontSize: 18, padding: "15px" },
                  borderRadius: "8px",
                }}
                placeholder="Enter product category"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Category />
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
                value={productData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
                sx={{
                  input: { fontSize: 18, padding: "15px" },
                  borderRadius: "8px",
                }}
                placeholder="Enter product description"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              sx={{ fontSize: "16px", padding: "10px 20px" }}
            >
              {isEditMode ? "Update Product" : "Create Product"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const productGrid = ({ products, onEdit, onDelete }) => {};

const AdminDashboard = () => {
  const loggedInAdmin = "Admin A"; // Replace with dynamic logic as needed

  const [productData, setproductData] = useState({
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
    setproductData(product);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  // Handle Change in Input Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Product Creation
  const handleCreateProduct = () => {
    const newProduct = {
      ...productData,
      id: products.length + 1, // auto-generated product ID
    };
    setProducts([...products, newProduct]);
    setproductData({
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
          ? { ...product, ...productData }
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
          startIcon={<AddCircle />}
        >
          Create New Product
        </Button>
      </Box>

      {/* MUI X DataGrid for Product List */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={products} columns={columns} pageSize={5} />
      </Box>

      {/* Create Product Modal */}
      <ProductModel
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        productData={productData}
        setProductData={setproductData}
        onSubmit={handleCreateProduct}
      />

      {/* Edit Product Modal */}
      <ProductModel
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        productData={productData}
        setProductData={setproductData}
        onSubmit={handleUpdateProduct}
        isEditMode={true}
      />
    </Box>
  );
};

export default AdminDashboard;
