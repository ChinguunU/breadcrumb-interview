using LibraryBackendApp.Application.Dtos;
using LibraryBackendApp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LibraryBackendApp.Api.Controllers;

[ApiController]
[Route("api/books")]
public class BookController(IBookService bookService) : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetBooks(
        [FromQuery] string? query,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        var books = await bookService.SearchBooksAsync(pageNumber, pageSize, query, cancellationToken);
        return Ok(books);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook(
        [FromBody] CreateBookRequestDto bookRequest,
        CancellationToken cancellationToken)
    {
        var book = await bookService.CreateBookAsync(bookRequest, cancellationToken);
        return CreatedAtAction(nameof(GetBooks), book);
    }

    [HttpPatch("{id}/toggle-availability")]
    public async Task<IActionResult> ToggleBookAvailability(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        var isAvailable = await bookService.ToggleBookAvailabilityAsync(id, cancellationToken);
        return Ok(new { IsAvailable = isAvailable });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        await bookService.DeleteBookAsync(id, cancellationToken);
        return NoContent();
    }
}