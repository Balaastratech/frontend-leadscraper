import React, { useMemo } from "react";
import Stack from "../../../ui/Layout/Stack";
import Button from "../../../ui/Form/Button";
import Textarea from "../../../ui/Form/Textarea";
import Text from "../../../ui/Typography/Text";
import useScraperEnqueue from "../hooks/useScraperEnqueue";

const MAX_URLS_WARNING = 50;

export default function ScraperForm({ onEnqueued }) {
  const { state, handlers } = useScraperEnqueue({ onEnqueued });

  const {
    input,
    runImmediately,
    depth,
    followExternal,
    advancedOpen,
    submitting,
    error,
  } = state;

  const {
    setInput,
    setRunImmediately,
    setDepth,
    setFollowExternal,
    setAdvancedOpen,
    submit,
  } = handlers;

  // derived UI state
  const urls = useMemo(() => {
    return input
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [input]);

  const urlCount = urls.length;
  const isInvalid = urlCount === 0;

  return (
    <form onSubmit={submit} aria-label="Scraper enqueue form">
      <Stack gap="md">
        {/* URL input */}
        <label className="block">
          <Text size="sm" weight="medium" className="mb-1">
            URLs or domains
          </Text>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="https://example.com&#10;example.org"
            aria-invalid={isInvalid}
          />

          <div className="mt-1 flex justify-between text-xs">
            <Text color={isInvalid ? "danger" : "muted"}>
              {urlCount === 0
                ? "Enter at least one URL or domain"
                : `${urlCount} URL${urlCount > 1 ? "s" : ""} detected`}
            </Text>

            {urlCount > MAX_URLS_WARNING && (
              <Text color="warning">
                Large crawl. Expect longer runtime.
              </Text>
            )}
          </div>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={submitting || isInvalid}
          >
            {submitting ? "Enqueuing…" : "Enqueue Crawl"}
          </Button>

          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            className="text-sm underline"
            aria-expanded={advancedOpen}
          >
            {advancedOpen ? "Hide advanced" : "Advanced options"}
          </button>
        </div>

        {/* Advanced options */}
        {advancedOpen && (
          <div className="border rounded p-3 bg-gray-50 text-sm space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={runImmediately}
                onChange={(e) => setRunImmediately(e.target.checked)}
              />
              Run immediately after enqueue
            </label>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                Depth
                <select
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[1, 2, 3].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={followExternal}
                  onChange={(e) => setFollowExternal(e.target.checked)}
                />
                Follow external links
              </label>
            </div>

            <Text size="xs" color="muted">
              Higher depth increases crawl time significantly. Use with care.
            </Text>
          </div>
        )}

        {/* Error */}
        {error && (
          <Text size="sm" color="danger">
            {error}
          </Text>
        )}
      </Stack>
    </form>
  );
}
