import { useMemo } from "react";
import { pipelineDb } from "../../../../mock/db/pipeline.db";

export function usePipelineColumns(leads, stages) {
  return useMemo(() => {
    if (!stages.length || !leads.length) return {};

    const map = {};
    stages.forEach((s) => {
      map[s.id] = { name: s.name, items: [] };
    });

    map.unmapped = { name: "Unmapped", items: [] };

    leads.forEach((lead) => {
      const stageId =
        pipelineDb.getIdByName(lead.status) || "unmapped";
      map[stageId]?.items.push(lead);
    });

    return map;
  }, [leads, stages]);
}
