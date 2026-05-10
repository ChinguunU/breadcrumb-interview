export type Book = {
  id: number;
  title: string;
  author: string;
  owner: string;
  isAvailable: boolean;
};

export type PagedResult<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type SearchBooksParams = {
  query: string;
  pageNumber: number;
  pageSize: number;
};

export type CreateBookParams = {
  title: string;
  author: string;
  owner: string;
};

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message?: string,
    errors?: Record<string, string[]>,
  ) {
    super(message ?? `HTTP ${status}`);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
  }
}
