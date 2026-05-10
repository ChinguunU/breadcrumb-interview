import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toggleBookAvailability, deleteBook } from "@/api/bookApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookRow } from "./BookRow";

vi.mock("@/api/bookApi", () => ({
  deleteBook: vi.fn(),
  toggleBookAvailability: vi.fn(),
}));

const mockedToggleBookAvailability = vi.mocked(toggleBookAvailability);
const mockedDeleteBook = vi.mocked(deleteBook);

const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <table>
        <tbody>{ui}</tbody>
      </table>
    </QueryClientProvider>,
  );
};

const mockBook = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  owner: "Test Owner",
  isAvailable: true,
};

describe("BookRow", () => {
  it("renders book information correctly", () => {
    renderWithProviders(<BookRow book={mockBook} />);

    expect(screen.getByText("Test Book by Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Owner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Borrow" })).toBeInTheDocument();
  });

  it("calls toggle availability when the button is clicked", async () => {
    mockedToggleBookAvailability.mockResolvedValueOnce({ isAvailable: false });

    renderWithProviders(<BookRow book={mockBook} />);

    const toggleButton = screen.getByRole("button", { name: "Borrow" });
    userEvent.click(toggleButton);

    await waitFor(() => {
      expect(mockedToggleBookAvailability).toHaveBeenCalledWith(1);
    });
  });

  it("should call deleteBook when the delete button is clicked", async () => {
    mockedDeleteBook.mockResolvedValueOnce(null);

    renderWithProviders(<BookRow book={mockBook} />);

    const deleteButton = screen.getByRole("button", { name: /delete book/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedDeleteBook).toHaveBeenCalledWith(1);
    });
  });

  it.each([
    { isAvailable: true, buttonText: "Borrow" },
    { isAvailable: false, buttonText: "Return" },
  ])(
    "renders correct button text based on availability",
    ({ isAvailable, buttonText }) => {
      renderWithProviders(<BookRow book={{ ...mockBook, isAvailable }} />);
      const button = screen.getByRole("button", { name: buttonText });
      expect(button).toBeInTheDocument();
    },
  );
});
