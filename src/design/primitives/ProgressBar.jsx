// src/components/ProgressBar.jsx
import React from "react";

/**
 * Simple accessible progress bar
 * Props:
 * - value: number 0-100
 * - height optional
 */

export default function ProgressBar({ value = 0, height = 8, ...rest }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={pct}
      className="w-full bg-gray-200 rounded-full overflow-hidden"
      style={{ height }}
      {...rest}
    >
      <div
        className="h-full transition-all duration-300 ease-linear bg-gradient-to-r from-indigo-500 to-blue-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
