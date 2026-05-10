// Application/Exceptions/NotFoundException.cs
namespace LibraryBackendApp.Application.Exceptions;

public class NotFoundException(string message) : Exception(message)
{
}
