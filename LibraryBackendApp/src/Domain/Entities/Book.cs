namespace LibraryBackendApp.Domain.Entities;

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Owner { get; set; }
    public bool IsAvailable { get; private set; } = true;

    public void ToggleAvailability()
    {
        IsAvailable = !IsAvailable;
    }
}