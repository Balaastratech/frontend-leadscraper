/**
 * In-memory mock job store
 * Simulates backend persistence
 */

import resultsData from "./results.json";

let jobs = [];
let resultsByJobId = {}; // jobId -> results array

export function enqueueJob(job) {
  jobs.unshift(job);
  return job;
}

export function listJobs() {
  return [...jobs];
}

export function getJob(jobId) {
  return jobs.find((j) => j.id === jobId) || null;
}

export function updateJob(jobId, changes) {
  const idx = jobs.findIndex((j) => j.id === jobId);
  if (idx === -1) return null;

  jobs[idx] = {
    ...jobs[idx],
    ...changes,
    updatedAt: new Date().toISOString(),
  };

  return jobs[idx];
}

/**
 * Results API
 */
export function attachResults(jobId) {
  resultsByJobId[jobId] = resultsData;
}

export function getResults(jobId) {
  return resultsByJobId[jobId] || [];
}

/**
 * Dev helper
 */
export function resetQueue() {
  jobs = [];
  resultsByJobId = {};
}
