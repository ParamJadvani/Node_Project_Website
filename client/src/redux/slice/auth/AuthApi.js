import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/Api.js";
import {
  decodeToken,
  getToken,
  removeCookies,
  setToken,
} from "../../../utils/Cookies.js";

const token = getToken();
const data = token ? decodeToken(token) : null;

const intialState = {
  user: data ? data : {},
  isLogin: !!data,
  isActive: data ? data.isActive : true,
  isLoading: false,
  error: null,
};

const createAccount = createAsyncThunk(
  "user/create",
  async (signupData, { rejectWithValue }) => {
    try {
      const res = await API.post("/user/register", signupData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setToken(res.data.token);
      console.log(res);
      res.data.isActive = res.data.user.isActive;
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const loginAccount = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await API.post("/user/login", loginData);
      console.log(res.data);
      if (res.data) {
        setToken(res.data.token);
        res.data.isActive = res.data.user.isActive;
        delete res.data.user.isActive;
        return res.data;
      } else {
        return rejectWithValue("Your account is not activated.");
      }
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.isLogin = false;
      state.isActive = true;
      state.isLoading = false;
      state.error = null;
      removeCookies("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isActive = payload.isActive;
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(createAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginAccount.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = payload;
      })
      .addCase(loginAccount.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isActive = payload.isActive;
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(loginAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
export { createAccount, loginAccount };
export default userReducer;
