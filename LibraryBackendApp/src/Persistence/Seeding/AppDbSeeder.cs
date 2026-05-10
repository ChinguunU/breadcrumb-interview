using LibraryBackendApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackendApp.Persistence.Seeding;

public static class AppDbSeeder
{
    public static async Task SeedAsync(DbContext context, CancellationToken cancellationToken = default)
    {
        var bookSet = context.Set<Book>();

        if (await bookSet.AnyAsync(cancellationToken))
            return;

        var books = new List<Book>
        {
            new()
            {
                Title = "Rich Dad Poor Dad",
                Author = "Robert Kiyosaki",
                Owner = "Chinguun",
            },
            new() {
                Title = "1984",
                Author = "George Orwell",
                Owner = "Nick",
            },
            new() {
                Title = "Atomic Habits",
                Author = "James Clear",
                Owner = "Lebron James",
            },
            new()
            {
                Title = "What Is Intelligence?",
                Author = "Blaise Aguera y Arcas",
                Owner = "Diana",
            },
            new (){
                Title = "Clean Code",
                Author = "Robert C. Martin",
                Owner = "Chinguun",
            },
            new()
            {
                Title = "The Alchemist",
                Author = "Paulo Coelho",
                Owner = "Lebron James",
            },
            new()
            {
                Title = "Thinking, Fast and Slow",
                Author = "Daniel Kahneman",
                Owner = "Sarah",
            },
            new()
            {
                Title = "The Lean Startup",
                Author = "Eric Ries",
                Owner = "Mark",
            },
            new()
            {
                Title = "Dune",
                Author = "Frank Herbert",
                Owner = "Emily",
            },
        };

        bookSet.AddRange(books);
        await context.SaveChangesAsync(cancellationToken);
    }
}