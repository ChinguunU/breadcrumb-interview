namespace LibraryBackendApp.Application.Dtos;

public record PagedResult<T>(
    List<T> Items,
    int PageNumber,
    int PageSize,
    int TotalItems
)
{
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
};