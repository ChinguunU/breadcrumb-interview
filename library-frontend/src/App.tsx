import { BookTable } from "@/components/BookTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-muted/20">
        <main className="mx-auto max-w-5xl px-6 py-8">
          <header className="mb-6">
            <h1 className="text-3xl">Library</h1>
            <p className="text-sm text-gray-500">
              Browse and manage your book collection.
            </p>
          </header>
          <BookTable />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
