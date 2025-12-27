// src/store/billingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as billingApi from "../api/billing";

export const fetchPlans = createAsyncThunk("billing/fetchPlans", async () => {
  return await billingApi.listPlans();
});

export const fetchUsage = createAsyncThunk("billing/fetchUsage", async () => {
  return await billingApi.getUsage();
});

export const startCheckout = createAsyncThunk(
  "billing/startCheckout",
  async (planId) => {
    return await billingApi.createCheckout(planId);
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    plans: [],
    usage: null,
    checkout: null,
    loading: false
  },
  reducers: {},
  extraReducers(b) {
    b.addCase(fetchPlans.fulfilled, (s, a) => { s.plans = a.payload.plans; });
    b.addCase(fetchUsage.fulfilled, (s, a) => { s.usage = a.payload; });
    b.addCase(startCheckout.fulfilled, (s, a) => { s.checkout = a.payload; });
  }
});

export default billingSlice.reducer;
