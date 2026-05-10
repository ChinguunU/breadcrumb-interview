# Library — Crumb-to-Crumb Book Lending

A small full-stack prototype for the company book-lending discovery problem: who has which books, and which ones are available to borrow.

## Stack

- **Backend:** ASP.NET Core 9 (Web API), EF Core 9, SQLite
- **Frontend:** React 19, TypeScript, Vite, TanStack Query, Tailwind, shadcn (Base UI variant)

## Prerequisites

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) and npm

## How to run

The app has two parts; run them in separate terminals.

### 1. Backend (port 5017)

```bash
cd LibraryBackendApp/src/Api
dotnet run
```

API is available at `http://localhost:5017/api`. The OpenAPI/Scalar docs are at `http://localhost:5017/scalar` in development. Db is seeded on initial run.

### 2. Frontend (port 5173)

```bash
cd library-frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Project structure

```
breadcrumb-interview/
├── LibraryBackendApp/
│   └── src/
│       ├── Api/             ← controllers, DI composition, Program.cs
│       ├── Application/     ← handlers, DTOs, interfaces
│       ├── Domain/          ← entities (Book)
│       └── Persistence/     ← EF Core DbContext, migrations, seeder
└── library-frontend/
    └── src/
        ├── api/             ← fetch client, typed API calls
        ├── components/      ← BookTable, BookRow, BookPagination, SearchBar, AddBookForm, AddBookDialog
        ├── contexts/        ← BookFiltersContext (search, pagination state)
        ├── hooks/           ← useBooksQuery, useCreateBookMutation, useDeleteBookMutation, etc.
        └── App.tsx
```

## Test plan

### Approach
I firmly believe good and readable tests are a form of documentation. With that as a guiding principle the tests are written to mirror how the code is actually used — as close to a "black box" style as possible. This is aspirational rather than always achievable in practice, but it shapes a few concrete choices:

- **Mock at the network boundary** (`vi.mock("@/api/bookApi")`) rather than at hook or component boundaries. Tests exercise the real React Query layer, real context, and real component composition — so a broken hook or a missing provider surfaces as a test failure.
- **Query the DOM the way a user would** — by role, accessible name, or label — instead of test IDs or implementation details.
- **Use `userEvent`** so interactions match real users (and respect `disabled` state).

### Tests that are missing
#### Frontend
- As all mutation hooks invalidate the books query to trigger refetch, they require testing to close the loop
- All remaining components like SearchBar, AddBookForm, and AddBookDialog need testing in a similar fashion to existing tests
- Unit tests for fetchClient. I also prefer to include unit tests for individual apiClients to test contracts.

#### Backend
- All the backend services are thin wrappers around EF core, so i decided not to add any tests for them given time constraints. In the real world, I would have written integration tests with a test container db to get the most bang for buck. In these tests I would cover, happy and sad paths. As for unit tests I would add unit tests on my domain model toggleAvailability and the PagedResult record.


## A note on AI use

Used AI assistance for scaffolding (component boilerplate, the README, some
Tailwind classnames) and as a sounding board for architectural decisions.
Verified the reasoning behind each non-trivial choice myself and am prepared
to defend the code without AI in the pair-programming round.