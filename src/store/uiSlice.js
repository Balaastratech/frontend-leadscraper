// src/store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toast: null, // { message, type, undoCallback }
    commandMenuOpen: false,
  },
  reducers: {
    openCommandMenu(state) {
      state.commandMenuOpen = true;
    },
    closeCommandMenu(state) {
      state.commandMenuOpen = false;
    },
    showToast(state, action) {
      state.toast = {
        duration: 5000,
        ...action.payload,
      };
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { showToast, clearToast, openCommandMenu, closeCommandMenu } =
  uiSlice.actions;

export default uiSlice.reducer;
