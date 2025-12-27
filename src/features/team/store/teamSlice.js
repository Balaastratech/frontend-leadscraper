// src/store/teamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as teamApi from "../api/team";

export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  return await teamApi.listTeam();
});

export const inviteUser = createAsyncThunk("team/inviteUser", async (email) => {
  return await teamApi.invite(email);
});

export const changeRole = createAsyncThunk(
  "team/changeRole",
  async ({ id, role }) => {
    await teamApi.updateRole(id, role);
    return { id, role };
  }
);

export const fetchAudit = createAsyncThunk("team/fetchAudit", async () => {
  return await teamApi.getAuditLog();
});

const teamSlice = createSlice({
  name: "team",
  initialState: {
    members: [],
    audit: [],
    loading: false,
  },
  reducers: {},
  extraReducers(b) {
    b.addCase(fetchTeam.pending, (s) => { s.loading = true; });
    b.addCase(fetchTeam.fulfilled, (s, a) => {
      s.loading = false;
      s.members = a.payload.team;
    });

    b.addCase(inviteUser.fulfilled, (s, a) => {
      s.members.push(a.payload.entry);
    });

    b.addCase(changeRole.fulfilled, (s, a) => {
      const x = s.members.find((m) => m.id === a.payload.id);
      if (x) x.role = a.payload.role;
    });

    b.addCase(fetchAudit.fulfilled, (s, a) => {
      s.audit = a.payload.log;
    });
  }
});

export default teamSlice.reducer;
