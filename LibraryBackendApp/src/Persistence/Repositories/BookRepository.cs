// using LibraryBackendApp.Application.Interfaces;
// using LibraryBackendApp.Domain.Entities;
// using Microsoft.EntityFrameworkCore;

// namespace LibraryBackendApp.Persistence.Repositories;

// public class BookRepository(AppDbContext dbContext) : IBookRepository
// {
//     public async Task<(List<Book>, int Total)> SearchAsync(int page, int pageSize, string? query, CancellationToken cancellationToken)
//     {
//         var booksQuery = dbContext.Books.AsNoTracking();

//         if (query is not null)
//         {
//             booksQuery = booksQuery.Where(b => b.Title.Contains(query) || b.Author.Contains(query));
//         }

//         var books = await booksQuery
//             .OrderBy(b => b.Title)
//             .Skip((page - 1) * pageSize)
//             .Take(pageSize)
//             .ToListAsync(cancellationToken);

//         var totalCount = await booksQuery.CountAsync(cancellationToken);

//         return (books, totalCount);
//     }

//     public async Task<Book> CreateAsync(Book book, CancellationToken cancellationToken)
//     {
//         dbContext.Books.Add(book);
//         await dbContext.SaveChangesAsync(cancellationToken);
//         return book;
//     }

//     public async Task<Book> UpdateAsync(Book book, CancellationToken cancellationToken)
//     {
//         dbContext.Books.Update(book);
//         await dbContext.SaveChangesAsync(cancellationToken);
//         return book;
//     }
// }