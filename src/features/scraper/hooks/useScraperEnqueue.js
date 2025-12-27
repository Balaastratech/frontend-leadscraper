import React from "react";
import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueJob } from "../api/scraper";
import { runMockPipeline } from "../moke/pipelineEngine";

/**
 * Enqueue scraper job.
 * - React Query for server state
 * - Local state for form only
 * - Mock pipeline auto-starts
 */
export default function useScraperEnqueue({ onEnqueued } = {}) {
  const queryClient = useQueryClient();

  // form state
  const [input, setInput] = useState("");
  const [runImmediately, setRunImmediately] = useState(true);
  const [depth, setDepth] = useState(1);
  const [followExternal, setFollowExternal] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [error, setError] = useState(null);

  const parseUrls = useCallback((text) => {
    return text
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, []);

  const mutation = useMutation({
    mutationFn: ({ urls, opts }) => enqueueJob({ urls, opts }),
    onSuccess: (data) => {
      const job = data.job;

      // refresh job list
      queryClient.invalidateQueries({ queryKey: ["scraper-jobs"] });

      // start mock pipeline automatically
      runMockPipeline(job.id);

      setInput("");
      setAdvancedOpen(false);

      if (onEnqueued) onEnqueued(job);
    },
    onError: (err) => {
      setError(err.message || "Failed to enqueue job");
    },
  });

  const submit = useCallback(
    (e) => {
      if (e?.preventDefault) e.preventDefault();
      setError(null);

      const urls = parseUrls(input);

      if (!urls.length) {
        setError("Enter at least one valid URL or domain");
        return;
      }

      mutation.mutate({
        urls,
        opts: {
          depth,
          followExternal,
          runImmediately,
        },
      });
    },
    [input, depth, followExternal, runImmediately, parseUrls, mutation]
  );

  return {
    state: {
      input,
      runImmediately,
      depth,
      followExternal,
      advancedOpen,
      submitting: mutation.isPending,
      error,
    },
    handlers: {
      setInput,
      setRunImmediately,
      setDepth,
      setFollowExternal,
      setAdvancedOpen,
      submit,
    },
  };
}
