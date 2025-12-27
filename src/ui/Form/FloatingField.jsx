import React from "react";

export default function FloatingField({ label, children }) {
  return (
    <div className="relative w-full">
      <label
        className="
          absolute px-1 text-xs text-muted 
          -top-2 left-3 bg-surface 
          pointer-events-none
        "
      >
        {label}
      </label>
      {children}
    </div>
  );
}
