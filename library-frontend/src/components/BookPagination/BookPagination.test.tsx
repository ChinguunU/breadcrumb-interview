import { BookFiltersProvider } from "@/contexts/BookFiltersProvider";
import { render, screen } from "@testing-library/react";
import { BookPagination } from "./BookPagination";
import userEvent from "@testing-library/user-event";

const renderWithProviders = (ui: React.ReactNode) =>
  render(<BookFiltersProvider>{ui}</BookFiltersProvider>);

describe("BookPagination", () => {
  it("renders pagination controls correctly", () => {
    renderWithProviders(<BookPagination totalPages={20} />);

    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByText("1 of 20")).toBeInTheDocument();
  });

  it("should disable previous button on first page", () => {
    renderWithProviders(<BookPagination totalPages={10} />);

    const prevButton = screen.getByRole("button", { name: "Previous" });

    expect(prevButton).toBeDisabled();
  });

  it("should not be able to navigate beyond the first page", async () => {
    renderWithProviders(<BookPagination totalPages={10} />);

    const prevButton = screen.getByRole("button", { name: "Previous" });

    expect(screen.getByText("1 of 10")).toBeInTheDocument();

    await userEvent.click(prevButton);

    expect(screen.getByText("1 of 10")).toBeInTheDocument();
  });

  it("should enable previous button on subsequent pages", async () => {
    renderWithProviders(<BookPagination totalPages={10} />);

    await userEvent.click(screen.getByRole("button", { name: "Next" }));

    const prevButton = screen.getByRole("button", { name: "Previous" });

    expect(prevButton).not.toBeDisabled();
  });

  it("should disable next button on last page", async () => {
    renderWithProviders(<BookPagination totalPages={3} />);

    const nextButton = screen.getByRole("button", { name: "Next" });

    await userEvent.click(nextButton);
    await userEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it("should not be able to navigate beyond the last page", async () => {
    renderWithProviders(<BookPagination totalPages={3} />);

    const nextButton = screen.getByRole("button", { name: "Next" });

    await userEvent.click(nextButton);
    await userEvent.click(nextButton);

    expect(screen.getByText("3 of 3")).toBeInTheDocument();

    await userEvent.click(nextButton);

    expect(screen.getByText("3 of 3")).toBeInTheDocument();
  });
});
