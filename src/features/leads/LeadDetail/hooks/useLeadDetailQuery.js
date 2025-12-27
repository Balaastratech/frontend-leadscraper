import { useQuery } from "@tanstack/react-query";
import * as leadsApi from "../../api/leads";

function sanitizeLead(raw = {}) {
  return {
    id: raw.id,
    name: raw.name ?? "",
    email: raw.email ?? "",
    company: raw.company ?? "",
    status: raw.status ?? "unknown",
    score: raw.score ?? 0,
    ...raw,
  };
}

export default function useLeadDetailQuery(id) {
  return useQuery({
    queryKey: ["lead", id],
    queryFn: async () => {
      if (!id) return null;

      const res = await leadsApi.get(id);

      if (res?.error) {
        throw new Error(res.error.message || "Failed to fetch lead");
      }

      if (!res?.lead) return null;

      return sanitizeLead(res.lead);
    },
    enabled: Boolean(id),
    retry: 1,
    staleTime: 30_000,
  });
}
