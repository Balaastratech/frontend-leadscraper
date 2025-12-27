import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as scraperApi from "../api/scraper";

/* =========================
   ASYNC THUNKS
========================= */

// enqueue a new scraper job
export const enqueueJob = createAsyncThunk(
  "scraper/enqueueJob",
  async ({ urls, opts }, { rejectWithValue }) => {
    try {
      const { job } = await scraperApi.enqueue(urls, opts);
      return job;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to enqueue job");
    }
  }
);

// fetch all jobs
export const fetchJobsList = createAsyncThunk(
  "scraper/fetchJobsList",
  async (_, { rejectWithValue }) => {
    try {
      const { jobs } = await scraperApi.listJobs();
      return jobs;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load jobs");
    }
  }
);

// fetch single job status
export const fetchJobStatus = createAsyncThunk(
  "scraper/fetchJobStatus",
  async (jobId, { rejectWithValue }) => {
    try {
      const { job } = await scraperApi.status(jobId);
      return job;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch job status");
    }
  }
);

// cancel job
export const cancelJob = createAsyncThunk(
  "scraper/cancelJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const { job } = await scraperApi.cancel(jobId);
      return job;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to cancel job");
    }
  }
);

/* =========================
   INITIAL STATE
========================= */

const initialState = {
  jobs: {
    byId: {},
    allIds: [],
    activeJobId: null,
  },
  results: {
    byJobId: {},
  },
  ui: {
    loading: false,
    error: null,
  },
};

/* =========================
   SLICE
========================= */

const scraperSlice = createSlice({
  name: "scraper",
  initialState,

  reducers: {
    // generic job update (used by mock pipeline)
    updateJob(state, action) {
      const { jobId, changes } = action.payload;
      const job = state.jobs.byId[jobId];
      if (!job) return;

      state.jobs.byId[jobId] = {
        ...job,
        ...changes,
      };
    },

    // append single log entry
    appendJobLog(state, action) {
      const { jobId, message } = action.payload;
      const job = state.jobs.byId[jobId];
      if (!job) return;

      if (!Array.isArray(job.logs)) job.logs = [];
      job.logs.push({
        message,
        ts: new Date().toISOString(),
      });
    },

    // attach scraper results
    setJobResults(state, action) {
      const { jobId, results } = action.payload;
      state.results.byJobId[jobId] = Array.isArray(results)
        ? results
        : [];
    },

    setActiveJob(state, action) {
      state.jobs.activeJobId = action.payload;
    },

    clearScraperError(state) {
      state.ui.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- enqueue ---------- */
      .addCase(enqueueJob.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(enqueueJob.fulfilled, (state, action) => {
        const job = action.payload;
        state.ui.loading = false;

        state.jobs.byId[job.jobId] = {
          ...job,
          status: job.status || "queued",
          progress: 0,
          logs: [],
        };

        state.jobs.allIds.unshift(job.jobId);
        state.jobs.activeJobId = job.jobId;
      })
      .addCase(enqueueJob.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      })

      /* ---------- fetch list ---------- */
      .addCase(fetchJobsList.fulfilled, (state, action) => {
        const jobs = action.payload || [];

        jobs.forEach((job) => {
          state.jobs.byId[job.jobId] = {
            ...state.jobs.byId[job.jobId],
            ...job,
            logs: state.jobs.byId[job.jobId]?.logs || [],
          };

          if (!state.jobs.allIds.includes(job.jobId)) {
            state.jobs.allIds.push(job.jobId);
          }
        });
      })

      /* ---------- fetch status ---------- */
      .addCase(fetchJobStatus.fulfilled, (state, action) => {
        const job = action.payload;
        if (!job) return;

        state.jobs.byId[job.jobId] = {
          ...state.jobs.byId[job.jobId],
          ...job,
        };
      })

      /* ---------- cancel ---------- */
      .addCase(cancelJob.fulfilled, (state, action) => {
        const job = action.payload;
        if (!job) return;

        state.jobs.byId[job.jobId] = {
          ...state.jobs.byId[job.jobId],
          ...job,
          status: "cancelled",
        };
      });
  },
});

export const {
  updateJob,
  appendJobLog,
  setJobResults,
  setActiveJob,
  clearScraperError,
} = scraperSlice.actions;

export default scraperSlice.reducer;
