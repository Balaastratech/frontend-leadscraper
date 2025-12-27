// src/components/tabs/LeadEnrichmentTab.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrichmentSources,
  runLeadEnrichment,
  fetchEnrichmentRuns,
  setRunningLocal,
} from "../../enrichment/store/enrichmentSlice";
import EnrichmentActionCard from "./EnrichmentActionCard";
import EnrichmentSkeleton from "./EnrichmentSkeleton";
import { updateLeadLocal } from "../../leads/store/leadsSlice";

/* UI Primitives */
import Stack from "../../../ui/Layout/Stack";
import Grid from "../../../ui/Layout/Grid";
import Card from "../../../ui/Surface/Card";
import Title from "../../../ui/Typography/Title";
import Text from "../../../ui/Typography/Text";
import Select from "../../../ui/Form/Select";
import Checkbox from "../../../ui/Form/Checkbox";
import Button from "../../../ui/Form/Button";
import Textarea from "../../../ui/Form/Textarea";

/**
 * LeadEnrichmentTab
 * - Visuals use primitives only.
 * - All business logic and redux interactions preserved exactly.
 *
 * Props:
 * - lead
 */
export default function LeadEnrichmentTab({ lead }) {
  const dispatch = useDispatch();
  const { sources, runs, loading, running } = useSelector(
    (s) =>
      s.enrichment || { sources: [], runs: [], loading: false, running: {} }
  );
  const authUser = useSelector((s) => s.auth.user);

  const [selectedSource, setSelectedSource] = useState(null);
  const [force, setForce] = useState(false);
  const [localNote, setLocalNote] = useState("");
  const [doing, setDoing] = useState(false);
  const isAdmin = authUser && authUser.role === "admin";

  useEffect(() => {
    dispatch(fetchEnrichmentSources());
  }, [dispatch]);

  useEffect(() => {
    if (lead && lead.id) {
      dispatch(fetchEnrichmentRuns({ leadId: lead.id }));
    }
  }, [dispatch, lead && lead.id]);

  useEffect(() => {
    if (sources && sources.length && !selectedSource)
      setSelectedSource(sources[0].id);
  }, [sources]);

  const leadRunning = running && running[lead?.id];

  const recentRuns = useMemo(
    () =>
      (runs || []).filter((r) => r.leadId === (lead && lead.id)),
    [runs, lead]
  );

  const onRun = async () => {
    if (!lead || !lead.id) return;
    if (!selectedSource) return;
    setDoing(true);
    dispatch(setRunningLocal({ leadId: lead.id, val: true }));

    const optimisticFields = {
      enrichment_preview: {
        source: selectedSource,
        note: `Preview enriched (${selectedSource}) at ${new Date().toLocaleTimeString()}`,
      },
    };

    dispatch(updateLeadLocal({ id: lead.id, changes: optimisticFields }));

    try {
      const resultAction = await dispatch(
        runLeadEnrichment({ leadId: lead.id, sourceId: selectedSource, force })
      );
      if (resultAction.error) {
        throw resultAction.error;
      }
      const result = resultAction.payload;
      dispatch(
        updateLeadLocal({
          id: lead.id,
          changes: {
            enriched: result.enrichedFields,
            enrichment_preview: undefined,
          },
        })
      );
      dispatch(fetchEnrichmentRuns({ leadId: lead.id }));
    } catch (err) {
      dispatch(
        updateLeadLocal({
          id: lead.id,
          changes: { enrichment_preview: undefined },
        })
      );
      console.error("Enrichment failed", err);
      alert(
        "Enrichment failed: " +
          (err && err.message ? err.message : "Unknown error (mock)")
      );
    } finally {
      dispatch(setRunningLocal({ leadId: lead.id, val: false }));
      setDoing(false);
    }
  };

  const onSaveNote = () => {
    if (!lead || !lead.id) return;
    dispatch(
      updateLeadLocal({ id: lead.id, changes: { enrichment_note: localNote } })
    );
    setLocalNote("");
  };

  const canRun = isAdmin || (authUser && authUser.role === "user");

  if (!sources || sources.length === 0) {
    return <EnrichmentSkeleton />;
  }

  return (
    <Stack space="lg" aria-live="polite" flex={false}>
      {/* Header */}
      <Stack direction="horizontal" align="center" justify="between">
        <Title size="lg">Enrichment</Title>
        <Text size="sm" color="muted">
          Sources available: {sources.length}
        </Text>
      </Stack>

      {/* Section 1 — Run Enrichment */}
      <Card padding="lg" variant="outline" radius="xl" shadow="sm">
        <Stack space="md" flex={false}>
          <div>
            <Text size="sm" weight="medium" className="mb-2">
              Select source
            </Text>
            <Select
              aria-label="enrichment source"
              value={selectedSource || ""}
              onChange={(val) => setSelectedSource(val)}
              options={sources.map((s) => ({ value: s.id, label: s.name }))}
            />
            <Text size="xs" color="muted" className="mt-2">
              Choose a provider. UI is mocked. Replace API in{" "}
              <code>src/api/enrichment.js</code>.
            </Text>
          </div>

          <Checkbox
            id="enrich-force"
            checked={force}
            onChange={(v) => setForce(v)}
            label="Force refresh (ignore cache)"
            disabled={!canRun}
          />

          <div>
            <Button
              onClick={onRun}
              disabled={!canRun || doing || leadRunning}
              size="md"
            >
              {leadRunning || doing ? "Running…" : "Run Enrichment"}
            </Button>

            {!canRun && (
              <Text size="xs" color="muted" className="mt-2">
                You don't have permission.
              </Text>
            )}
          </div>

          <Grid cols={{ base: 1, md: 2 }} gap="4" className="pt-3">
            <EnrichmentActionCard
              title="Auto-enrich (fast)"
              description="Fast enrichment using combined providers."
              disabled={!canRun}
            >
              <Button
                size="sm"
                variant="subtle"
                onClick={() => {
                  setSelectedSource("clearbit");
                  onRun();
                }}
                disabled={!canRun}
              >
                Run
              </Button>
            </EnrichmentActionCard>

            <EnrichmentActionCard
              title="Deep-profile"
              description="Fetches company + social signals. Slower, richer."
              disabled={!canRun}
            >
              <Button
                size="sm"
                variant="subtle"
                onClick={() => {
                  setSelectedSource("linkedin");
                  onRun();
                }}
                disabled={!canRun}
              >
                Run
              </Button>
            </EnrichmentActionCard>
          </Grid>
        </Stack>
      </Card>

      {/* Section 2 — Results */}
      <Card padding="lg" variant="outline" radius="xl" shadow="sm">
        <Stack space="sm" flex={false}>
          <Stack direction="horizontal" justify="between" align="center">
            <Stack>
              <Text size="sm" weight="medium">
                Recent enrichment runs
              </Text>
              <Text size="xs" color="muted">
                Last results for this lead
              </Text>
            </Stack>
            <Text size="xs" color="muted">
              {recentRuns.length} shown
            </Text>
          </Stack>

          <div className="max-h-[300px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {recentRuns.length === 0 && (
                <div className="col-span-full">
                  <Text size="sm" color="muted" className="p-4">
                    No runs yet. Run enrichment to see results.
                  </Text>
                </div>
              )}

              {recentRuns.map((r) => (
                <Card
                  key={r.enrichmentId}
                  padding="md"
                  variant="subtle"
                  radius="lg"
                  className="h-full"
                >
                  <Stack>
                    <Stack
                      direction="horizontal"
                      justify="between"
                      align="center"
                    >
                      <Text size="sm" weight="medium">
                        {r.source}
                      </Text>
                      <Text size="xs" color="muted">
                        {new Date(r.createdAt).toLocaleString()}
                      </Text>
                    </Stack>

                    <div className="mt-1 text-xs text-gray-700 space-y-1">
                      {Object.entries(r.enrichedFields)
                        .slice(0, 4)
                        .map(([k, v]) => (
                          <div key={k}>
                            <strong>{k}:</strong> {String(v)}
                          </div>
                        ))}
                    </div>
                  </Stack>
                </Card>
              ))}
            </div>
          </div>

          {/* Merged Fields */}
          <div>
            <Text size="sm" weight="medium" className="mb-2">
              Preview / Merged fields
            </Text>
            <Text size="xs" color="muted">
              Shows latest merged enrichment fields.
            </Text>

            <Grid cols={{ base: 1, md: 2 }} gap="4" className="mt-3">
              <Card padding="sm" variant="subtle" radius="md">
                <Text size="xs" color="muted">
                  Company
                </Text>
                <Text size="sm" className="mt-1">
                  {lead?.enriched?.company ||
                    lead?.enrichment_preview?.note ||
                    "-"}
                </Text>
              </Card>

              <Card padding="sm" variant="subtle" radius="md">
                <Text size="xs" color="muted">
                  LinkedIn
                </Text>
                <Text size="sm" className="mt-1">
                  {lead?.enriched?.linkedin || "-"}
                </Text>
              </Card>

              <Card padding="sm" variant="subtle" radius="md">
                <Text size="xs" color="muted">
                  Company size
                </Text>
                <Text size="sm" className="mt-1">
                  {lead?.enriched?.companySize || "-"}
                </Text>
              </Card>

              <Card padding="sm" variant="subtle" radius="md">
                <Text size="xs" color="muted">
                  Email verified
                </Text>
                <Text size="sm" className="mt-1">
                  {lead?.enriched?.email_verified?.toString() || "-"}
                </Text>
              </Card>
            </Grid>
          </div>
        </Stack>
      </Card>

      {/* Section 3 — Notes */}
      <Card padding="lg" variant="outline" radius="xl" shadow="sm">
        <Text size="sm" weight="medium" className="mb-2">
          Quick note
        </Text>

        <Textarea
          rows={3}
          placeholder="Save a short note about enrichment or manual findings"
          value={localNote}
          onChange={(e) => setLocalNote(e.target.value)}
        />

        <div className="mt-2">
          <Button onClick={onSaveNote} variant="ghost" size="sm">
            Save note
          </Button>
        </div>
      </Card>
    </Stack>
  );
}
