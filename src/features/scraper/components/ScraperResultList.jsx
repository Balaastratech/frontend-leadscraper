import React, { useMemo, useState } from "react";
import normalizeScrapedLead from "../utils/normalizeScrapedLead";
import Button from "../../../ui/Form/Button";
import Text from "../../../ui/Typography/Text";

function ConfidenceBar({ value }) {
  const pct = Math.round((value || 0) * 100);

  return (
    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
      <div
        className="h-full bg-green-500"
        style={{ width: `${pct}%` }}
        aria-label={`Confidence ${pct}%`}
      />
    </div>
  );
}

export default function ScraperResultList({ results = [], onImport }) {
  const [sortByConfidence, setSortByConfidence] = useState(true);

  const normalized = useMemo(() => {
    const leads = results.map(normalizeScrapedLead);

    if (!sortByConfidence) return leads;

    return [...leads].sort(
      (a, b) => (b.confidence || 0) - (a.confidence || 0)
    );
  }, [results, sortByConfidence]);

  if (!normalized.length) {
    return (
      <div className="p-4 border rounded text-sm text-gray-500">
        No scraped results yet.
        <div className="mt-1 text-xs">
          Results will appear after the job completes.
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Text weight="medium">Scraped Leads</Text>
          <Text size="xs" color="muted">
            {normalized.length} lead{normalized.length !== 1 ? "s" : ""}
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSortByConfidence((v) => !v)}
            className="text-xs underline"
          >
            {sortByConfidence
              ? "Sorted by confidence"
              : "Original order"}
          </button>

          {onImport && (
            <Button
              size="sm"
              onClick={() => onImport(normalized)}
            >
              Import {normalized.length}
            </Button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {normalized.map((lead) => (
          <div
            key={lead.id}
            className="p-3 border rounded bg-gray-50 space-y-1"
          >
            <div className="flex justify-between items-start gap-2">
              <Text weight="medium">
                {lead.name || "Unnamed lead"}
              </Text>

              {typeof lead.confidence === "number" && (
                <Text size="xs" color="muted">
                  {(lead.confidence * 100).toFixed(0)}%
                </Text>
              )}
            </div>

            {typeof lead.confidence === "number" && (
              <ConfidenceBar value={lead.confidence} />
            )}

            <div className="text-sm space-y-0.5">
              {lead.email && <div>Email: {lead.email}</div>}
              {lead.phone && <div>Phone: {lead.phone}</div>}
              {lead.website && (
                <div>
                  Website:{" "}
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    {lead.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
