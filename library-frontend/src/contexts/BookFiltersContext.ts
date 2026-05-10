import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export const BookFiltersContext = createContext<
  | {
      currentPage: number;
      setCurrentPage: Dispatch<SetStateAction<number>>;
      searchQuery: string;
      setSearchQuery: (query: string) => void;
      pageSize: number;
    }
  | undefined
>(undefined);

export const useBookFilters = () => {
  const context = useContext(BookFiltersContext);

  if (!context) {
    throw new Error("useBookFilters must be used within a BookFiltersProvider");
  }

  return context;
};
