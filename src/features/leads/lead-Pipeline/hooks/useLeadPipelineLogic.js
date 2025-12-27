import React from "react";
import { useEffect, useState } from "react";
import { pipelineDb } from "../../../../mock/db/pipeline.db";
import { usePipelineStagesQuery } from "./usePipelineStagesQuery";
import { useLeadsQuery } from "./useLeadsQuery";
import { useMoveLeadMutation } from "./useMoveLeadMutation";

export function useLeadPipelineLogic(toast) {
  const stagesQuery = usePipelineStagesQuery();
  const leadsQuery = useLeadsQuery();
  const moveLead = useMoveLeadMutation();

  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stagesQuery.isLoading || leadsQuery.isLoading) {
      setLoading(true);
      return;
    }

    if (stagesQuery.error || leadsQuery.error) {
      setError("Failed to load pipeline");
      setLoading(false);
      return;
    }

    const stages = stagesQuery.data || [];
    const leads = leadsQuery.data || [];

    const map = {};
    stages.forEach((stage) => {
      map[stage.id] = { name: stage.name, items: [] };
    });

    map.unmapped = { name: "Unmapped", items: [] };

    leads.forEach((lead) => {
      const stageId =
        pipelineDb.getIdByName(lead.status) || "unmapped";
      map[stageId]?.items.push(lead);
    });

    setColumns(map);
    setLoading(false);
  }, [
    stagesQuery.isLoading,
    stagesQuery.error,
    stagesQuery.data,
    leadsQuery.isLoading,
    leadsQuery.error,
    leadsQuery.data,
  ]);

  async function onDragEnd({ source, destination }) {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    if (!sourceColumn || !destColumn) return;

    const lead = sourceColumn.items[source.index];
    if (!lead) return;

    const newStatus = destColumn.name;

    const nextColumns = structuredClone(columns);

    nextColumns[source.droppableId].items.splice(source.index, 1);
    nextColumns[destination.droppableId].items.splice(
      destination.index,
      0,
      { ...lead, status: newStatus }
    );

    setColumns(nextColumns);

    try {
      await moveLead.mutateAsync({
        id: lead.id,
        status: newStatus,
      });
      toast.success(`Lead moved to ${newStatus}`);
    } catch {
      setColumns(columns);
      toast.error("Failed to update lead status");
    }
  }

  return {
    columns,
    loading,
    error,
    totalLeads: leadsQuery.data?.length ?? 0,
    onDragEnd,
  };
}
