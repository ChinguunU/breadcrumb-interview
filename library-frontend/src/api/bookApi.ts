import { fetchClient } from "./fetchClient";
import type {
  Book,
  CreateBookParams,
  PagedResult,
  SearchBooksParams,
} from "./types";

const searchBooks = async (params: SearchBooksParams) => {
  const queryParams = new URLSearchParams({
    query: params.query,
    pageNumber: params.pageNumber.toString(),
    pageSize: params.pageSize.toString(),
  });

  return await fetchClient<PagedResult<Book>>(
    `/books?${queryParams.toString()}`,
  );
};

const toggleBookAvailability = async (bookId: number) => {
  return await fetchClient<{ isAvailable: boolean }>(
    `/books/${bookId}/toggle-availability`,
    {
      method: "PATCH",
    },
  );
};

const createBook = async (params: CreateBookParams) => {
  return await fetchClient<Book>("/books", {
    method: "POST",
    body: JSON.stringify(params),
  });
};

const deleteBook = async (bookId: number) => {
  return await fetchClient(`/books/${bookId}`, {
    method: "DELETE",
  });
};

export { searchBooks, toggleBookAvailability, createBook, deleteBook };
