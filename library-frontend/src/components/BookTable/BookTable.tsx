import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
} from "../ui/table";
import { Spinner } from "../ui/spinner";
import { useBooksQuery } from "@/hooks/useBooksQuery";
import { BookPagination } from "../BookPagination";
import { BookRow } from "../BookRow";
import { AddBookDialog } from "../AddBookDialog";
import { SearchBar } from "../SearchBar/SearchBar";
import { BookFiltersProvider } from "@/contexts/BookFiltersProvider";

const BookTableContent = () => {
  const { data, isPending } = useBooksQuery();

  return (
    <div className="p-4 pt-4">
      <div className="flex justify-between pb-2">
        <SearchBar />
        {data && data.totalPages > 1 && (
          <BookPagination totalPages={data.totalPages} />
        )}
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((book) => (
              <BookRow key={book.id} book={book} />
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex justify-end pt-4">
        <AddBookDialog />
      </div>
    </div>
  );
};

export const BookTable = () => {
  return (
    <BookFiltersProvider pageSize={8}>
      <BookTableContent />
    </BookFiltersProvider>
  );
};
