import { useState } from "react";
import { BookFiltersContext } from "./BookFiltersContext";

export type BookFiltersProviderProps = {
  children: React.ReactNode;
  pageSize?: number;
};

export const BookFiltersProvider = ({
  children,
  pageSize = 8,
}: BookFiltersProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQueryRaw] = useState("");

  const setSearchQuery = (query: string) => {
    setSearchQueryRaw(query);
    setCurrentPage(1);
  };

  return (
    <BookFiltersContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        pageSize,
      }}
    >
      {children}
    </BookFiltersContext.Provider>
  );
};
