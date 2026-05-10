using LibraryBackendApp.Application.Dtos;
using LibraryBackendApp.Domain.Entities;

namespace LibraryBackendApp.Application.Interfaces;

public interface IBookService
{
    public Task<Book> CreateBookAsync(CreateBookRequestDto bookRequestDto, CancellationToken cancellationToken);

    public Task<bool> ToggleBookAvailabilityAsync(int id, CancellationToken cancellationToken);

    public Task<PagedResult<Book>> SearchBooksAsync(int pageNumber, int pageSize, string? query, CancellationToken cancellationToken);

    public Task DeleteBookAsync(int id, CancellationToken cancellationToken);
}