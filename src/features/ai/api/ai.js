// src/api/ai.js
// Mock AI client for summarization and simple suggestions.
// TODO: Replace with real AI service calls (OpenAI, Anthropic, Azure OpenAI, etc).
// Example real endpoint shapes:
// POST /api/ai/summarize  -> { summary: string, recommendations: string[], tokensUsed: number, model: string }
// POST /api/ai/complete  -> { text: string, usage: {...} }
// Webhook/streaming note: For long inputs implement server-side streaming or SSE to forward partial tokens.

import { wait } from "../../../api/utils";

/**
 * Mock summarizer
 * Accepts text or url. Returns a realistic-feeling summary + recommendations.
 */
export async function summarize(textOrUrl, opts = {}) {
  // simulate variable latency
  await wait(250 + Math.floor(Math.random() * 500));

  // Basic input normalization
  const seed = String(textOrUrl || "").slice(0, 120);
  const words = seed.split(/\s+/).filter(Boolean).length || 10;

  // Fake token usage estimate
  const tokensUsed = Math.min(1200, Math.max(40, Math.floor(words * 1.8 + Math.random() * 60)));

  // Build a short summary by trimming input and adding mock lines
  const short = typeof textOrUrl === "string"
    ? (textOrUrl.length > 240 ? textOrUrl.slice(0, 240) + "…" : textOrUrl)
    : "No input provided";

  const summary = [
    `Summary (mocked) — ${new Date().toLocaleString()}`,
    "",
    `Input excerpt: "${short}"`,
    "",
    "Key points:",
    "- Likely high intent based on contact signals.",
    "- Company fit: SaaS / mid-market (mock inference).",
    "- Recommended next step: call + qualification checklist.",
  ].join("\n");

  const recommendations = [
    "Call within 48 hours and mention the recent product update.",
    "Prioritize leads with score > 75 for outbound SDRs.",
    "Use LinkedIn profile enrichment before sending personalized outreach.",
    "If email unverified, run email verification provider.",
  ];

  // Add AI-assisted autocompletion suggestions (small list)
  const completions = [
    `Cold email subject suggestion: "Quick question about ${seed.slice(0, 30)}"`,
    `One-line intro: "Noticed you at ${seed.split(/\s/)[0] || "your company"} — quick idea to try."`,
  ];

  // Return a shape that is practical for UI consumption
  return {
    model: opts.model || "mock-clarity-0.1",
    summary,
    recommendations,
    completions,
    tokensUsed,
    meta: {
      inputLength: String(textOrUrl || "").length,
      createdAt: new Date().toISOString(),
    },
  };
}
