import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadsApi from "../../api/leads";

export default function useUpdateLeadMutation(id, { toast }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (updates) => {
      const res = await leadsApi.update(id, updates);
      if (res?.error) {
        throw new Error(res.error.message || "Failed to update");
      }
      return res.lead;
    },

    onMutate: async (updates) => {
      await qc.cancelQueries({ queryKey: ["lead", id] });

      const previous = qc.getQueryData(["lead", id]);

      qc.setQueryData(["lead", id], (old) => ({
        ...(old ?? {}),
        ...updates,
      }));

      return { previous };
    },

    onError: (err, _vars, ctx) => {
      if (ctx?.previous !== undefined) {
        qc.setQueryData(["lead", id], ctx.previous);
      }
      toast?.error(err.message ?? "Failed to update lead");
    },

    onSuccess: (data) => {
      qc.setQueryData(["lead", id], data);
      toast?.success("Lead updated");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["lead", id] });
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
