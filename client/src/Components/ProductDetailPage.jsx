import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../redux/slice/product/ProductApi";
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Chip,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { ArrowForward, ShoppingCart } from "@mui/icons-material";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);
  const theme = useTheme();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      {/* Product Detail Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          {/* Product Image Gallery */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={`${API_URL}/${product.image}`}
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

        {/* Product Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 6, p: 3 }}>
            <CardContent>
              {/* Product Title */}
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#172831" }}
              >
                {product?.title}
              </Typography>

              {/* Product Price */}
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main, mt: 2 }}
              >
                ${product?.price}
              </Typography>

              {/* Product Rating */}
              <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                <Rating
                  value={
                    product?.ratings.reduce(
                      (acc, rating) => acc + rating.value,
                      0
                    ) / product?.ratings.length || 0
                  }
                  readOnly
                  precision={0.5}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {product?.ratings.length}{" "}
                  {product?.ratings.length === 1 ? "Review" : "Reviews"}
                </Typography>
              </Stack>

              {/* Product Availability */}
              <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 2 }}>
                In Stock: <b>{product?.InStockQty}</b>
              </Typography>

              {/* Product Description */}
              <Typography variant="body1" sx={{ color: "#7f8c8d", mb: 3 }}>
                <b>Description:</b> {product?.description}
              </Typography>

              {/* Add to Cart & Buy Now Buttons */}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product Features */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Key Features
        </Typography>
        <Grid container spacing={2}>
          {product?.features?.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Chip label={feature} color="primary" fullWidth />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Customer Reviews Section */}
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
        {/* Add a Comment */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Add a Comment
          </Typography>
          <TextField
            label="Your Review"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Submit Review
          </Button>
        </Card>
      </Box>

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
