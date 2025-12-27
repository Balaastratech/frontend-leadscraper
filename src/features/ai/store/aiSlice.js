// src/store/aiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as aiApi from "../api/ai";

/**
 * Thunks
 */

export const summarizeText = createAsyncThunk(
  "ai/summarizeText",
  async ({ input, model }, { rejectWithValue }) => {
    try {
      const res = await aiApi.summarize(input, { model });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

/**
 * Slice
 */

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    lastSummary: null, // { summary, recommendations, tokensUsed, meta }
    history: [], // array of past summaries
    loading: false,
    error: null,
  },
  reducers: {
    clearLastSummary(state) {
      state.lastSummary = null;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(summarizeText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(summarizeText.fulfilled, (state, action) => {
        state.loading = false;
        state.lastSummary = action.payload;
        state.history = [action.payload, ...state.history].slice(0, 40);
      })
      .addCase(summarizeText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearLastSummary } = aiSlice.actions;
export default aiSlice.reducer;
