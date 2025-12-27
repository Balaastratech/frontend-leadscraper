import React from "react";
import Modal from "../../../ui/Surface/Modal";
import Text from "../../../ui/Typography/Text";
import useScraperJob from "../hooks/useScraperJob";

export default function JobLogsModal({ jobId, open, onClose }) {
  const { job } = useScraperJob(jobId);

  if (!job) return null;

  return (
    <Modal open={open} onClose={onClose} title="Job Logs">
      <div className="max-h-64 overflow-auto text-xs font-mono bg-gray-50 p-3 rounded">
        {job.logsCount ? (
          <Text size="xs" color="muted">
            Logs available via backend
          </Text>
        ) : (
          <Text size="sm" color="muted">No logs yet</Text>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-600">
        Status: {job.status} · Progress: {job.progress}%
      </div>
    </Modal>
  );
}
