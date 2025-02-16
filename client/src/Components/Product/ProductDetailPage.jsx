import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Card,
  CardContent,
  Divider,
  TextField,
  Chip,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { ArrowForward, ShoppingCart } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { getProductById } from "../../redux/slice/product/ProductApi";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);
  const { role } = useSelector((state) => state.userReducer.user);
  const theme = useTheme();
  const API_URL = import.meta.env.VITE_API_URL;

  // Role flags
  const isUser = role === "USER";
  const isAdmin = role === "ADMIN";
  const isSuperAdmin = role === "SUPERADMIN";

  // State for interactive rating and comment (for users)
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  // Safely calculate the average rating
  const averageRating =
    product?.ratings && product.ratings.length > 0
      ? product.ratings.reduce((acc, rating) => acc + rating.value, 0) /
        product.ratings.length
      : 0;

  // Dummy handlers for update and delete (admin only)
  const handleUpdate = () => {
    console.log("Update product");
  };

  const handleDelete = () => {
    console.log("Delete product");
  };

  // Dummy data and columns for Suggested Products (using MUI‑X DataGrid)
  const suggestedProducts = [
    { id: 1, title: "Product 1", price: 49.99, image: "/default-image.jpg" },
    { id: 2, title: "Product 2", price: 59.99, image: "/default-image.jpg" },
    { id: 3, title: "Product 3", price: 39.99, image: "/default-image.jpg" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.value}
          alt={params.row.title}
          sx={{ width: 50, height: 50, objectFit: "contain" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" size="small">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      {/* Product Detail Section */}
      <Grid container spacing={4} justifyContent="center">
        {/* Left Side: Product Images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={`${API_URL}/${product?.image}`}
              alt={product?.name}
              sx={{
                width: "100%",
                maxHeight: 500,
                objectFit: "contain",
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            {/* Thumbnail Gallery (Optional) */}
            <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              {product?.thumbnailImages?.map((thumbnail, index) => (
                <Grid item key={index}>
                  <Box
                    component="img"
                    src={thumbnail}
                    alt={`thumbnail-${index}`}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.divider}`,
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Right Side: Product Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 6, p: 3 }}>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#172831" }}
              >
                {product?.title}
              </Typography>

              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mt: 2 }}
              >
                ${product?.price}
              </Typography>

              {/* Average Rating Display */}
              <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                <Rating value={averageRating} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {product?.ratings?.length || 0}{" "}
                  {product?.ratings?.length === 1 ? "Review" : "Reviews"}
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                In Stock: <b>{product?.InStockQty}</b>
              </Typography>

              {/* Total Purchases (visible for admin & superadmin) */}
              {!isUser && (
                <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                  Total Purchases: <b>{product?.purchases || 0}</b>
                </Typography>
              )}

              <Typography variant="body1" sx={{ color: "#7f8c8d", mb: 3 }}>
                <b>Description:</b> {product?.description}
              </Typography>

              {/* Action Buttons */}
              {isUser && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              )}

              {isAdmin && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={handleUpdate}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Update Product
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={handleDelete}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Delete Product
                    </Button>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* For Users: Interactive Rating & Comment Form */}
      {isUser && (
        <Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Rate this product:
            </Typography>
            <Rating
              name="user-rating"
              value={userRating}
              onChange={(e, newValue) => setUserRating(newValue)}
            />
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Add a Comment
              </Typography>
              <TextField
                label="Your Review"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary">
                Submit Review
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Customer Reviews
            </Typography>
            {product?.comments?.map((comment) => (
              <Box key={comment._id} sx={{ mb: 3 }}>
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#172831" }}
                  >
                    {comment.user?.username}
                  </Typography>
                  <Rating value={comment.rating} readOnly sx={{ mb: 1 }} />
                  <Typography variant="body1">{comment.text}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Suggested Products Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Suggested Products
        </Typography>
        <Grid container spacing={4}>
          {/* Example of other products (static for now, you can replace it with real data) */}
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
                <Box
                  component="img"
                  src="/default-image.jpg"
                  alt="Suggested Product"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <CardContent>
                  <Typography variant="h6">Suggested Product {item}</Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                    $49.99
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
