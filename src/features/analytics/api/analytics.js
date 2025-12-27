// src/api/analytics.js
// Mock analytics API
// TODO: Replace with real endpoints:
//  GET /api/analytics/overview  -> { leadsToday, pipeline, scoreDistribution, aiInsights }
//  GET /api/analytics/clusters  -> { clusters: [{label, size, color, members: [...]}, ...] }

import { wait } from "../../../api/utils";

const MOCK_OVERVIEW = {
  leadsToday: 14,
  pipeline: {
    new: 22,
    contacted: 10,
    qualified: 8,
    won: 3,
    lost: 2
  },
  scoreDistribution: [42, 51, 63, 71, 80, 90],
  aiInsights: [
    "Most high-scoring leads come from SaaS segment.",
    "Contacted leads with >70 score convert at 3× rate."
  ]
};

const MOCK_CLUSTERS = [
  { label: "SaaS • High score", size: 34, color: "#6366F1", members: ["l3", "l7", "l9"] },
  { label: "E-commerce • Mid score", size: 21, color: "#F97316", members: ["l4", "l11"] },
  { label: "Agency • Low score", size: 12, color: "#10B981", members: ["l6", "l12"] }
];

export async function getOverview() {
  await wait(120);
  return JSON.parse(JSON.stringify(MOCK_OVERVIEW));
}

export async function getClusters() {
  await wait(160);
  return { clusters: JSON.parse(JSON.stringify(MOCK_CLUSTERS)) };
}
