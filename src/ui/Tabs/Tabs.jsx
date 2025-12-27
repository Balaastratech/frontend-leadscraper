import React from "react";

export function Tabs({ tabs, active, onChange, className = "" }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`
            px-4 py-1.5 rounded-md
            ${active === t ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}
          `}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
