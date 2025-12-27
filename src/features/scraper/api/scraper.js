import { wait } from "../../../api/utils";
import { v4 as uuid } from "uuid";

import {
  listJobs as listJobsFromQueue,
  enqueueJob as addJobToQueue,
  getJob as getJobFromQueue,
  updateJob,
  getResults as getMockResults,
} from "../moke/jobQueue";

import { cancelMockPipeline } from "../moke/pipelineEngine";

const USE_MOCK = true;

/**
 * Normalize backend job → frontend-safe job
 */
function normalizeJob(job) {
  if (!job) return null;

  return {
    id: job.id,
    status: job.status,
    progress: job.progress ?? 0,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt || job.finishedAt || job.createdAt,
    config: {
      urls: job.urls,
      opts: job.opts,
    },
    logsCount: job.logs?.length || 0,
    resultCount: job.resultCount || 0,
  };
}

/**
 * POST /scraper/jobs
 */
export async function enqueueJob({ urls = [], opts = {} }) {
  await wait(200);

  if (!USE_MOCK) {
    throw new Error("Real backend not wired");
  }

  const job = {
    id: uuid(),
    urls: Array.isArray(urls) ? urls : [],
    opts,
    status: "queued",
    progress: 0,
    logs: ["Job created"],
    createdAt: new Date().toISOString(),
    updatedAt: null,
    finishedAt: null,
  };

  addJobToQueue(job);

  return {
    job: normalizeJob(job),
  };
}

/**
 * GET /scraper/jobs
 */
export async function listJobs() {
  await wait(150);

  if (!USE_MOCK) {
    throw new Error("Real backend not wired");
  }

  return {
    jobs: listJobsFromQueue().map(normalizeJob),
  };
}

/**
 * GET /scraper/jobs/:id
 */
export async function getJob(jobId) {
  await wait(150);

  if (!jobId) throw new Error("jobId required");

  const job = getJobFromQueue(jobId);
  if (!job) {
    return { error: "not_found" };
  }

  return {
    job: normalizeJob(job),
  };
}

/**
 * POST /scraper/jobs/:id/cancel
 * 🔴 MUST stop pipeline
 */
export async function cancelJob(jobId) {
  await wait(150);

  if (!jobId) throw new Error("jobId required");

  const job = getJobFromQueue(jobId);
  if (!job) {
    return { error: "not_found" };
  }

  // stop running pipeline timer
  cancelMockPipeline(jobId);

  const updated = updateJob(jobId, {
    status: "cancelled",
    finishedAt: new Date().toISOString(),
  });

  return {
    job: normalizeJob(updated),
  };
}

/**
 * GET /scraper/jobs/:id/results
 */
export async function getJobResults(
  jobId,
  { page = 1, pageSize = 25 } = {}
) {
  await wait(200);

  if (!jobId) throw new Error("jobId required");

  if (!USE_MOCK) {
    throw new Error("Real backend not wired");
  }

  const allResults = getMockResults(jobId) || [];

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    results: allResults.slice(start, end),
    total: allResults.length,
    page,
    pageSize,
  };
}
