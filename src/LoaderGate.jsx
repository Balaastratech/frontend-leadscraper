// src/LoaderGate.jsx
import React from "react";

/*
  Wraps app sections with a global loading state.
  Replace with skeletons per feature when needed.
*/

export default function LoaderGate({ loading, children }) {
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full flex justify-center py-6 text-gray-600"
      >
        Loading…
      </div>
    );
  }

  return children;
}
