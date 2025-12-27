// src/features/ai/components/AISummarizer.jsx
// Feature component: composition only. Uses ui primitives and useAISummarizer hook.
// No Tailwind here.

import React from "react";
import Card from "../../../ui/Surface/Card";
import Textarea from "../../../ui/Form/Textarea";
import Select from "../../../ui/Form/Select";
import Button from "../../../ui/Form/Button";
import Skeleton, { SkeletonLine } from "../../../ui/Feedback/Skeleton";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Row from "../../../ui/Layout/Row";
import useAISummarizer from "../hooks/useAISummarizer";
import { motion } from "framer-motion";

export default function AISummarizer({ leadId }) {
  const { state, handlers, aiState } = useAISummarizer(leadId);
  const { input, model, showAdvanced, copied } = state;
  const { onChangeInput, setModel, toggleAdvanced, onSummarize, onClear, onCopy, attachToLead } = handlers;
  const ai = aiState;

  return (
    <Card variant="default" className="p-4 rounded-2xl">
      <form onSubmit={onSummarize} className="space-y-3">
        <div className="flex items-start gap-3">
          <Textarea
            aria-label="Text or URL to summarize"
            placeholder="Paste text, paste a URL, or type a short description to get a summary..."
            value={input}
            onChange={onChangeInput}
            rows={4}
          />
          <div style={{ width: 144 }}>
            <label className="text-xs text-gray-600">Model</label>
            <Select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              options={[
                { value: "mock-clarity-0.1", label: "mock-clarity-0.1" },
                { value: "mock-depth-0.2", label: "mock-depth-0.2 (longer)" },
              ]}
            />
          </div>
        </div>

        <Row align="center" gap={2}>
          <Button type="submit" variant="primary" aria-label="Generate summary">
            {ai.loading ? "Summarizing…" : "Summarize"}
          </Button>

          <Button type="button" onClick={onClear} variant="default" aria-label="Clear input and summary">
            Clear
          </Button>

          <Button
            type="button"
            onClick={toggleAdvanced}
            variant="link"
            aria-expanded={showAdvanced}
          >
            {showAdvanced ? "Hide advanced" : "Advanced"}
          </Button>

          {leadId && ai.lastSummary && (
            <Button type="button" onClick={attachToLead} variant="attach">
              Attach to lead
            </Button>
          )}
        </Row>

        {showAdvanced && (
          <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
            Advanced options are mocked. In production you can select tone,
            length, or use system prompts.
          </div>
        )}
      </form>

      <div className="mt-4">
        {ai.loading && (
          <Skeleton>
            <SkeletonLine className="h-6 bg-gray-200 rounded w-3/4" />
            <SkeletonLine className="h-20 bg-gray-200 rounded" />
          </Skeleton>
        )}

        {!ai.loading && ai.lastSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.16 }}
          >
            <Card variant="subtle">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">AI Summary</div>
                  <div className="text-xs text-gray-500">
                    Model: {ai.lastSummary.model} · Tokens:{" "}
                    {ai.lastSummary.tokensUsed}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={onCopy} variant="smallOutline">
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <pre className="whitespace-pre-wrap mt-3 text-sm">
                {ai.lastSummary.summary}
              </pre>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Recommendations</div>
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {ai.lastSummary.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs text-gray-500">
                    Quick completions / snippets
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    {ai.lastSummary.completions.map((c, i) => (
                      <div key={i} className="p-2 border rounded bg-white">
                        <div className="text-sm">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Meta: {JSON.stringify(ai.lastSummary.meta)}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
