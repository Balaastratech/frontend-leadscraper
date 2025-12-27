// src/store/automationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/automation";

export const fetchRules = createAsyncThunk(
  "automation/fetchRules",
  async () => {
    const res = await api.listRules();
    return res.rules;
  }
);

export const fetchRule = createAsyncThunk(
  "automation/fetchRule",
  async (id) => {
    const res = await api.getRule(id);
    return res.rule;
  }
);

export const createRule = createAsyncThunk(
  "automation/createRule",
  async (payload) => {
    const res = await api.createRule(payload);
    return res.rule;
  }
);

export const saveRule = createAsyncThunk(
  "automation/saveRule",
  async ({ id, payload }) => {
    const res = await api.updateRule(id, payload);
    return res.rule;
  }
);

export const runRule = createAsyncThunk("automation/runRule", async (id) => {
  const res = await api.runRule(id);
  return res.run;
});

export const fetchRuns = createAsyncThunk(
  "automation/fetchRuns",
  async (ruleId) => {
    const res = await api.listRuns(ruleId);
    return res.runs;
  }
);

const slice = createSlice({
  name: "automation",
  initialState: {
    rules: [],
    current: null,
    runs: [],
    loading: false,
    error: null,
  },
  reducers: {
    // local optimistic updates for canvas moves
    updateCurrentLocal(state, action) {
      state.current = { ...state.current, ...action.payload };
    },
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers(b) {
    b.addCase(fetchRules.fulfilled, (s, a) => {
      s.rules = a.payload;
    });
    b.addCase(fetchRule.fulfilled, (s, a) => {
      console.log("fetchRule.fulfilled payload =", a.payload);
      s.current = a.payload;
    });
    b.addCase(createRule.fulfilled, (s, a) => {
      s.rules.unshift(a.payload);
      s.current = a.payload;
    });
    b.addCase(saveRule.fulfilled, (s, a) => {
      const idx = s.rules.findIndex((r) => r.id === a.payload.id);
      if (idx >= 0) s.rules[idx] = a.payload;
      if (s.current && s.current.id === a.payload.id) s.current = a.payload;
    });
    b.addCase(runRule.fulfilled, (s, a) => {
      s.runs.unshift(a.payload);
    });
    b.addCase(fetchRuns.fulfilled, (s, a) => {
      s.runs = a.payload;
    });
   
  },
});

export const { updateCurrentLocal, clearCurrent } = slice.actions;
export default slice.reducer;
