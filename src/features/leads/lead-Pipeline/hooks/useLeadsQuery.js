import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as leadsApi from "../../api/leads";
import { useSelector } from "react-redux";
import {
  selectLeadFilters,
  selectGlobalSearch,
} from "../../store/selectors";

export function useLeadsQuery() {
  const filters = useSelector(selectLeadFilters);
  const search = useSelector(selectGlobalSearch);

  return useQuery({
    queryKey: ["leads", filters, search],
    queryFn: () =>
      leadsApi.list({
        filters,
        search,
        limit: 100,
      }),
    keepPreviousData: true,
    select: (res) => res.leads || [],
  });
}
