import { useBookFilters } from "@/contexts/BookFiltersContext";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";

export type BookPaginationProps = {
  totalPages: number;
};

export const BookPagination = ({ totalPages }: BookPaginationProps) => {
  const { currentPage, setCurrentPage } = useBookFilters();

  useEffect(() => {
    if (currentPage > totalPages)
      setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages, setCurrentPage, currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextIsDisabled = currentPage === totalPages;
  const prevIsDisabled = currentPage === 1;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        disabled={prevIsDisabled}
      >
        <ChevronLeftIcon />
        Previous
      </Button>

      <span className="text-sm whitespace-nowrap">
        {currentPage} of {totalPages}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={nextIsDisabled}
      >
        Next
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
