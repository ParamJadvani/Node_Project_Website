import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/auth/AuthApi";
import productReducer from "./slice/product/ProductApi";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    productReducer: productReducer,
  },
});

export default store;
