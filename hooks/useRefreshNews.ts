"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateAllNews } from "@/lib/invalidateNews";
import { queryKeys } from "@/lib/queryKeys";

const MIN_SPIN_DURATION_MS = 500;

export function useRefreshNews() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const start = Date.now();
      await invalidateAllNews();
      await queryClient.refetchQueries({ queryKey: queryKeys.headlines.all });
      await queryClient.refetchQueries({ queryKey: queryKeys.search.all });
      const elapsed = Date.now() - start;
      if (elapsed < MIN_SPIN_DURATION_MS) {
        await new Promise((r) =>
          setTimeout(r, MIN_SPIN_DURATION_MS - elapsed)
        );
      }
    },
  });

  return {
    refresh: mutation.mutate,
    refreshAsync: mutation.mutateAsync,
    isRefreshing: mutation.isPending,
  };
}
