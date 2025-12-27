import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as pipelineApi from "../../api/pipeline";

export function usePipelineStagesQuery() {
  return useQuery({
    queryKey: ["pipeline-stages"],
    queryFn: pipelineApi.getStages,
    staleTime: Infinity,
    select: (res) => res.stages || [],
  });
}
