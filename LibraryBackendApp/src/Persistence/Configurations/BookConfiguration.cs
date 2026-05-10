using LibraryBackendApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LibraryBackendApp.Persistence.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Title)
            .HasMaxLength(500);

        builder.Property(b => b.Author)
            .HasMaxLength(200);

        builder.Property(b => b.Owner)
            .HasMaxLength(200);

        builder.Property(b => b.IsAvailable)
            .HasDefaultValue(true);
    }
}