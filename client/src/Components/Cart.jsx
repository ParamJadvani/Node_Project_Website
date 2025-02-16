import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartByUserId,
  removeFromCart,
  increaseCart,
  decreaseCart,
} from "../redux/slice/cart/CartApi";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Alert from "./Alert";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false); // Added loading state
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      dispatch(getCartByUserId(user._id));
    }
  }, [dispatch, user]);

  const calculateTotal = () => {
    const cartArray = Array.isArray(cart) ? cart : [];
    const totalAmount = cartArray.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const gstAmount = totalAmount * 0.18; // 18% GST
    const finalAmount = totalAmount + gstAmount;

    return { totalAmount, gstAmount, finalAmount };
  };

  const { totalAmount, gstAmount, finalAmount } = calculateTotal();

  const handleIncreaseQty = async (productId) => {
    setLoading(true); // Set loading state to true
    await dispatch(increaseCart(productId));
    setLoading(false); // Reset loading state after update
  };

  const handleDecreaseQty = async (productId, currentQty) => {
    if (currentQty > 1) {
      setLoading(true); // Set loading state to true
      await dispatch(decreaseCart(productId));
      setLoading(false); // Reset loading state after update
    }
  };

  const handleRemoveItem = async (productId) => {
    setLoading(true); // Set loading state to true
    await dispatch(removeFromCart(productId));
    setLoading(false); // Reset loading state after update
  };

  const checkOut = () => {
    Alert({
      type: "success",
      show: true,
      title: "Checkout",
      message: "Are you sure you want to proceed with checkout?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Proceed",
      onConfirm: handleProceedCheckout,
    });
  };
  const handleProceedCheckout = () => {
    // Redirect to checkout page
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        {loading ? (
          <Typography variant="h6">Updating cart...</Typography>
        ) : Array.isArray(cart) && cart.length > 0 ? (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {cart?.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    boxShadow: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <img
                      src={`${API_URL}/${item.product.image}`}
                      alt={item.product.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 4,
                        marginRight: 16,
                      }}
                    />
                    <Box>
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        ₹{item.product.price} / unit
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <IconButton
                      onClick={() => handleDecreaseQty(item._id, item.quantity)}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      variant="outlined"
                      size="small"
                      sx={{ width: 50, mx: 1 }}
                      disabled
                    />
                    <IconButton onClick={() => handleIncreaseQty(item._id)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    ₹{item.product.price * item.quantity}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </Card>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">
                    Subtotal: ₹{totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    GST (18%): ₹{gstAmount.toFixed(2)}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">
                    Total: ₹{finalAmount.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => checkOut()}
                  >
                    Proceed to Checkout
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6">
            Your cart is empty. Start adding items!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Cart;
