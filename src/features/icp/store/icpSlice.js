// src/store/icpSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * ICP (Ideal Customer Profile) slice
 * Simple client-side store: create, update, delete, list
 * TODO: Persist to backend via POST/GET /api/icp
 */

const icpSlice = createSlice({
  name: "icp",
  initialState: {
    list: [
      // sample seed entry to demonstrate UI
      {
        id: "icp-1",
        name: "SaaS Mid-Market",
        description: "SaaS companies 50-500 employees, US/EMEA, ARR > $1M",
        tags: ["SaaS", "mid-market"],
        createdAt: new Date().toISOString()
      }
    ],
  },
  reducers: {
    createICP(state, action) {
      state.list.unshift({ ...action.payload, id: `icp-${Date.now()}` });
    },
    updateICP(state, action) {
      const { id, changes } = action.payload;
      const idx = state.list.findIndex((i) => i.id === id);
      if (idx >= 0) state.list[idx] = { ...state.list[idx], ...changes };
    },
    deleteICP(state, action) {
      state.list = state.list.filter((i) => i.id !== action.payload);
    }
  }
});

export const { createICP, updateICP, deleteICP } = icpSlice.actions;
export default icpSlice.reducer;
