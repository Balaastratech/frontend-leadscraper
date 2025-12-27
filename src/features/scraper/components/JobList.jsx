import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "../../../ui/Surface/Card";
import Button from "../../../ui/Form/Button";
import Text from "../../../ui/Typography/Text";
import ProgressBar from "../../../design/primitives/ProgressBar";
import useScraperList from "../hooks/useScraperList";
import { cancelJob } from "../api/scraper";

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

export default function JobList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { jobs, loading } = useScraperList();

  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const cancelMutation = useMutation({
    mutationFn: cancelJob,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["scraper-jobs"] }),
  });

  if (loading) {
    return (
      <Text size="sm" color="muted">
        Loading jobs…
      </Text>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center py-6">
        <Text size="sm" color="muted">
          No scraper jobs yet.
        </Text>
        <Text size="xs" color="muted">
          Enqueue a crawl to see progress here.
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => {
        const isActive = job.status === "running";
        const isFinished =
          job.status === "completed" || job.status === "cancelled";

        return (
          <Card key={job.id} padding="md">
            <div className="flex justify-between gap-4">
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <Text weight="medium" className="truncate">
                    {job.config?.urls?.[0] || "Scraper job"}
                  </Text>
                  <StatusBadge status={job.status} />
                </div>

                <Text size="xs" color="muted">
                  Created {new Date(job.createdAt).toLocaleString()}
                </Text>

                <div className="mt-2">
                  <ProgressBar value={job.progress} />
                  <Text size="xs" color="muted" className="mt-1">
                    {job.progress}% {isActive ? "processing…" : ""}
                  </Text>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/app/scraper/job/${job.id}`)
                  }
                >
                  Open
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  disabled={!isActive || cancelMutation.isPending}
                  onClick={() => setConfirmCancelId(job.id)}
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* Cancel confirmation */}
            {confirmCancelId === job.id && (
              <div className="mt-3 border-t pt-3 flex items-center justify-between text-sm">
                <Text>
                  Cancel this job? Progress will be lost.
                </Text>

                <div className="flex gap-2">
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setConfirmCancelId(null)}
                  >
                    Keep running
                  </Button>

                  <Button
                    size="xs"
                    variant="danger"
                    onClick={() => {
                      cancelMutation.mutate(job.id);
                      setConfirmCancelId(null);
                    }}
                  >
                    Confirm cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
