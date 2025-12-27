import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadsApi from "../../api/leads";

export default function useDeleteLeadMutation(id, { toast }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await leadsApi.remove(id);
      if (res?.error) throw new Error(res.error.message || "Failed to delete");
      return res;
    },

    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["lead", id] });
      const previous = qc.getQueryData(["lead", id]);

      qc.setQueryData(["lead", id], null);

      return { previous };
    },

    onError: (err, _vars, ctx) => {
      if (ctx?.previous !== undefined) {
        qc.setQueryData(["lead", id], ctx.previous);
      }
      toast?.error(err.message ?? "Failed to delete lead");
    },

    onSuccess: () => {
      toast?.success("Lead deleted");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["lead", id] });
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
