// src/store/shortcutsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shortcutsSlice = createSlice({
  name: "shortcuts",
  initialState: {
    enabled: true,
  },
  reducers: {
    toggleShortcuts(state) {
      state.enabled = !state.enabled;
    },
    enableShortcuts(state) {
      state.enabled = true;
    },
    disableShortcuts(state) {
      state.enabled = false;
    },
  },
});

export const {
  toggleShortcuts,
  enableShortcuts,
  disableShortcuts,
} = shortcutsSlice.actions;

export default shortcutsSlice.reducer;
