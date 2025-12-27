import React from "react";

/**
 * Message bubble primitive for chat messages.
 *
 * Props:
 * - from: 'user' | 'agent'
 * - children
 * - className
 * - meta (object)
 */
export default function MessageBubble({
  from = "user",
  children,
  className = "",
  meta = {},
}) {
  const isAgent = from !== "user";
  const alignClass = isAgent ? "justify-start" : "justify-end";
  const bubbleClass = isAgent
    ? "bg-gray-100 text-gray-900"
    : "bg-indigo-600 text-white";

  return (
    <div className={`flex ${alignClass} p-1`}>
      <div className={`${bubbleClass} rounded-lg p-3 max-w-[75%] ${className}`}>
        {children}
        {meta && meta.timestamp && (
          <div className="text-xs text-gray-400 mt-1">{meta.timestamp}</div>
        )}
      </div>
    </div>
  );
}
