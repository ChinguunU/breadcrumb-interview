import { createBook } from "@/api/bookApi";
import type { CreateBookParams } from "@/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateBookMutationOptions = {
  onSuccess?: () => void;
};

export const useCreateBookMutation = ({
  onSuccess,
}: UseCreateBookMutationOptions) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: (params: CreateBookParams) => createBook(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onSuccess?.();
    },
  });
  return { createBook: mutate, isError, isPending };
};
