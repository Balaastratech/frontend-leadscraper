// src/features/leads/components/EnrichmentActionCard.jsx
import React from "react";
import ActionCard from "../../../ui/Feedback/ActionCard";
import Button from "../../../ui/Form/Button";

/**
 * Thin wrapper kept inside feature layer.
 * No styling here. Composition only.
 *
 * Props:
 * - title, description, children, disabled, onRun
 */
export default function EnrichmentActionCard({ title, description, children, disabled, onRun }) {
  return (
    <ActionCard title={title} description={description} disabled={disabled}>
      {children ? children : (
        <Button size="sm" variant="ghost" disabled={disabled} onClick={onRun}>
          Run
        </Button>
      )}
    </ActionCard>
  );
}
