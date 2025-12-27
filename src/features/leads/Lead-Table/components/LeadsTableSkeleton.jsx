import React, { useMemo } from "react";
import Skeleton from "../../../../ui/Feedback/Skeleton";

/**
 * Skeleton tailored for virtualized page view.
 */
export default function LeadsTableSkeleton({ columns = [], pageSize = 10 }) {
  const colWidths = useMemo(() => {
    return columns.map((col) => {
      if (col.width) return col.width;
      if (col.minWidth) return `minmax(${col.minWidth}, 1fr)`;
      return "1fr";
    });
  }, [columns]);

  if (!columns || columns.length === 0) {
    return (
      <div className="space-y-4 w-full overflow-x-auto">
        <div className="bg-surface rounded-xl border border-muted shadow-sm p-6">
          <Skeleton height="4" width="48" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <div className="bg-surface rounded-xl border border-muted shadow-sm">
        <div className="p-4 border-b border-muted">
          <div style={{ display: "grid", gridTemplateColumns: colWidths.join(" ") }}>
            {columns.map((col) => (
              <div key={col.key} className="py-2 px-3">
                <Skeleton height="4" width={col.key === "name" ? "20" : "12"} />
              </div>
            ))}
          </div>
        </div>

        <div>
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="px-4 py-3 border-b border-muted" style={{ display: "grid", gridTemplateColumns: colWidths.join(" ") }}>
              {columns.map((col) => (
                <div key={col.key} className="py-2 px-3">
                  <Skeleton height="4" width={col.key === "name" ? "32" : "12"} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
