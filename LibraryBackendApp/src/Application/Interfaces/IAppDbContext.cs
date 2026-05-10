using LibraryBackendApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackendApp.Application.Interfaces;

public interface IAppDbContext
{
    public DbSet<Book> Books { get; }
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}