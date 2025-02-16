import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/Api";

// Fetch cart by user ID
const getCartByUserId = createAsyncThunk(
  "cart/getCartByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/cart/user`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch cart."
      );
    }
  }
);

// Add product to cart
const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      console.log({ product });
      const res = await API.post("/cart", { product });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to add item to cart."
      );
    }
  }
);

// Remove product from cart
const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartProductId, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/cart/${cartProductId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to remove item from cart."
      );
    }
  }
);

// Increase product quantity in cart
const increaseCart = createAsyncThunk(
  "cart/increaseQty",
  async (cartProductId, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/cart/${cartProductId}/qty?increase=true`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to increase item quantity."
      );
    }
  }
);

// Decrease product quantity in cart
const decreaseCart = createAsyncThunk(
  "cart/decreaseQty",
  async (cartProductId, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/cart/${cartProductId}/qty?increase=false`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to decrease item quantity."
      );
    }
  }
);

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartByUserId.fulfilled, (state, { payload }) => {
        state.cart = payload;
        state.loading = false;
      })
      .addCase(getCartByUserId.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.cart.push(payload.cart); // Directly append the new product to the cart array
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.cart = state.cart.filter((item) => item._id !== payload.cart._id); // Remove the item from the cart
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(increaseCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseCart.fulfilled, (state, { payload }) => {
        const updatedCart = state.cart.map((item) =>
          item._id === payload.cart._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = updatedCart;
        state.loading = false;
      })
      .addCase(increaseCart.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(decreaseCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseCart.fulfilled, (state, { payload }) => {
        const updatedCart = state.cart.map((item) =>
          item._id === payload.cart._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        state.cart = updatedCart;
        state.loading = false;
      })
      .addCase(decreaseCart.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;

export {
  getCartByUserId,
  addToCart,
  removeFromCart,
  increaseCart,
  decreaseCart,
};
