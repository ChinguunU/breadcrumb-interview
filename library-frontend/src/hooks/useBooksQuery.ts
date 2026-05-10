import { searchBooks } from "@/api/bookApi";
import { useBookFilters } from "@/contexts/BookFiltersContext";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = () => {
  const { searchQuery, currentPage, pageSize } = useBookFilters();

  const { data, isPending } = useQuery({
    queryKey: ["books", searchQuery, currentPage, pageSize],
    queryFn: () =>
      searchBooks({
        query: searchQuery,
        pageNumber: currentPage,
        pageSize: pageSize,
      }),
  });

  return { data, isPending };
};
