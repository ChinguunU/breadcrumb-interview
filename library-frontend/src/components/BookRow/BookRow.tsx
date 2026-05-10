import type { Book } from "@/api/types";
import { TableCell, TableRow } from "../ui/table";
import { useAvailabilityToggleMutation } from "@/hooks/useAvailabilityToggleMutation";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { useDeleteBookMutation } from "@/hooks/useDeleteBookMutation";

export type BookRowProps = {
  book: Book;
};

export const BookRow = ({ book }: BookRowProps) => {
  const { toggle } = useAvailabilityToggleMutation();
  const { deleteBook } = useDeleteBookMutation();

  return (
    <TableRow>
      <TableCell>
        {book.title} by {book.author}
      </TableCell>
      <TableCell>{book.owner}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => toggle(book.id)}
            variant={book.isAvailable ? "default" : "outline"}
          >
            {book.isAvailable ? "Borrow" : "Return"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => deleteBook(book.id)}
            aria-label="delete book"
          >
            <XIcon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
