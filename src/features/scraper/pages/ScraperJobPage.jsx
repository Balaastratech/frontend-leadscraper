import React from "react";
import { useParams } from "react-router-dom";

import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import ProgressBar from "../../../design/primitives/ProgressBar";
import Paper from "../../../ui/Surface/Paper";
import Card from "../../../ui/Surface/Card";

import useScraperJob from "../hooks/useScraperJob";
import useScraperResult from "../hooks/useScraperResult";
import ScraperResultList from "../components/ScraperResultList";

function StatusBadge({ status }) {
  const map = {
    queued: "bg-gray-200 text-gray-700",
    running: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded capitalize ${map[status]}`}
    >
      {status}
    </span>
  );
}

export default function ScraperJobPage() {
  const { jobId } = useParams();

  const { job, progress, loading } = useScraperJob(jobId);
  const { results, loading: resultsLoading } = useScraperResult(jobId);

  if (loading) {
    return (
      <Text size="sm" color="muted">
        Loading job…
      </Text>
    );
  }

  if (!job) {
    return (
      <Text size="sm" color="muted">
        Job not found.
      </Text>
    );
  }

  const urlCount = job.config?.urls?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Title size="lg">Scraper Job</Title>
        <Text size="sm" color="muted">
          Job ID: {job.id}
        </Text>
      </div>

      {/* Job summary */}
      <Card padding="md">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <Text weight="medium">
              {urlCount} URL{urlCount !== 1 ? "s" : ""} queued
            </Text>
            <Text size="xs" color="muted">
              Created {new Date(job.createdAt).toLocaleString()}
            </Text>
          </div>

          <StatusBadge status={job.status} />
        </div>

        {/* Progress */}
        <div className="mt-4">
          <ProgressBar value={progress} />
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            <span>{progress}%</span>
            {job.status === "running" && <span>Processing…</span>}
            {job.status === "completed" && <span>Completed</span>}
            {job.status === "cancelled" && <span>Cancelled</span>}
          </div>
        </div>
      </Card>

      {/* Logs */}
      <div>
        <Title size="base">Logs</Title>
        <Paper className="max-w-xl mt-2 p-3">
          <Text size="sm" color="muted">
            Logs are handled by the backend pipeline.
            <br />
            Use the queue view for live updates.
          </Text>
        </Paper>
      </div>

      {/* Results */}
      <div>
        <Title size="base">Scraped Results</Title>

        {job.status !== "completed" && (
          <Text size="sm" color="muted" className="mt-2">
            Results will appear once the job completes.
          </Text>
        )}

        {job.status === "completed" && (
          <>
            {resultsLoading ? (
              <Text size="sm" color="muted" className="mt-2">
                Loading results…
              </Text>
            ) : (
              <ScraperResultList results={results} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
