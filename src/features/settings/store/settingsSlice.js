// src/store/settingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/settings";

export const loadSettings = createAsyncThunk("settings/load", api.getSettings);
export const addKey = createAsyncThunk("settings/addKey", api.createApiKey);
export const removeKey = createAsyncThunk("settings/removeKey", api.deleteApiKey);
export const addWebhook = createAsyncThunk("settings/addWebhook", api.saveWebhook);
export const removeWebhook = createAsyncThunk("settings/removeWebhook", api.deleteWebhook);
export const saveSmtp = createAsyncThunk("settings/saveSmtp", api.saveSmtp);
export const testSmtp = createAsyncThunk("settings/testSmtp", api.testSmtp);
export const testWebhook = createAsyncThunk("settings/testWebhook", api.testWebhook);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    apiKeys: [],
    webhooks: [],
    smtp: null,
    loading: false,
    testResult: null
  },
  reducers: {},
  extraReducers(b) {
    b.addCase(loadSettings.pending, (s) => { s.loading = true; });
    b.addCase(loadSettings.fulfilled, (s, a) => {
      s.loading = false;
      s.apiKeys = a.payload.apiKeys;
      s.webhooks = a.payload.webhooks;
      s.smtp = a.payload.smtp;
    });

    b.addCase(addKey.fulfilled, (s, a) => { s.apiKeys.push(a.payload.key); });
    b.addCase(removeKey.fulfilled, (s, a) => {
      const id = a.meta.arg;
      s.apiKeys = s.apiKeys.filter((k) => k.id !== id);
    });

    b.addCase(addWebhook.fulfilled, (s, a) => { s.webhooks.push(a.payload.webhook); });
    b.addCase(removeWebhook.fulfilled, (s, a) => {
      s.webhooks = s.webhooks.filter((w) => w.id !== a.meta.arg);
    });

    b.addCase(saveSmtp.fulfilled, (s, a) => { s.smtp = a.payload.smtp; });
    b.addCase(testSmtp.fulfilled, (s, a) => { s.testResult = a.payload; });
    b.addCase(testWebhook.fulfilled, (s, a) => { s.testResult = a.payload; });
  }
});

export default settingsSlice.reducer;
