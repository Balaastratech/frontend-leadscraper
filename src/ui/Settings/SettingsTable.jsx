import React from "react";

/**
 * Small table primitive used by settings.
 * Keeps spacing and table styles in one place.
 */
export default function SettingsTable({ columns, rows, emptyMessage }) {
  return (
    <table className="w-full text-sm mt-4">
      <thead className="text-gray-500">
        <tr>
          {columns.map((c, i) => (
            <th key={i} className={c.className || ""}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((r) => (
            <tr key={r.key} className="border-t">
              {columns.map((c, i) => (
                <td key={i} className={c.tdClass || ""}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-gray-400 py-4">
              {emptyMessage || "No items"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
