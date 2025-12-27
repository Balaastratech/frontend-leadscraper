// src/store/enrichmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as enrichmentApi from "../api/enrichment";

/**
 * Thunks
 */

export const fetchEnrichmentSources = createAsyncThunk(
  "enrichment/fetchSources",
  async (_, { rejectWithValue }) => {
    try {
      const res = await enrichmentApi.listSources();
      return res.sources;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const runLeadEnrichment = createAsyncThunk(
  "enrichment/runLeadEnrichment",
  async ({ leadId, sourceId, force }, { rejectWithValue }) => {
    try {
      const res = await enrichmentApi.runEnrichment(leadId, { sourceId, force });
      return res.result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchEnrichmentRuns = createAsyncThunk(
  "enrichment/fetchEnrichmentRuns",
  async ({ leadId }, { rejectWithValue }) => {
    try {
      const res = await enrichmentApi.listRuns(leadId);
      return res.runs;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

/**
 * Slice
 */

const enrichmentSlice = createSlice({
  name: "enrichment",
  initialState: {
    sources: [],
    runs: [], // recent runs
    loading: false,
    error: null,
    running: {}, // map leadId -> running boolean
  },
  reducers: {
    // local optimistic marker
    setRunningLocal(state, action) {
      const { leadId, val } = action.payload;
      state.running[leadId] = !!val;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEnrichmentSources.fulfilled, (state, action) => {
        state.sources = action.payload;
      })
      .addCase(fetchEnrichmentSources.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(runLeadEnrichment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runLeadEnrichment.fulfilled, (state, action) => {
        state.loading = false;
        state.runs = [action.payload, ...state.runs];
        state.running[action.payload.leadId] = false;
      })
      .addCase(runLeadEnrichment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        // if rejectWithValue provided a leadId, not guaranteed; keep simple
      })
      .addCase(fetchEnrichmentRuns.fulfilled, (state, action) => {
        state.runs = action.payload;
      });
  }
});

export const { setRunningLocal } = enrichmentSlice.actions;
export default enrichmentSlice.reducer;
