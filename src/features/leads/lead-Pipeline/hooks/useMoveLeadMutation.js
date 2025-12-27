import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as leadsApi from "../../api/leads";

export function useMoveLeadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      leadsApi.update(id, { status }),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });

      const prev = queryClient.getQueryData(["leads"]);

      queryClient.setQueryData(["leads"], (old = []) =>
        old.map((l) =>
          l.id === id ? { ...l, status } : l
        )
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["leads"], ctx.prev);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
