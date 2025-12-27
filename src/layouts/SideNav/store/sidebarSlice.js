// src/store/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "sidebar",
  initialState: { open: true },
  reducers: {
    toggle(state) {
      state.open = !state.open;
    },
    close(state) {
      state.open = false;
    },
    open(state) {
      state.open = true;
    },
  },
});

export const { toggle, close, open } = slice.actions;
export default slice.reducer;
