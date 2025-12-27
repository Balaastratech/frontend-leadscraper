// src/api/automation.js
// Mock automation API
// TODO: Replace with real endpoints:
//  GET  /api/automation           -> { rules: [...] }
//  GET  /api/automation/:id       -> { rule }
//  POST /api/automation           -> { rule }
//  PATCH /api/automation/:id      -> { rule }
//  POST /api/automation/:id/run   -> { runId, status, logs }
//
// This mock stores rules in-memory (dev only).

import { wait } from "../../../api/utils";

let mockRules = [
  {
    id: "r1",
    name: "Notify high-score leads",
    createdAt: new Date().toISOString(),
    nodes: [
      {
        id: "n1",
        type: "trigger",
        x: 60,
        y: 60,
        data: { event: "lead.created" },
      },
      {
        id: "n2",
        type: "condition",
        x: 260,
        y: 60,
        data: { field: "score", op: ">", value: 75 },
      },
      {
        id: "n3",
        type: "action",
        x: 460,
        y: 60,
        data: {
          type: "send_email",
          to: "sdr@example.com",
          subject: "New high score lead",
        },
      },
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
    ],
  },
];

let mockRuns = [];

export async function listRules() {
  await wait(120);
  return { rules: JSON.parse(JSON.stringify(mockRules)) };
}

export async function getRule(id) {
  await wait(100);
  console.log("API getRule called with id =", id);
  console.log("Available mockRules =", mockRules.map(r => r.id));

  let r = mockRules.find((x) => x.id === id);

  if (!r) {
    // Auto-create missing rule
    r = {
      id,
      name: "Untitled rule",
      createdAt: new Date().toISOString(),
      nodes: [],
      edges: []
    };
    mockRules.push(r);
  }

  return { rule: JSON.parse(JSON.stringify(r)) };
}

export async function createRule(payload) {
  await wait(160);
  const rule = {
    ...payload,
    id: "r" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  mockRules.push(rule);
  return { rule: JSON.parse(JSON.stringify(rule)) };
}

export async function updateRule(id, payload) {
  await wait(160);
  const idx = mockRules.findIndex((x) => x.id === id);
  if (idx === -1) throw { error: "not_found" };
  mockRules[idx] = { ...mockRules[idx], ...payload };
  return { rule: JSON.parse(JSON.stringify(mockRules[idx])) };
}

export async function runRule(id) {
  await wait(200);
  const rule = mockRules.find((r) => r.id === id);
  if (!rule) return { error: "not_found" };

  // create a mock run
  const run = {
    id: "run-" + Date.now(),
    ruleId: id,
    status: "running",
    startedAt: new Date().toISOString(),
    logs: [`Run started for rule ${id}`],
  };
  mockRuns.unshift(run);

  // simulate progress
  setTimeout(() => {
    run.logs.push("Evaluating trigger nodes...");
  }, 300);
  setTimeout(() => {
    run.logs.push("Applying conditions...");
  }, 600);
  setTimeout(() => {
    run.logs.push("Executing actions (mock)...");
  }, 900);
  setTimeout(() => {
    run.status = "completed";
    run.logs.push("Run completed (mock).");
    run.finishedAt = new Date().toISOString();
  }, 1400);

  return { run: JSON.parse(JSON.stringify(run)) };
}

export async function listRuns(ruleId = null) {
  await wait(100);
  const out = ruleId ? mockRuns.filter((r) => r.ruleId === ruleId) : mockRuns;
  return { runs: JSON.parse(JSON.stringify(out)) };
}
