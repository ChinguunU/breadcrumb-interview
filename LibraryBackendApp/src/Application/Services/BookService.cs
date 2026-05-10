using LibraryBackendApp.Application.Dtos;
using LibraryBackendApp.Application.Exceptions;
using LibraryBackendApp.Application.Interfaces;
using LibraryBackendApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackendApp.Application.Services;

public class BookService(IAppDbContext dbContext) : IBookService
{
    public async Task<Book> CreateBookAsync(CreateBookRequestDto bookRequestDto, CancellationToken cancellationToken)
    {
        var book = new Book
        {
            Title = bookRequestDto.Title,
            Author = bookRequestDto.Author,
            Owner = bookRequestDto.Owner
        };

        dbContext.Books.Add(book);
        await dbContext.SaveChangesAsync(cancellationToken);

        return book;
    }

    public async Task<bool> ToggleBookAvailabilityAsync(int id, CancellationToken cancellationToken)
    {
        var book = await dbContext.Books.FindAsync([id], cancellationToken)
            ?? throw new NotFoundException($"Book was not found.");

        book.ToggleAvailability();
        await dbContext.SaveChangesAsync(cancellationToken);

        return book.IsAvailable;
    }

    public async Task<PagedResult<Book>> SearchBooksAsync(int pageNumber, int pageSize, string? query, CancellationToken cancellationToken)
    {
        var booksQuery = dbContext.Books.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query))
        {
            var trimmedQuery = query.Trim();
            booksQuery = booksQuery.Where(b => b.Title.Contains(trimmedQuery) || b.Author.Contains(trimmedQuery));
        }

        var books = await booksQuery
            .OrderBy(b => b.Title)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var totalItems = await booksQuery.CountAsync(cancellationToken);

        return new PagedResult<Book>(books, pageNumber, pageSize, totalItems);
    }

    public async Task DeleteBookAsync(int id, CancellationToken cancellationToken)
    {
        var book = await dbContext.Books.FindAsync([id], cancellationToken)
            ?? throw new NotFoundException($"Book was not found.");

        dbContext.Books.Remove(book);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}