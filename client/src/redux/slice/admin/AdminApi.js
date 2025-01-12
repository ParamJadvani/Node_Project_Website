import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/Api";
import { getToken } from "../../../utils/Cookies";

const intialState = {
  admins: [],
  admin: {},
  isLoading: false,
  error: null,
};

const getAdmins = createAsyncThunk(
  "admin/getAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user?role=admin");
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getAdminById = createAsyncThunk(
  "admin/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user?_id=${id}`);
      return response.data.users[0];
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const verifyAdmin = createAsyncThunk(
  "admin/verifyAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/user/${id}/verifyadmin`);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const blockAdmin = createAsyncThunk(
  "admin/blockAdmin",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await API.patch(`/user/${id}/blockadmin`);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const AdminSlice = createSlice({
  name: "admin",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, { payload }) => {
        state.admins = payload;
        state.isLoading = false;
      })
      .addCase(getAdmins.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getAdminById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminById.fulfilled, (state, { payload }) => {
        state.admin = payload;
        state.isLoading = false;
      })
      .addCase(getAdminById.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(verifyAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAdmin.fulfilled, (state, { payload }) => {
        state.admin = payload;
        state.admins = state.admins.map((admin) =>
          admin._id === payload._id ? { ...admin, ...payload } : admin
        );
        state.isLoading = false;
      })
      .addCase(verifyAdmin.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(blockAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockAdmin.fulfilled, (state, { payload }) => {
        state.admin = payload;
        state.admins = state.admins.map((admin) =>
          admin._id === payload._id ? { ...admin, ...payload } : admin
        );
        state.isLoading = false;
      })
      .addCase(blockAdmin.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

const adminReducer = AdminSlice.reducer;

export { getAdmins, getAdminById, verifyAdmin, blockAdmin };
export default adminReducer;
