import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as leadsApi from "../api/leads";

/* Fetch leads with optional append mode */
export const fetchLeads = createAsyncThunk("leads/list", async (query) => {
  const res = await leadsApi.list(query);
  return res;
});

/* Create a new lead */
export const createLead = createAsyncThunk("leads/create", async (payload) => {
  const res = await leadsApi.create(payload);
  return res;
});

const initialState = {
  items: [],
  itemMap: {}, // O(1) access by id
  loading: false,
  error: null,

  createLoading: false,
  createError: null,

  filters: {
    status: [],
    minScore: null,
    maxScore: null,
    company: "",
  },

  globalSearch: "",
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    updateLeadLocal(state, action) {
      const { id, changes } = action.payload;
      const lead = state.itemMap[id];
      if (lead) {
        for (const key in changes) {
          lead[key] = changes[key];
        }
      }
    },

    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },

    setGlobalSearch(state, action) {
      state.globalSearch = action.payload;
    },

    clearFilters(state) {
      state.filters = initialState.filters;
      state.globalSearch = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------------------- FETCH LEADS -------------------- */
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;

        // Normalize API response
        const payload = action.payload || {};
        const newLeads = payload.leads || [];
        state.total = payload.total ?? newLeads.length;
        state.page = payload.page ?? 1;
        state.pageSize = payload.pageSize ?? newLeads.length;

        const { append } = action.meta.arg || {};

        if (append) {
          state.items = [...state.items, ...newLeads];
        } else {
          state.items = newLeads;
        }

        // Rebuild O(1) map
        state.itemMap = {};
        state.items.forEach((l) => {
          state.itemMap[l.id] = l;
        });
      })

      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch leads";
      })

      /* -------------------- CREATE LEAD -------------------- */
      .addCase(createLead.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createLead.fulfilled, (state, action) => {
        state.createLoading = false;

        const lead = action.payload.lead;

        if (!lead || typeof lead.id === "undefined" || lead.id === null) {
          state.createError = "Invalid lead returned from API";
          return;
        }

        state.items.push(lead);
        state.itemMap[lead.id] = lead;
      })

      .addCase(createLead.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error?.message || "Failed to create lead";
      });
  },
});

export const { updateLeadLocal, setFilters, setGlobalSearch, clearFilters } =
  leadsSlice.actions;

export default leadsSlice.reducer;
