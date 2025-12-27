import React from "react";
import Card from "../Surface/Card";

export default function TeamAudit({ audit }) {
  return (
    <Card padding="md" radius="lg" shadow="sm">
      <div className="text-sm font-semibold mb-3">Audit Log</div>

      <ul className="space-y-1 text-sm">
        {audit.map((a) => (
          <li key={a.id} className="border-b pb-1 text-gray-600">
            {a.event} — <span className="text-gray-400">{a.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
