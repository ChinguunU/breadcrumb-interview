import { deleteBook } from "@/api/bookApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });
  return { deleteBook: mutate };
};
