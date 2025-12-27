import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "../api/scraper";

/**
 * Fetch a single scraper job
 * Polls only while active
 */
export default function useScraperJob(jobId, { pollInterval = 2000 } = {}) {
  const query = useQuery({
    queryKey: ["scraper-job", jobId],
    queryFn: () => getJob(jobId),
    enabled: !!jobId,
    refetchInterval: (data) => {
      const job = data?.job;
      if (!job) return false;

      const active =
        job.status === "queued" || job.status === "running";

      return active ? pollInterval : false;
    },
  });

  const job = query.data?.job || null;

  return {
    job,
    progress: job?.progress ?? 0,
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
  };
}
