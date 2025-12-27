import React from "react";
import { ErrorState } from "../../ui/Feedback/ErrorState";

export default function CSVErrorBlock({ message, onRetry }) {
  return (
    <ErrorState
      title="Import Error"
      message={message}
      onRetry={onRetry}
    />
  );
}
