import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/Api";
import { getToken } from "../../../utils/Cookies";

const intialState = {
  products: [],
  product: {},
  error: null,
};

const getAllProducts = createAsyncThunk(
  "product/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/product");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/product/${productId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const getProductByAdminId = createAsyncThunk(
  "product/getByAdminId",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/product/adminId");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await API.post("/product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(res);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/product/${id}`, data);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/product/${productId}`);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const approveProduct = createAsyncThunk(
  "product/approve",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/product/${productId}/approve`);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const productSlice = createSlice({
  initialState: intialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.product = payload;
      })
      .addCase(getProductById.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getProductByAdminId.pending, (state) => {
        state.error = null;
      })
      .addCase(getProductByAdminId.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(getProductByAdminId.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        const updatedProducts = state.products.map((product) =>
          product.id === payload.id ? payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        const updatedProducts = state.products.filter(
          (product) => product.id !== payload
        );
        state.products = updatedProducts;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(approveProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(approveProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.map((product) =>
          product.id === payload.id ? payload : product
        );
      })
      .addCase(approveProduct.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
export {
  getAllProducts,
  getProductById,
  getProductByAdminId,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
};
