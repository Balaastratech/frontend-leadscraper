// src/store/analyticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as analyticsApi from "../api/analytics";

export const fetchOverview = createAsyncThunk("analytics/fetchOverview", async () => {
  const res = await analyticsApi.getOverview();
  return res;
});

export const fetchClusters = createAsyncThunk("analytics/fetchClusters", async () => {
  const res = await analyticsApi.getClusters();
  return res.clusters;
});

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    overview: null,
    clusters: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOverview.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOverview.fulfilled, (state, action) => { state.loading = false; state.overview = action.payload; })
      .addCase(fetchOverview.rejected, (state, action) => { state.loading = false; state.error = action.error?.message; })

      .addCase(fetchClusters.pending, (state) => { /* optional */ })
      .addCase(fetchClusters.fulfilled, (state, action) => { state.clusters = action.payload; })
      .addCase(fetchClusters.rejected, (state, action) => { state.error = action.error?.message; });
  }
});

export default analyticsSlice.reducer;
