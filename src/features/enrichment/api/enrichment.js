// src/api/enrichment.js
// Mock enrichment API client
// TODO: Replace with real endpoints:
//  POST /api/leads/:id/enrich        -> { leadId, enrichedFields, source, createdAt }
//  POST /api/leads/:id/enrich/batch  -> { results: [...] }
//  GET  /api/enrichment/sources      -> { sources: [...] }
// Expected shapes documented in comments below.

import { wait } from "../../../api/utils";

const MOCK_SOURCES = [
  { id: "clearbit", name: "Clearbit (mock)", description: "Company + person enrichment" },
  { id: "hunter", name: "Hunter (mock)", description: "Email lookup + verification" },
  { id: "linkedin", name: "LinkedIn Scrape (mock)", description: "Profile enrichment" },
];

// Simple in-memory "history" of enrichment runs (dev-only)
let enrichmentRuns = [];

/**
 * List enrichment sources (mock)
 */
export async function listSources() {
  await wait(120);
  return { sources: JSON.parse(JSON.stringify(MOCK_SOURCES)) };
}

/**
 * Run enrichment for a single lead (mock)
 * @param {string} leadId
 * @param {object} opts { sourceId, force }
 * @returns { job-like object with result }
 *
 * Real endpoint idea:
 * POST /api/leads/:leadId/enrich
 * body: { sourceId: 'clearbit', force: true }
 * response: { id: 'enr-123', leadId, status: 'completed', enrichedFields: { companySize: '51-200' }, createdAt }
 */
export async function runEnrichment(leadId, opts = {}) {
  await wait(300);

  // create a mock "result" with some plausible fields
  const result = {
    enrichmentId: "enr-" + Date.now() + "-" + Math.floor(Math.random() * 999),
    leadId,
    source: opts.sourceId || "clearbit",
    status: "completed",
    enrichedFields: {
      company: "Acme " + Math.floor(Math.random() * 100),
      companySize: ["1-10", "11-50", "51-200", "201-1000"][
        Math.floor(Math.random() * 4)
      ],
      linkedin: `https://linkedin.com/in/mock-${leadId}`,
      twitter: `@mock_${leadId.slice(-4)}`,
      email_verified: Math.random() > 0.3,
    },
    createdAt: new Date().toISOString(),
  };

  // store in history
  enrichmentRuns.unshift(result);

  // simulate occasional failure for testing rollback (10% chance)
  if (Math.random() < 0.1 && !opts.force) {
    // simulate error shape
    throw { error: "enrichment_failed", message: "Provider rate limit (mock)" };
  }

  return { result };
}

/**
 * Get enrichment runs history (mock)
 */
export async function listRuns(leadId = null) {
  await wait(120);
  const filtered = leadId ? enrichmentRuns.filter((r) => r.leadId === leadId) : enrichmentRuns;
  return { runs: JSON.parse(JSON.stringify(filtered)) };
}
