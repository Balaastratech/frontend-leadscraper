// src/store/helpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as helpApi from "../api/helpdesk";

/**
 * Thunks
 */
export const fetchConversations = createAsyncThunk("help/fetchConversations", async () => {
  const res = await helpApi.listConversations();
  return res.conversations;
});

export const postHelpMessage = createAsyncThunk("help/postHelpMessage", async (payload) => {
  // payload: { conversationId?, subject?, text, files }
  const res = await helpApi.postMessage(payload);
  return res;
});

export const uploadAttachment = createAsyncThunk("help/uploadAttachment", async (payload) => {
  // payload: { name, blobSize }
  const res = await helpApi.uploadAttachment(payload);
  return res.attachment;
});

export const fetchConversation = createAsyncThunk("help/fetchConversation", async (id) => {
  const res = await helpApi.getConversation(id);
  return res.conversation;
});

const slice = createSlice({
  name: "help",
  initialState: {
    conversations: [],
    current: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrent(state) { state.current = null; }
  },
  extraReducers(b) {
    b.addCase(fetchConversations.fulfilled, (s, a) => { s.conversations = a.payload; });
    b.addCase(fetchConversation.fulfilled, (s, a) => { s.current = a.payload; });
    b.addCase(postHelpMessage.fulfilled, (s, a) => {
      const conv = a.payload.conversation;
      // update in list and current
      const idx = s.conversations.findIndex((c) => c.id === conv.id);
      if (idx >= 0) s.conversations[idx] = conv;
      else s.conversations.unshift(conv);
      if (s.current && s.current.id === conv.id) s.current = conv;
    });
    b.addCase(uploadAttachment.fulfilled, (s, a) => {
      // no-op here; component uses result
    });
  }
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
