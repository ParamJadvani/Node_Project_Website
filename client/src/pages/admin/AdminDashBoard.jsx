import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProductByAdminId,
} from "../../redux/slice/product/ProductApi";
import { decodeToken, getToken } from "../../utils/Cookies";

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
        image: e.target.files[0],
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
  const { products } = useSelector((state) => state.productReducer);
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

  useEffect(() => {
    const token = getToken();
    const data = token ? decodeToken(token) : null;

    if (data) {
      dispatch(getProductByAdminId())
        .unwrap()
        .then((products) => {
          setAllProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [dispatch]);

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

  const handleCreateProduct = async () => {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    formData.append("InStockQty", productData.InStockQty);
    formData.append("category", productData.category);
    formData.append("description", productData.description);

    try {
      const result = await dispatch(createProduct(formData)).unwrap();

      setAllProducts((prevProducts) => [...prevProducts, result]);

      setProductData({
        title: "",
        price: "",
        image: null,
        InStockQty: "",
        category: "",
        description: "",
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = async () => {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("image", productData.image || selectedProduct.image);
    formData.append("InStockQty", productData.InStockQty);
    formData.append("category", productData.category);
    formData.append("description", productData.description);

    const updatedProduct = {
      ...selectedProduct,
      ...productData,
    };

    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

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

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setProductData({
      title: product.title,
      price: product.price,
      image: null,
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
    { field: "InStockQty", headerName: "In Stock Quantity", width: 180 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenEditModal(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={handleOpenCreateModal}
        >
          Create Product
        </Button>
      </Box>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={allproducts}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          disableSelectionOnClick
        />
      </Box>
      <ProductModel
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateProduct}
        productData={productData}
        setProductData={setProductData}
      />
      <ProductModel
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditProduct}
        productData={productData}
        setProductData={setProductData}
        isEditMode
      />
    </>
  );
};

export default AdminDashboard;
