import { useBookFilters } from "./BookFiltersContext";
import { BookFiltersProvider } from "./BookFiltersProvider";
import { renderHook, act } from "@testing-library/react";

const wrapper =
  (pageSize?: number) =>
  ({ children }: { children: React.ReactNode }) => (
    <BookFiltersProvider pageSize={pageSize}>{children}</BookFiltersProvider>
  );

describe("BookFiltersProvider", () => {
  it("should start at page 1 with an empty search query", () => {
    const { result } = renderHook(useBookFilters, {
      wrapper: wrapper(),
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchQuery).toBe("");
  });

  it("should reset currentPage to 1 when searchQuery is updated", () => {
    const { result } = renderHook(useBookFilters, {
      wrapper: wrapper(),
    });

    act(() => result.current.setCurrentPage(3));
    expect(result.current.currentPage).toBe(3);

    act(() => result.current.setSearchQuery("test"));

    expect(result.current.currentPage).toBe(1);
  });

  it("should set pagesize to provided value", () => {
    const { result } = renderHook(useBookFilters, {
      wrapper: wrapper(20),
    });

    expect(result.current.pageSize).toBe(20);
  });
});
