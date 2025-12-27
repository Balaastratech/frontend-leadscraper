import React from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobResults } from "../api/scraper";
import normalizeScrapedLead from "../utils/normalizeScrapedLead";

/**
 * Fetch scraper results for a job
 * - Polls until first results arrive
 * - Supports pagination
 * - Normalizes leads
 */
export default function useScraperResult(
  jobId,
  {
    page = 1,
    pageSize = 25,
    pollInterval = 2000,
  } = {}
) {
  const query = useQuery({
    queryKey: ["scraper-results", jobId, page, pageSize],
    queryFn: () =>
      getJobResults(jobId, {
        page,
        pageSize,
      }),
    enabled: !!jobId,
    refetchInterval: (data) => {
      if (!data) return pollInterval;

      const hasResults =
        Array.isArray(data.results) && data.results.length > 0;

      return hasResults ? false : pollInterval;
    },
    keepPreviousData: true,
  });

  const results = useMemo(() => {
    if (!query.data?.results) return [];
    return query.data.results.map(normalizeScrapedLead);
  }, [query.data]);

  return {
    results,
    total: query.data?.total ?? 0,
    page,
    pageSize,
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
  };
}
