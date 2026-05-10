import { toggleBookAvailability } from "@/api/bookApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAvailabilityToggleMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => toggleBookAvailability(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });
  return { toggle: mutate };
};
