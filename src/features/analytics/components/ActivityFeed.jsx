import React from "react";
import Card from "../../../ui/Surface/Card";
import Text from "../../../ui/Typography/Text";

const MOCK = [
  { id: "a1", text: "Sarah Lane created lead ‘DigitalFlow’", ts: Date.now() - 1000 * 60 * 30 },
  { id: "a2", text: "Scraper job completed for orbit.com", ts: Date.now() - 1000 * 60 * 60 },
  { id: "a3", text: "Bulk enrichment added titles to 19 leads", ts: Date.now() - 1000 * 60 * 60 * 5 },
  { id: "a4", text: "Rule ‘Notify high-score leads’ executed (mock)", ts: Date.now() - 1000 * 60 * 60 * 8 }
];

export default function ActivityFeed({ items = MOCK }) {
  return (
    <Card className="p-4" aria-label="Activity">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Activity</div>
        <div className="text-xs text-gray-500">Recent</div>
      </div>

      <ul className="mt-3 space-y-2 text-sm">
        {items.map((m) => (
          <li key={m.id} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <div className="text-gray-800">{m.text}</div>
              <div className="text-xs text-gray-400">{new Date(m.ts).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
