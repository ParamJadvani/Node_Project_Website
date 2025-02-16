import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navbar";
import { getAllProducts } from "../../redux/slice/product/ProductApi";
import { addToCart } from "../../redux/slice/cart/CartApi";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filter products based on search term and price range
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceFilter, products]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: product });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product._id));
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: 2, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Search and Filter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <TextField
            label="Search"
            placeholder="Search by name or description"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: { xs: 2, md: 0 }, marginRight: { md: 2 } }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Filter by Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            variant="outlined"
            sx={{ width: { xs: "100%", md: "200px" } }}
          >
            <MenuItem value="all">All Prices</MenuItem>
            <MenuItem value="0-50">Under $50</MenuItem>
            <MenuItem value="50-100">$50 - $100</MenuItem>
            <MenuItem value="100-200">$100 - $200</MenuItem>
            <MenuItem value="200-10000000000">Above $200</MenuItem>
          </TextField>
        </Box>

        {/* Product Cards */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.image
                      ? `${API_URL}/${product.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                  sx={{ borderRadius: "16px 16px 0 0" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      textAlign: "center",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2, textAlign: "center" }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="secondary"
                    sx={{ textAlign: "center" }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => handleProductClick(product)}
                  >
                    <InfoIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Product;
