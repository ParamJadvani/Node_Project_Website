import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/auth/AuthApi";
import productReducer from "./slice/product/ProductApi";
import adminReducer from "./slice/admin/AdminApi";
import cartReducer from "./slice/cart/cartApi";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    productReducer: productReducer,
    adminReducer: adminReducer,
    cartReducer: cartReducer,
  },
});

export default store;
