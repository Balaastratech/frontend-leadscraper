import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../api/auth";

// Session restore
const savedSession = JSON.parse(localStorage.getItem("session") || "null");

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  const res = await authApi.login(email, password); // mock endpoint
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedSession?.user || null,
    token: savedSession?.token || null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("session");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "session",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token
          })
        );
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Invalid login";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
