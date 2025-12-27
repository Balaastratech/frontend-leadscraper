import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadsApi from "../../../api/leads";

export function useLeadsQuery(params) {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: async () => {
      const res = await leadsApi.list(params);
      return res.leads;
    },
    keepPreviousData: true,
  });
}

export function useBulkDeleteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids) => leadsApi.bulkDelete(ids),
    onSuccess: () => qc.invalidateQueries(["leads"]),
  });
}

export function useBulkMergeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => leadsApi.bulkUpdate(payload),
    onSuccess: () => qc.invalidateQueries(["leads"]),
  });
}

export function useCsvImportMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file) => leadsApi.bulkImport(file),
    onSuccess: () => qc.invalidateQueries(["leads"]),
  });
}
