import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/auth/AuthApi";
import productReducer from "./slice/product/ProductApi";
import adminReducer from "./slice/admin/AdminApi";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    productReducer: productReducer,
    adminReducer: adminReducer,
  },
});

export default store;
