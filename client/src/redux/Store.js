import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/auth/AuthApi";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

export default store;
