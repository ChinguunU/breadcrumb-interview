import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { searchBooks } from "@/api/bookApi";
import { BookTable } from "./BookTable";

vi.mock("@/api/bookApi", () => ({
  searchBooks: vi.fn(),
}));

const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

const mockedSearchBooks = vi.mocked(searchBooks);

const mockBooks = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Book ${i + 1}`,
  author: `Author ${i + 1}`,
  owner: `Owner ${i + 1}`,
  isAvailable: i % 2 === 0,
}));

describe("BookTable", () => {
  beforeEach(() => {
    mockedSearchBooks.mockResolvedValue({
      items: mockBooks.slice(0, 8),
      pageNumber: 1,
      pageSize: 8,
      totalPages: 2,
      totalItems: mockBooks.length,
    });
  });

  it("renders the table correctly", async () => {
    renderWithProviders(<BookTable />);

    expect(
      await screen.findByRole("columnheader", { name: "Book" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Owner" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Availability" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/search books:/i));
    expect(screen.getByText("1 of 2")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Book" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(9);
  });

  it("should render spinner while loading", () => {
    renderWithProviders(<BookTable />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should not render pagination controls when there is only one page", async () => {
    mockedSearchBooks.mockResolvedValueOnce({
      items: mockBooks.slice(0, 8),
      pageNumber: 1,
      pageSize: 8,
      totalPages: 1,
      totalItems: 8,
    });
    renderWithProviders(<BookTable />);

    // Assert data is loaded
    expect(await screen.findByText("Owner 1")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Previous" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
  });
});
