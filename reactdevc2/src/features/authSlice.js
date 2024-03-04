import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../api/apiService";

const initialState = {
  token: null,
  refresh: null,
  status: "",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.token = null;
      state.refresh = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.token = payload.data.access_token;
        state.refresh = payload.data.refresh_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const user = await apiService.post(`/login-module/user/login`, {
        username,
        password,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
