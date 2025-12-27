import React from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { listJobs } from "../api/scraper";

/**
 * Scraper job list with smart polling
 * - React Query owns server state
 * - Polls only while jobs are active
 * - WebSocket-ready via query invalidation
 */
export default function useScraperList({ pollInterval = 2000 } = {}) {
  const query = useQuery({
    queryKey: ["scraper-jobs"],
    queryFn: listJobs,
    refetchInterval: (data) => {
      if (!data?.jobs) return pollInterval;

      const hasActive = data.jobs.some(
        (j) => j.status === "queued" || j.status === "running"
      );

      return hasActive ? pollInterval : false;
    },
    staleTime: 0,
  });

  const jobs = useMemo(() => {
    return query.data?.jobs ?? [];
  }, [query.data]);

  const activeJobs = useMemo(() => {
    return jobs.filter(
      (j) => j.status === "queued" || j.status === "running"
    );
  }, [jobs]);

  return {
    jobs,
    activeJobs,
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
  };
}
