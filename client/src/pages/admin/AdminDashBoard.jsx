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
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
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
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slice/product/ProductApi";

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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProductData({
        ...productData,
        image: e.target.files[0], // File object for FormData
      });
    }
  };

  return (
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
          width: 700,
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
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              required
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
                onChange={handleFileChange}
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
              name="InStockQty"
              value={productData.InStockQty}
              onChange={handleInputChange}
              type="number"
              required
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
  );
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    image: null, // File object
    InStockQty: "",
    category: "",
    description: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allproducts, setAllProducts] = useState([]);

  const handleOpenCreateModal = () => {
    setProductData({
      title: "",
      price: "",
      image: null,
      InStockQty: "",
      category: "",
      description: "",
    });
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateProduct = () => {
    dispatch(createProduct(productData));
    const newProduct = {
      id: Date.now(),
      ...productData,
    };

    setAllProducts([...allproducts, newProduct]);
    setProductData({
      title: "",
      price: "",
      image: null,
      InStockQty: "",
      category: "",
      description: "",
    });
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = async () => {
    const updatedProduct = {
      ...selectedProduct,
      ...productData,
      image: productData.image || selectedProduct.image, // Keep existing image if not changed
    };

    // Update the product in the state
    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    // Reset form and close modal
    setProductData({
      title: "",
      price: "",
      image: null,
      InStockQty: "",
      category: "",
      description: "",
    });
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  // Open the edit modal and populate the fields
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setProductData({
      title: product.title,
      price: product.price,
      image: null, // To allow new image uploads
      InStockQty: product.InStockQty,
      category: product.category,
      description: product.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    setAllProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const columns = [
    { field: "title", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "InStockQty", headerName: "In Stock", width: 150 },
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={allproducts} columns={columns} pageSize={5} />
      </Box>
      <ProductModel
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        productData={productData}
        setProductData={setProductData}
        onSubmit={handleCreateProduct}
      />
      {selectedProduct && (
        <ProductModel
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          productData={productData}
          setProductData={setProductData}
          onSubmit={handleEditProduct} // Use handleEditProduct for editing
          isEditMode={true}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;
