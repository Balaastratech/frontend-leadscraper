// src/features/leads/components/EnrichmentSkeleton.jsx
import React from "react";
import Skeleton from "../../../ui/Feedback/Skeleton";
import Stack from "../../../ui/Layout/Stack";

/**
 * Composition-only skeleton for enrichment tab.
 * Uses Skeleton primitive instances for the shimmer UI.
 */
export default function EnrichmentSkeleton() {
  return (
    <Stack gap="sm">
      <Skeleton height={24} width="25%" radius="sm" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Skeleton height={112} radius="md" />
        <Skeleton height={112} radius="md" />
      </div>
      <Skeleton height={160} radius="md" />
    </Stack>
  );
}
