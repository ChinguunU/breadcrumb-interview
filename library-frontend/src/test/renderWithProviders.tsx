import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookFiltersProvider } from "@/contexts/BookFiltersProvider";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

type Options = Omit<RenderOptions, "wrapper"> & {
  pageSize?: number;
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options: Options = {},
) => {
  const { pageSize, ...rest } = options;
  const queryClient = createTestQueryClient();

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <BookFiltersProvider pageSize={pageSize}>
          {children}
        </BookFiltersProvider>
      </QueryClientProvider>
    ),
    ...rest,
  });
};
