using LibraryBackendApp.Application.Interfaces;
using LibraryBackendApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackendApp.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options), IAppDbContext
{
    public DbSet<Book> Books => Set<Book>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}