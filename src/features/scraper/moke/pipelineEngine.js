import {
  updateJob,
  attachResults,
  getJob,
} from "./jobQueue";

const timers = {};

/**
 * Simulate backend scraper pipeline
 */
export function runMockPipeline(jobId) {
  if (timers[jobId]) return;

  let progress = 0;
  let stageIndex = 0;

  const stages = [
    "queued",
    "searching",
    "scraping",
    "extracting",
    "enriching",
  ];

  updateJob(jobId, {
    status: "running",
    progress: 0,
    startedAt: new Date().toISOString(),
  });

  timers[jobId] = setInterval(() => {
    const job = getJob(jobId);

    // 🛑 HARD STOP ON CANCEL OR MISSING JOB
    if (!job || job.status === "cancelled") {
      clearInterval(timers[jobId]);
      delete timers[jobId];
      return;
    }

    progress += 10 + Math.floor(Math.random() * 10);
    if (progress > 100) progress = 100;

    if (stageIndex < stages.length && progress >= stageIndex * 20) {
      updateJob(jobId, {
        stage: stages[stageIndex],
      });
      stageIndex++;
    }

    updateJob(jobId, {
      progress,
      status: "running",
    });

    if (progress >= 100) {
      clearInterval(timers[jobId]);
      delete timers[jobId];

      attachResults(jobId);

      updateJob(jobId, {
        status: "completed",
        progress: 100,
        finishedAt: new Date().toISOString(),
        resultCount: 3,
      });
    }
  }, 900);
}

/**
 * Cancel running pipeline
 */
export function cancelMockPipeline(jobId) {
  const timer = timers[jobId];
  if (!timer) return;

  clearInterval(timer);
  delete timers[jobId];
}
