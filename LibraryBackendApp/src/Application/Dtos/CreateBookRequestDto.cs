using System.ComponentModel.DataAnnotations;

namespace LibraryBackendApp.Application.Dtos;

public class CreateBookRequestDto
{
    [Required, StringLength(500, MinimumLength = 1)]
    public required string Title { get; set; }

    [Required, StringLength(200, MinimumLength = 1)]
    public required string Author { get; set; }

    [Required, StringLength(200, MinimumLength = 1)]
    public required string Owner { get; set; }
}
